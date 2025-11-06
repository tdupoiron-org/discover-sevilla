import { useState, useEffect } from 'react'
import { sevillaSites } from '@/data/sites'
import { SiteCard } from '@/components/SiteCard'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle, Star } from '@phosphor-icons/react'
import { UserSiteData } from '@/types/site'

type FilterType = 'all' | 'visited' | 'unvisited' | 'priority'

function App() {
  // Load user data from localStorage / Cargar datos del usuario desde localStorage
  const [visitedSites, setVisitedSites] = useState<string[]>(() => {
    const saved = localStorage.getItem('visitedSites')
    return saved ? JSON.parse(saved) : []
  })
  
  const [userSiteData, setUserSiteData] = useState<Record<string, UserSiteData>>(() => {
    const saved = localStorage.getItem('userSiteData')
    return saved ? JSON.parse(saved) : {}
  })
  
  const [filter, setFilter] = useState<FilterType>('all')

  // Persist to localStorage / Persistir en localStorage
  useEffect(() => {
    localStorage.setItem('visitedSites', JSON.stringify(visitedSites))
  }, [visitedSites])

  useEffect(() => {
    localStorage.setItem('userSiteData', JSON.stringify(userSiteData))
  }, [userSiteData])

  const visited = visitedSites

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter(id => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  const togglePriority = (siteId: string) => {
    setUserSiteData((current) => ({
      ...current,
      [siteId]: {
        ...current[siteId],
        isPriority: !current[siteId]?.isPriority,
        userRating: current[siteId]?.userRating ?? null
      }
    }))
  }

  const setUserRating = (siteId: string, rating: number | null) => {
    setUserSiteData((current) => ({
      ...current,
      [siteId]: {
        ...current[siteId],
        isPriority: current[siteId]?.isPriority ?? false,
        userRating: rating
      }
    }))
  }

  const filteredSites = sevillaSites.filter(site => {
    if (filter === 'visited') return visited.includes(site.id)
    if (filter === 'unvisited') return !visited.includes(site.id)
    if (filter === 'priority') return userSiteData[site.id]?.isPriority
    return true
  })

  const visitedCount = visited.length
  const totalCount = sevillaSites.length
  const priorityCount = Object.values(userSiteData).filter(data => data.isPriority).length
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
                onClick={() => setFilter('priority')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'priority'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Star weight="fill" className="inline w-4 h-4 mr-1.5" />
                Priority ({priorityCount})
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
                isPriority={userSiteData[site.id]?.isPriority ?? false}
                userRating={userSiteData[site.id]?.userRating ?? null}
                onToggleVisit={toggleVisit}
                onTogglePriority={togglePriority}
                onSetUserRating={setUserRating}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer - Pie de página */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Discover Sevilla. Made with ❤️ for travelers.
            {/* Hecho con amor para viajeros */}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App