import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Theme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      aria-label="Toggle color theme"
      onClick={onToggle}
      className={cn(
        "size-9 rounded-full bg-white/90 text-[#3d1f7a] shadow-sm hover:bg-white dark:bg-white/85 dark:text-[#2a1a52] dark:hover:bg-white",
        className
      )}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}
