import { Badge } from '@/components/ui/badge'
import { Clock, Users, Sparkle, Star } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export type QuickFilter = 
  | 'quick-visit'    // Less than 1 hour
  | 'short-visit'    // Less than 2 hours  
  | 'less-crowded'   // Low crowd level
  | 'must-see'       // Must-see popularity
  | 'hidden-gems'    // Hidden gem popularity

interface FilterBarProps {
  activeFilters: QuickFilter[]
  onToggleFilter: (filter: QuickFilter) => void
}

const filterConfig: Record<QuickFilter, { 
  label: string
  icon: React.ElementType
  description: string
}> = {
  'quick-visit': {
    label: 'Quick Visit',
    icon: Clock,
    description: 'Less than 1 hour'
  },
  'short-visit': {
    label: 'Short Visit',
    icon: Clock,
    description: 'Less than 2 hours'
  },
  'less-crowded': {
    label: 'Less Crowded',
    icon: Users,
    description: 'Low crowd level'
  },
  'must-see': {
    label: 'Must-See',
    icon: Sparkle,
    description: 'Top attractions'
  },
  'hidden-gems': {
    label: 'Hidden Gems',
    icon: Star,
    description: 'Off the beaten path'
  }
}

export function FilterBar({ activeFilters, onToggleFilter }: FilterBarProps) {
  const filters: QuickFilter[] = ['quick-visit', 'short-visit', 'less-crowded', 'must-see', 'hidden-gems']

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Quick Filters</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const config = filterConfig[filter]
          const Icon = config.icon
          const isActive = activeFilters.includes(filter)
          
          return (
            <button
              key={filter}
              onClick={() => onToggleFilter(filter)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                "border hover:scale-105 active:scale-95",
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background text-foreground border-border hover:bg-secondary'
              )}
              title={config.description}
            >
              <Icon weight={isActive ? 'fill' : 'regular'} className="w-4 h-4" />
              {config.label}
            </button>
          )
        })}
      </div>
      
      {activeFilters.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active
          </span>
          <button
            onClick={() => activeFilters.forEach(f => onToggleFilter(f))}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
