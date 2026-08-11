import { useState, type ChangeEvent } from "react"
import bgLight from "@/assets/bg-light.webp"
import bgDark from "@/assets/bg-dark.webp"
import sun from "@/assets/sun.webp"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { WeatherSearchForm } from "@/components/weather/weather-search-form"
import { WeatherSummary } from "@/components/weather/weather-summary"
import { SearchHistoryList } from "@/components/weather/search-history-list"
import { useSearchHistory } from "@/hooks/use-search-history"
import { useTheme } from "@/hooks/use-theme"
import { useWeatherMutation } from "@/hooks/use-weather-mutation"
import { buildLocationLabel } from "@/lib/weather-label"
import { WeatherApiError } from "@/api/weather"
import type { SearchHistoryEntry } from "@/api/type"

export function TodaysWeatherPage() {
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [validationError, setValidationError] = useState<string | null>(null)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)
  const { history, addEntry, removeEntry } = useSearchHistory()
  const { theme, toggleTheme } = useTheme()
  const { data, isPending, isError, reset, mutateAsync, error: weatherError } = useWeatherMutation()

  const weather = data ?? null
  const isLoading = isPending
  const error =
    validationError ??
    (isError
      ? weatherError instanceof WeatherApiError
        ? weatherError.message
        : "Something went wrong. Please try again."
      : null)

  async function runSearch(searchCity: string, searchCountry: string) {
    const trimmedCity = searchCity.trim()
    const trimmedCountry = searchCountry.trim()

    reset()

    if (!trimmedCity) {
      setValidationError("Please enter a city name.")
      setActiveLabel(null)
      return
    }

    setValidationError(null)

    try {
      await mutateAsync({ city: trimmedCity, country: trimmedCountry })
      setActiveLabel(buildLocationLabel(trimmedCity, trimmedCountry))
      addEntry(trimmedCity, trimmedCountry)
    } catch {
      setActiveLabel(null)
    }
  }

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    void runSearch(city, country)
  }

  function handleClear() {
    setCity("")
    setCountry("")
    setValidationError(null)
    setActiveLabel(null)
    reset()
  }

  function handleHistorySearch(entry: SearchHistoryEntry) {
    setCity(entry.city)
    setCountry(entry.country)
    void runSearch(entry.city, entry.country)
  }

  return (
    <main className="relative flex min-h-svh flex-col p-4 sm:p-6">
      <img
        src={theme === "dark" ? bgDark : bgLight}
        alt="background"
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <ThemeToggle
        theme={theme}
        onToggle={toggleTheme}
        className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6"
      />
      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <WeatherSearchForm
          city={city}
          country={country}
          onCityChange={setCity}
          onCountryChange={setCountry}
          onSubmit={handleSubmit}
          onClear={handleClear}
          isLoading={isLoading}
        />
      </div>
      <div className="relative z-10 flex mt-40 justify-center">
        <Card className="relative w-full max-w-2xl gap-0 overflow-visible border border-white dark:border-none bg-[#b6a1e6] dark:bg-[#4d3692] p-0 shadow-none ring-0">
          <CardHeader className="relative flex flex-row items-start justify-between gap-2 px-7 py-5">
            <p className="text-[16px] font-medium text-foreground">Today's Weather</p>
            <img
              src={sun}
              alt="background"
              aria-hidden
              className="pointer-events-none z-50 absolute right-0 top-0 -translate-y-1/2 w-56 h-50 sm:w-70.5 sm:h-63"
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-6 px-7 py-6 pt-0 text-left">
            <WeatherSummary weather={weather} error={error} isLoading={isLoading} />
            <SearchHistoryList
              history={history}
              activeLabel={activeLabel}
              onSearchAgain={handleHistorySearch}
              onDelete={removeEntry}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
