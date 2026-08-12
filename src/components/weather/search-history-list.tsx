import { useState } from "react"
import { SearchHistoryItem } from "@/components/weather/search-history-item"
import type { SearchHistoryEntry } from "@/types/weather"

interface SearchHistoryListProps {
  history: SearchHistoryEntry[]
  activeLabel: string | null
  onSearchAgain: (entry: SearchHistoryEntry) => void
  onDelete: (id: string) => void
}

export function SearchHistoryList({
  history,
  activeLabel,
  onSearchAgain,
  onDelete,
}: SearchHistoryListProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3 rounded-[24px] bg-[rgba(255,255,255,20%)] p-5 dark:bg-[rgba(26,26,26,30%)]">
      <p className="text-base font-semibold text-foreground">Search History</p>
      {history.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#6C40B5]/30 py-12 text-center text-sm text-[#3d1f7a] dark:border-white/20 dark:text-white/70">
          No Record
        </p>
      ) : (
        <ul className="scrollbar flex max-h-96 flex-col gap-3 overflow-y-auto pr-0.5">
          {history.map((entry) => (
            <SearchHistoryItem
              key={entry.id}
              entry={entry}
              isActive={activeLabel?.toLowerCase() === entry.label.toLowerCase()}
              isConfirming={confirmingId === entry.id}
              onSearchAgain={() => onSearchAgain(entry)}
              onRequestDelete={() => setConfirmingId(entry.id)}
              onConfirmDelete={() => {
                onDelete(entry.id)
                setConfirmingId(null)
              }}
              onCancelDelete={() => setConfirmingId(null)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
