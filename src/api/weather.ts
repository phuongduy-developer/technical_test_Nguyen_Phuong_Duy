import type { OpenWeatherResponse } from "./type";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export class WeatherApiError extends Error {}

export async function fetchCurrentWeather(
  city: string,
  country: string,
): Promise<OpenWeatherResponse> {
  if (!API_KEY) {
    throw new WeatherApiError(
      "Missing OpenWeatherMap API key. Set VITE_OPENWEATHER_API_KEY in your .env file.",
    );
  }

  const query = country ? `${city},${country}` : city;
  const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&units=metric&appid=${API_KEY}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new WeatherApiError(
      "Network error. Please check your connection and try again.",
    );
  }

  const data = (await response.json()) as OpenWeatherResponse & {
    message?: string;
  };

  if (!response.ok) {
    const message =
      data.message === "city not found"
        ? "City or country not found. Please check your input and try again."
        : (data.message ?? "Unable to fetch weather data.");
    throw new WeatherApiError(message);
  }

  return data;
}
