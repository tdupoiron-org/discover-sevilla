import { Site } from '@/types/site'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Users, Star, Fire, Sparkle, CheckCircle, BookmarkSimple, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface SiteCardProps {
  site: Site
  isVisited: boolean
  isPriority: boolean
  userRating: number | null
  onToggleVisit: (siteId: string) => void
  onTogglePriority: (siteId: string) => void
  onSetUserRating: (siteId: string, rating: number | null) => void
}

export function SiteCard({ site, isVisited, isPriority, userRating, onToggleVisit, onTogglePriority, onSetUserRating }: SiteCardProps) {
  const [showRatingInput, setShowRatingInput] = useState(false)
  const getCrowdBadgeVariant = (level: Site['crowdLevel']) => {
    switch (level) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'outline'
    }
  }

  const getPopularityConfig = (popularity: Site['popularity']) => {
    switch (popularity) {
      case 'must-see':
        return { icon: Sparkle, label: 'Must-See', color: 'text-accent' }
      case 'popular':
        return { icon: Fire, label: 'Popular', color: 'text-orange-500' }
      case 'hidden-gem':
        return { icon: Star, label: 'Hidden Gem', color: 'text-primary' }
    }
  }

  const popularityConfig = getPopularityConfig(site.popularity)
  const PopularityIcon = popularityConfig.icon

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        isVisited && "opacity-60",
        isPriority && "ring-2 ring-accent"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={site.image} 
          alt={site.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {isVisited && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="bg-white/95 rounded-full p-3 shadow-lg">
              <CheckCircle weight="fill" className="w-12 h-12 text-primary" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="backdrop-blur-sm">
            <Users weight="fill" className="w-3 h-3 mr-1" />
            {site.crowdLevel}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {/* Priority button / Botón de prioridad */}
          <button
            onClick={() => onTogglePriority(site.id)}
            className={cn(
              "p-2 rounded-full backdrop-blur-sm transition-all",
              isPriority 
                ? "bg-accent text-white shadow-lg" 
                : "bg-white/80 text-muted-foreground hover:bg-accent hover:text-white"
            )}
            aria-label={isPriority ? 'Remove from priority' : 'Add to priority'}
            title={isPriority ? 'Remove from priority' : 'Add to priority'}
          >
            <BookmarkSimple weight={isPriority ? "fill" : "regular"} className="w-4 h-4" />
          </button>
          
          <Badge className={cn("backdrop-blur-sm", popularityConfig.color)}>
            <PopularityIcon weight="fill" className="w-3 h-3 mr-1" />
            {popularityConfig.label}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-3">
          {/* Official rating / Calificación oficial */}
          <div className="flex items-center gap-1.5 text-white">
            <Star weight="fill" className="w-4 h-4 text-accent" />
            <span className="font-semibold text-sm">{site.rating}</span>
          </div>
          
          {/* User rating / Calificación del usuario */}
          {userRating !== null && (
            <div className="flex items-center gap-1.5 text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star weight="fill" className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-sm">{userRating}</span>
              <span className="text-xs opacity-80">You</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight mb-1 line-clamp-2">
              {site.name}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {site.category}
            </p>
          </div>
          <button
            onClick={() => onToggleVisit(site.id)}
            className="flex-shrink-0 mt-1 hover:scale-110 transition-transform"
            aria-label={isVisited ? 'Mark as not visited' : 'Mark as visited'}
          >
            <Checkbox 
              checked={isVisited}
              className="w-6 h-6"
            />
          </button>
        </div>

        <p className="text-sm text-foreground/80 line-clamp-3">
          {site.description}
        </p>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock weight="bold" className="w-4 h-4" />
            <span>{site.duration}</span>
          </div>
          
          {/* User rating section / Sección de calificación del usuario */}
          <div className="flex items-center gap-1">
            {showRatingInput ? (
              <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
                {[1, 2, 3, 4, 5].map((rating) => {
                  const isRated = userRating !== null && rating <= userRating
                  return (
                    <button
                      key={rating}
                      onClick={() => {
                        onSetUserRating(site.id, rating)
                        setShowRatingInput(false)
                      }}
                      className="hover:scale-125 transition-transform"
                      aria-label={`Rate ${rating} stars`}
                    >
                      <Star 
                        weight={isRated ? "fill" : "regular"}
                        className={cn(
                          "w-4 h-4",
                          isRated ? "text-blue-500" : "text-muted-foreground"
                        )}
                      />
                    </button>
                  )
                })}
                <button
                  onClick={() => setShowRatingInput(false)}
                  className="ml-1 hover:text-foreground transition-colors"
                  aria-label="Cancel rating"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowRatingInput(true)}
                className={cn(
                  "text-xs font-medium px-3 py-1.5 rounded-full transition-colors",
                  userRating
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
                title={userRating ? "Change your rating" : "Rate this site"}
              >
                {userRating ? `Your rating: ${userRating}★` : "Rate"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
