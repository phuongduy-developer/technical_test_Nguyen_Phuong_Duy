# Today's Weather

A React + TypeScript + Vite app that shows current weather for a city/country search, backed by the OpenWeatherMap Current Weather API, with a persisted search history and a light/dark theme switcher.

## Setup

1. Get a free API key at <https://openweathermap.org/api> (Current Weather Data).
2. Copy `.env.example` to `.env` and fill in `VITE_OPENWEATHER_API_KEY` (and `VITE_BASE_URL` if different from the default).
3. Install dependencies and run the dev server:

   ```bash
   pnpm install
   pnpm dev
   ```

   The dev server runs on port 3000.

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — type-check and build for production
- `pnpm lint` — run ESLint
- `pnpm preview` — preview the production build locally

## UI behavior assumptions

- **Country field** expects a 2-letter ISO 3166 country code (e.g. `MY`, `JP`, `KR`), matching OpenWeatherMap's `q=city,countryCode` query param. It's optional — city alone is a valid search.
- **Temperature** is requested in Celsius (`units=metric`) and shown rounded.
- **Search** adds/moves the query to the top of Search History and de-duplicates by `city, country` (case-insensitive) so repeat searches don't create duplicate rows.
- **Clear** resets the City/Country inputs and the currently displayed weather/error; it does not touch Search History (history rows have their own delete button for that).
- **Search history** persists in `localStorage` so it survives page reloads.
- **Invalid input** (city/country not found, or empty city) shows an inline error message in place of the weather card instead of a blocking alert.
- Includes a light/dark **theme toggle**, persisted in `localStorage`.
- Layout is responsive: the form fields and history rows stack/wrap for narrow (mobile) widths and align in a row on wider screens.
