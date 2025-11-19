import { useTheme } from 'next-themes'
import { Moon, Sun } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Toggle theme"
        disabled
      >
        <Sun weight="fill" className="w-5 h-5" aria-hidden="true" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={label}
      aria-pressed={isDark}
      role="switch"
      aria-checked={isDark}
      type="button"
    >
      {isDark ? (
        <Sun weight="fill" className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Moon weight="fill" className="w-5 h-5" aria-hidden="true" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  )
}
