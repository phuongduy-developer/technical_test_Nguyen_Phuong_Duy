import { useMutation } from "@tanstack/react-query"
import { fetchCurrentWeather } from "@/api/weather"

interface WeatherSearchParams {
  city: string
  country: string
}

export function useWeatherMutation() {
  return useMutation({
    mutationFn: ({ city, country }: WeatherSearchParams) => fetchCurrentWeather(city, country),
  })
}
