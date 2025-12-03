import { useState } from 'react'
import { kolnSites } from '@/data/sites'
import { SiteCard } from '@/components/SiteCard'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle } from '@phosphor-icons/react'

function App() {
  const [visitedSites, setVisitedSites] = useState<string[]>([])
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all')

  const visited = visitedSites

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter(id => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  const filteredSites = kolnSites.filter(site => {
    if (filter === 'visited') return visited.includes(site.id)
    if (filter === 'unvisited') return !visited.includes(site.id)
    return true
  })

  const visitedCount = visited.length
  const totalCount = kolnSites.length
  const progressPercentage = (visitedCount / totalCount) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only skip-link"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <MapPin weight="fill" className="w-10 h-10 text-primary" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Discover Köln
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Welcome to your personal guide for exploring Köln's most captivating sites. 
            Track your journey through this magnificent city.
          </p>

          <nav aria-label="Filter sites by visit status" className="space-y-4">
            <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Site filters">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                aria-pressed={filter === 'all'}
                aria-label={`Show all sites, ${totalCount} total`}
              >
                All Sites ({totalCount})
              </button>
              <button
                onClick={() => setFilter('unvisited')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  filter === 'unvisited'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                aria-pressed={filter === 'unvisited'}
                aria-label={`Show sites to visit, ${totalCount - visitedCount} remaining`}
              >
                To Visit ({totalCount - visitedCount})
              </button>
              <button
                onClick={() => setFilter('visited')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  filter === 'visited'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                aria-pressed={filter === 'visited'}
                aria-label={`Show visited sites, ${visitedCount} completed`}
              >
                <CheckCircle weight="fill" className="inline w-4 h-4 mr-1.5" aria-hidden="true" />
                Visited ({visitedCount})
              </button>
            </div>

            {visitedCount > 0 && (
              <div className="bg-card border border-border rounded-xl p-4 max-w-md" role="status" aria-live="polite">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground" id="progress-label">Your Progress</span>
                  <Badge variant="secondary" aria-label={`${visitedCount} of ${totalCount} sites visited`}>
                    {visitedCount} of {totalCount}
                  </Badge>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-2" 
                  aria-labelledby="progress-label"
                  aria-valuenow={visitedCount}
                  aria-valuemin={0}
                  aria-valuemax={totalCount}
                />
              </div>
            )}
          </nav>
        </header>

        <main id="main-content">
          {filteredSites.length === 0 ? (
            <div className="text-center py-16" role="status" aria-live="polite">
              <p className="text-lg text-muted-foreground">
                {filter === 'visited' && visitedCount === 0
                  ? 'Start exploring Köln and mark your first site! ✨'
                  : filter === 'visited' && visitedCount === totalCount
                  ? '🎉 Congratulations! You\'ve visited all the sites!'
                  : 'No sites match your filter.'}
              </p>
            </div>
          ) : (
            <section aria-label={`${filteredSites.length} ${filter === 'all' ? '' : filter} sites`}>
              <h2 className="sr-only">
                {filter === 'all' ? 'All Sites' : filter === 'visited' ? 'Visited Sites' : 'Sites to Visit'}
              </h2>
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
            </section>
          )}
        </main>
      </div>
      
      {/* Footer - Fußzeile */}
      <footer className="border-t border-border mt-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Discover Köln. Made with <span aria-label="love">❤️</span> for travelers.
            {/* Mit Liebe für Reisende gemacht */}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App