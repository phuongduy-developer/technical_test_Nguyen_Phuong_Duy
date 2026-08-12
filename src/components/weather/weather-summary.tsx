import { CircleAlert, CloudSun, Loader2 } from "lucide-react"
import { formatDateTime } from "@/lib/format"
import type { OpenWeatherResponse } from "@/api/type"

interface WeatherSummaryProps {
  weather: OpenWeatherResponse | null
  error: string | null
  isLoading: boolean
}

export function WeatherSummary({ weather, error, isLoading }: WeatherSummaryProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#6C40B5]/30 py-14 text-sm text-[#3d1f7a] dark:border-white/20 dark:text-white/70">
        <Loader2 className="size-4 animate-spin" />
        Fetching weather...
      </div>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      >
        <CircleAlert className="mt-0.5 size-4 shrink-0" />
        <span>{error}</span>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#6C40B5]/30 py-14 text-center text-sm text-[#3d1f7a] dark:border-white/20 dark:text-white/70">
        <CloudSun className="size-6 text-[#6C40B5]/60 dark:text-white/50" />
        Search a city to see today's weather.
      </div>
    )
  }

  const temperatureBlock = (
    <>
      <p className="text-7xl font-extrabold tracking-tight text-[#6C40B5] sm:text-8xl dark:text-[#c9b6ff]">
        {Math.round(weather.main.temp)}°
      </p>
      <p className="mt-1 text-sm text-foreground">
        H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
      </p>
    </>
  )

  return (
    <div>
      {/* Mobile: */}
      <div className="flex items-center justify-between gap-4 sm:hidden">
        <div className="min-w-0">
          {temperatureBlock}
          <p className="mt-1 truncate text-sm font-bold text-foreground">
            {weather.name}, {weather.sys.country}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1 text-right text-sm text-[#666] dark:text-white/80">
          <span>{weather.weather[0]?.main}</span>
          <span className="capitalize">{weather.weather[0]?.description}</span>
          <span>Humidity: {weather.main.humidity}%</span>
          <span>{formatDateTime(new Date(weather.dt * 1000))}</span>
        </div>
      </div>

      {/* Desktop: */}
      <div className="hidden sm:block">
        {temperatureBlock}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 text-sm text-[#666] dark:text-white/80">
          <span className="font-bold text-foreground">
            {weather.name}, {weather.sys.country}
          </span>
          <span>{formatDateTime(new Date(weather.dt * 1000))}</span>
          <span>Humidity: {weather.main.humidity}%</span>
          <span className="capitalize">{weather.weather[0]?.description}</span>
        </div>
      </div>
    </div>
  )
}
