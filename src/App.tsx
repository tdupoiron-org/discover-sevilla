import { useState } from 'react'
import { sevillaSites } from '@/data/sites'
import { SiteCard } from '@/components/SiteCard'
import { FilterBar, QuickFilter } from '@/components/FilterBar'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle } from '@phosphor-icons/react'
import { Site } from '@/types/site'

function App() {
  const [visitedSites, setVisitedSites] = useState<string[]>([])
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all')
  const [quickFilters, setQuickFilters] = useState<QuickFilter[]>([])

  const visited = visitedSites

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter(id => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  const toggleQuickFilter = (quickFilter: QuickFilter) => {
    setQuickFilters((current) => {
      if (current.includes(quickFilter)) {
        return current.filter(f => f !== quickFilter)
      }
      return [...current, quickFilter]
    })
  }

  const matchesQuickFilters = (site: Site): boolean => {
    if (quickFilters.length === 0) return true

    return quickFilters.every(filter => {
      switch (filter) {
        case 'quick-visit':
          // Less than 1 hour: "30-45 min", "45 min - 1 hour"
          return site.duration.includes('min') || site.duration === '1 hour'
        
        case 'short-visit':
          // Less than 2 hours: includes above plus "1-1.5 hours", "1.5-2 hours"
          return !site.duration.includes('2-3')
        
        case 'less-crowded':
          return site.crowdLevel === 'low'
        
        case 'must-see':
          return site.popularity === 'must-see'
        
        case 'hidden-gems':
          return site.popularity === 'hidden-gem'
        
        default:
          return true
      }
    })
  }

  const filteredSites = sevillaSites.filter(site => {
    // Apply visited/unvisited filter
    if (filter === 'visited' && !visited.includes(site.id)) return false
    if (filter === 'unvisited' && visited.includes(site.id)) return false
    
    // Apply quick filters
    return matchesQuickFilters(site)
  })

  const visitedCount = visited.length
  const totalCount = sevillaSites.length
  const progressPercentage = (visitedCount / totalCount) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <MapPin weight="fill" className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Discover Sevilla
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Welcome to your personal guide for exploring Sevilla's most captivating sites. 
            Track your journey through this magnificent city.
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                All Sites ({totalCount})
              </button>
              <button
                onClick={() => setFilter('unvisited')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'unvisited'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                To Visit ({totalCount - visitedCount})
              </button>
              <button
                onClick={() => setFilter('visited')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'visited'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <CheckCircle weight="fill" className="inline w-4 h-4 mr-1.5" />
                Visited ({visitedCount})
              </button>
            </div>

            {visitedCount > 0 && (
              <div className="bg-card border border-border rounded-xl p-4 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Your Progress</span>
                  <Badge variant="secondary">
                    {visitedCount} of {totalCount}
                  </Badge>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}

            <FilterBar 
              activeFilters={quickFilters}
              onToggleFilter={toggleQuickFilter}
            />
          </div>
        </header>

        {filteredSites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {filter === 'visited' && visitedCount === 0
                ? 'Start exploring Sevilla and mark your first site! ✨'
                : filter === 'visited' && visitedCount === totalCount
                ? '🎉 Congratulations! You\'ve visited all the sites!'
                : 'No sites match your filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isVisited={visited.includes(site.id)}
                onToggleVisit={toggleVisit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App