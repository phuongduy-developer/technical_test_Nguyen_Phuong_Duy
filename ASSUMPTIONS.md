# Today's Weather — Assumptions & Notes

## Setup
1. Get a free API key at https://openweathermap.org/api (Current Weather Data).
2. Copy `.env.example` to `.env` and set `VITE_OPENWEATHER_API_KEY`.
3. `pnpm install && pnpm dev` (dev server runs on port 3000).

## UI behavior assumptions
- **Country field** expects a 2-letter ISO 3166 country code (e.g. `MY`, `JP`, `KR`), matching the mockup's history entries and OpenWeatherMap's `q=city,countryCode` query param. It's optional — city alone is a valid search.
- **Temperature** is requested in Celsius (`units=metric`) and shown with one decimal place. The mockup's `303.15°C` appears to be raw Kelvin mislabeled as °C, which would be scientifically wrong, so real Celsius values are shown instead.
- **Search** adds/moves the query to the top of Search History and de-duplicates by `city, country` (case-insensitive) so repeat searches don't create duplicate rows.
- **Clear** resets the City/Country inputs and the currently displayed weather/error; it does not touch Search History (history rows have their own delete button for that).
- **Search history** persists in `localStorage` so it survives page reloads.
- **Invalid input** (city/country not found, or empty city) shows an inline error message in place of the weather card instead of a blocking alert.
- Built light-on-gradient by default with an optional dark/light **theme toggle** (bonus requirement), persisted in `localStorage`.
- Layout is responsive: the form fields and history rows stack/wrap for narrow (mobile) widths and align in a row on wider screens.
