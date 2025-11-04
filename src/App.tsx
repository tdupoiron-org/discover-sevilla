import { useState, useMemo } from 'react'
import { sevillaSites } from '@/data/sites'
import { SiteCard } from '@/components/SiteCard'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { MapPin, CheckCircle, NavigationArrow, X } from '@phosphor-icons/react'
import { useGeolocation } from '@/hooks/use-geolocation'
import { calculateDistance, calculateWalkingTime, formatWalkingTime } from '@/lib/geolocation'

function App() {
  const [visitedSites, setVisitedSites] = useState<string[]>([])
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all')
  const [maxWalkingTime, setMaxWalkingTime] = useState<number>(60) // in minutes
  const [showDurationFilter, setShowDurationFilter] = useState(false)
  
  const { latitude, longitude, error, loading, permissionStatus, requestLocation } = useGeolocation()

  const visited = visitedSites

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter(id => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  // Calculate walking times for all sites
  const sitesWithWalkingTime = useMemo(() => {
    if (latitude === null || longitude === null) {
      return sevillaSites.map(site => ({ ...site, walkingTime: null }))
    }

    return sevillaSites.map(site => {
      const distanceKm = calculateDistance(
        latitude,
        longitude,
        site.coordinates.latitude,
        site.coordinates.longitude
      )
      const walkingTime = calculateWalkingTime(distanceKm)
      return { ...site, walkingTime }
    })
  }, [latitude, longitude])

  const filteredSites = sitesWithWalkingTime.filter(site => {
    // Filter by visited status
    if (filter === 'visited' && !visited.includes(site.id)) return false
    if (filter === 'unvisited' && visited.includes(site.id)) return false
    
    // Filter by walking time if location is enabled and duration filter is active
    if (showDurationFilter && site.walkingTime !== null && site.walkingTime > maxWalkingTime) {
      return false
    }
    
    return true
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

          {/* Location Authorization */}
          {permissionStatus !== 'granted' && (
            <div className="bg-card border border-border rounded-xl p-4 mb-6 max-w-2xl">
              <div className="flex items-start gap-4">
                <NavigationArrow weight="fill" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    Enable Location for Walking Directions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Allow location access to see walking times from your current position and filter sites by distance.
                  </p>
                  <button
                    onClick={requestLocation}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Requesting...' : 'Enable Location'}
                  </button>
                  {error && (
                    <p className="text-sm text-destructive mt-3">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Location Active with Duration Filter */}
          {permissionStatus === 'granted' && (
            <div className="bg-card border border-border rounded-xl p-4 mb-6 max-w-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <NavigationArrow weight="fill" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-2">
                      Location Enabled
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Walking times are now displayed on each site card.
                    </p>
                    
                    {/* Duration Filter Toggle */}
                    <button
                      onClick={() => setShowDurationFilter(!showDurationFilter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showDurationFilter
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {showDurationFilter ? 'Hide Duration Filter' : 'Filter by Walking Time'}
                    </button>

                    {/* Duration Slider */}
                    {showDurationFilter && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <label className="text-sm font-medium text-foreground mb-3 block">
                          Show sites within walking time: {formatWalkingTime(maxWalkingTime)}
                        </label>
                        <Slider
                          value={[maxWalkingTime]}
                          onValueChange={(value) => setMaxWalkingTime(value[0])}
                          min={5}
                          max={120}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>5 min</span>
                          <span>120 min (2 hrs)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

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
                walkingTime={site.walkingTime}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App