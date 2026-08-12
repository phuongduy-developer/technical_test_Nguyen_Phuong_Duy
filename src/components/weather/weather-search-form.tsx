import type { SubmitEvent } from "react"
import { Loader2, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WeatherSearchFormProps {
  city: string
  country: string
  onCityChange: (value: string) => void
  onCountryChange: (value: string) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  onClear: () => void
  isLoading: boolean
}

export function WeatherSearchForm({
  city,
  country,
  onCityChange,
  onCountryChange,
  onSubmit,
  onClear,
  isLoading,
}: WeatherSearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex min-w-36 flex-1 flex-col gap-1.5">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder="e.g. Johor"
          autoComplete="off"
          className="h-10 bg-[#B4A0E6] dark:bg-[#382C6A] border-none"
        />
        <p aria-hidden className="invisible text-xs">
          spacer
        </p>
      </div>
      <div className="flex min-w-28 flex-1 flex-col gap-1.5">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={country}
          onChange={(event) => onCountryChange(event.target.value.toUpperCase())}
          placeholder="e.g. MY"
          maxLength={2}
          autoComplete="off"
          aria-describedby="country-hint"
          className="h-10 bg-[#B4A0E6] uppercase placeholder:normal-case dark:bg-[#382C6A] outline-none border-none"
        />
        <p id="country-hint" className="text-xs text-[#3d1f7a] dark:text-white/70">
          2-letter code, e.g. MY, JP, KR
        </p>
      </div>
      <div className="flex gap-2 my-auto">
        <Button type="submit" size="lg" className="h-10 bg-[#6C40B5] dark:bg-[#28114c] text-white" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
          {isLoading ? "Searching..." : "Search"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-10 border-[#6C40B5]/70 bg-white/15 text-[#3d1f7a] hover:bg-white/30 dark:border-white/40 dark:bg-white/5 dark:text-white dark:hover:bg-white/15"
          onClick={onClear}
          disabled={isLoading}
        >
          <X />
          Clear
        </Button>
      </div>
    </form>
  )
}
