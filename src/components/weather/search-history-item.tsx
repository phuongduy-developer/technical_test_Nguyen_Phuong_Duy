import { Check, Search, Trash, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { SearchHistoryEntry } from "@/types/weather"

interface SearchHistoryItemProps {
  entry: SearchHistoryEntry
  isActive: boolean
  isConfirming: boolean
  onSearchAgain: () => void
  onRequestDelete: () => void
  onConfirmDelete: () => void
  onCancelDelete: () => void
}

const iconButtonClass =
  "size-9 shrink-0 rounded-full bg-white/90 text-[#3d1f7a] shadow-sm hover:bg-white dark:bg-white/85 dark:text-[#2a1a52] dark:hover:bg-white"

export function SearchHistoryItem({
  entry,
  isActive,
  isConfirming,
  onSearchAgain,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
}: SearchHistoryItemProps) {
  const activeBadge = isActive && (
    <span className="ml-2 rounded-full bg-[#3d1f7a]/10 px-2 py-0.5 text-xs font-medium text-[#3d1f7a] dark:bg-white/20 dark:text-white">
      Showing
    </span>
  )

  const actionButtons = (
    <div className="flex shrink-0 gap-2">
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label={`Search ${entry.label} again`}
        onClick={onSearchAgain}
        className={iconButtonClass}
      >
        <Search className="text-[#808080] dark:text-[#9390A0]" />
      </Button>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label={`Delete ${entry.label} from history`}
        onClick={onRequestDelete}
        className={iconButtonClass}
      >
        <Trash className="text-[#808080] dark:text-[#9390A0]" />
      </Button>
    </div>
  )

  return (
    <li
      className={cn(
        "rounded-2xl border-2 border-transparent px-5 py-4 text-sm transition-colors",
        isConfirming
          ? "bg-destructive/10"
          : "bg-white/25 hover:bg-white/35 dark:bg-white/10 dark:hover:bg-white/15",
        isActive && !isConfirming && "border-[#3d1f7a]/70 dark:border-white/60"
      )}
    >
      {isConfirming ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="min-w-0 flex-1 truncate font-medium text-foreground">
            {entry.label}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs text-[#7a1f2b] dark:text-red-300">Delete this entry?</span>
            <Button
              type="button"
              size="icon-sm"
              variant="destructive"
              aria-label={`Confirm delete ${entry.label}`}
              onClick={onConfirmDelete}
            >
              <Check />
            </Button>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              aria-label="Cancel delete"
              onClick={onCancelDelete}
            >
              <X />
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile: location + date stacked on the left, actions on the right */}
          <div className="flex items-center justify-between gap-3 sm:hidden">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">
                {entry.label}
                {activeBadge}
              </p>
              <p className="mt-0.5 text-xs text-black/70 dark:text-white/70">
                {formatTime(new Date(entry.searchedAt))}
              </p>
            </div>
            {actionButtons}
          </div>

          {/* Desktop: single row */}
          <div className="hidden items-center gap-3 sm:flex">
            <span className="min-w-0 flex-1 truncate font-medium text-foreground">
              {entry.label}
              {activeBadge}
            </span>
            <span className="shrink-0 text-xs font-normal text-black dark:text-white/70">
              {formatTime(new Date(entry.searchedAt))}
            </span>
            {actionButtons}
          </div>
        </>
      )}
    </li>
  )
}
