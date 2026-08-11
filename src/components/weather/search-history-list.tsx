import { useState } from "react"
import { Check, Search, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SearchHistoryEntry } from "@/api/type"
import { formatTime } from "@/lib/format"
import { cn } from "@/lib/utils"

interface SearchHistoryListProps {
  history: SearchHistoryEntry[]
  activeLabel: string | null
  onSearchAgain: (entry: SearchHistoryEntry) => void
  onDelete: (id: string) => void
}

const iconButtonClass =
  "size-9 shrink-0 rounded-full bg-white/90 text-[#3d1f7a] shadow-sm hover:bg-white dark:bg-white/85 dark:text-[#2a1a52] dark:hover:bg-white"

export function SearchHistoryList({
  history,
  activeLabel,
  onSearchAgain,
  onDelete,
}: SearchHistoryListProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3 p-5 bg-[rgba(255,255,255,20%)] dark:bg-[rgba(26,26,26,30%)] rounded-[24px]">
      <p className="text-base font-semibold text-foreground">Search History</p>
      {history.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#6C40B5]/30 py-12 text-center text-sm text-[#3d1f7a] dark:border-white/20 dark:text-white/70">
          No Record
        </p>
      ) : (
        <ul className="scrollbar flex max-h-96 flex-col gap-3 overflow-y-auto pr-0.5">
          {history.map((entry) => {
            const isActive = activeLabel?.toLowerCase() === entry.label.toLowerCase()
            const isConfirming = confirmingId === entry.id

            return (
              <li
                key={entry.id}
                className={cn(
                  "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border-2 border-transparent px-5 py-4 text-sm transition-colors",
                  isConfirming
                    ? "bg-destructive/10"
                    : "bg-white/25 hover:bg-white/35 dark:bg-white/10 dark:hover:bg-white/15",
                  isActive && !isConfirming && "border-[#3d1f7a]/70 dark:border-white/60"
                )}
              >
                <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                  {entry.label}
                  {isActive && (
                    <span className="ml-2 rounded-full bg-[#3d1f7a]/10 px-2 py-0.5 text-xs font-medium text-[#3d1f7a] dark:bg-white/20 dark:text-white">
                      Showing
                    </span>
                  )}
                </span>

                {isConfirming ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-xs text-[#7a1f2b] dark:text-red-300">
                      Delete this entry?
                    </span>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="destructive"
                      aria-label={`Confirm delete ${entry.label}`}
                      onClick={() => {
                        onDelete(entry.id)
                        setConfirmingId(null)
                      }}
                    >
                      <Check />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Cancel delete"
                      onClick={() => setConfirmingId(null)}
                    >
                      <X />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="shrink-0 text-xs text-[#3d1f7a] dark:text-white/70">
                      {formatTime(new Date(entry.searchedAt))}
                    </span>
                    <div className="flex shrink-0 gap-2">
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label={`Search ${entry.label} again`}
                        onClick={() => onSearchAgain(entry)}
                        className={iconButtonClass}
                      >
                        <Search />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label={`Delete ${entry.label} from history`}
                        onClick={() => setConfirmingId(entry.id)}
                        className={iconButtonClass}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
