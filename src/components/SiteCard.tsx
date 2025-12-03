import { Site } from '@/types/site'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Users, Star, Fire, Sparkle, CheckCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SiteCardProps {
  site: Site
  isVisited: boolean
  onToggleVisit: (siteId: string) => void
}

export function SiteCard({ site, isVisited, onToggleVisit }: SiteCardProps) {
  const getCrowdBadgeVariant = (level: Site['crowdLevel']) => {
    switch (level) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'accent'
    }
  }

  const getCrowdLabel = (level: Site['crowdLevel']) => {
    switch (level) {
      case 'high':
        return 'High crowd level'
      case 'medium':
        return 'Medium crowd level'
      case 'low':
        return 'Low crowd level'
    }
  }

  const getPopularityConfig = (popularity: Site['popularity']) => {
    switch (popularity) {
      case 'must-see':
        return { icon: Sparkle, label: 'Must-See', variant: 'cologne' as const }
      case 'popular':
        return { icon: Fire, label: 'Popular', variant: 'destructive' as const }
      case 'hidden-gem':
        return { icon: Star, label: 'Hidden Gem', variant: 'default' as const }
    }
  }

  const popularityConfig = getPopularityConfig(site.popularity)
  const PopularityIcon = popularityConfig.icon

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isVisited && "opacity-60"
      )}
      role="article"
      aria-labelledby={`site-${site.id}-title`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={site.image} 
          alt={`${site.name} - ${site.category}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
        
        {isVisited && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center" aria-hidden="true">
            <div className="bg-white/95 rounded-full p-3 shadow-lg">
              <CheckCircle weight="fill" className="w-12 h-12 text-primary" aria-hidden="true" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge 
            variant={getCrowdBadgeVariant(site.crowdLevel)} 
            className="backdrop-blur-sm"
            aria-label={getCrowdLabel(site.crowdLevel)}
          >
            <Users weight="fill" className="w-3 h-3 mr-1" aria-hidden="true" />
            {site.crowdLevel}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <Badge 
            variant={popularityConfig.variant} 
            className="backdrop-blur-sm"
            aria-label={`${popularityConfig.label} attraction`}
          >
            <PopularityIcon weight="fill" className="w-3 h-3 mr-1" aria-hidden="true" />
            {popularityConfig.label}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          <Star weight="fill" className="w-4 h-4 text-accent" aria-hidden="true" />
          <span className="font-semibold text-sm" aria-label={`Rating ${site.rating} out of 5`}>
            {site.rating}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 id={`site-${site.id}-title`} className="font-semibold text-lg leading-tight mb-1 line-clamp-2">
              {site.name}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {site.category}
            </p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <Checkbox 
              checked={isVisited}
              onCheckedChange={(checked) => onToggleVisit(site.id)}
              className="w-6 h-6 hover:scale-110 transition-transform"
              aria-label={isVisited ? `Mark ${site.name} as not visited` : `Mark ${site.name} as visited`}
            />
          </div>
        </div>

        <p className="text-sm text-foreground/80 line-clamp-3">
          {site.description}
        </p>

        <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5" aria-label={`Visit duration: ${site.duration}`}>
            <Clock weight="bold" className="w-4 h-4" aria-hidden="true" />
            <span>{site.duration}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
