export function buildLocationLabel(city: string, country: string): string {
  return country ? `${city}, ${country.toUpperCase()}` : city
}
