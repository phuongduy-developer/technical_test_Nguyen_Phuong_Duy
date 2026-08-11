import { useEffect, useState } from "react"
import type { SearchHistoryEntry } from "@/api/type"
import { buildLocationLabel } from "@/lib/weather-label"

const STORAGE_KEY = "weather-search-history"

function readStoredHistory(): SearchHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SearchHistoryEntry[]) : []
  } catch {
    return []
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>(readStoredHistory)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  function addEntry(city: string, country: string) {
    const label = buildLocationLabel(city, country)
    setHistory((prev) => {
      const withoutDuplicate = prev.filter(
        (entry) => entry.label.toLowerCase() !== label.toLowerCase()
      )
      const entry: SearchHistoryEntry = {
        id: crypto.randomUUID(),
        city,
        country,
        label,
        searchedAt: Date.now(),
      }
      return [entry, ...withoutDuplicate]
    })
  }

  function removeEntry(id: string) {
    setHistory((prev) => prev.filter((entry) => entry.id !== id))
  }

  return { history, addEntry, removeEntry }
}
