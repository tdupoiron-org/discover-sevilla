import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Site } from '@/types/site'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, CheckCircle } from '@phosphor-icons/react'

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

// Theme colors for markers (matching the design system)
const MARKER_COLORS = {
  visited: 'oklch(0.62 0.15 35)', // Terracotta - matches primary color
  unvisited: 'oklch(0.75 0.18 60)', // Amber - matches accent color
} as const

interface MapViewProps {
  sites: Site[]
  visitedSites: string[]
  onToggleVisit: (siteId: string) => void
}

export function MapView({ sites, visitedSites, onToggleVisit }: MapViewProps) {
  // Center of Sevilla
  const center: [number, number] = [37.3886, -5.9953]

  // Create custom icons for visited and unvisited sites
  const createCustomIcon = (isVisited: boolean) => {
    const color = isVisited ? MARKER_COLORS.visited : MARKER_COLORS.unvisited
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">
          ${isVisited ? '✓' : '•'}
        </div>
      </div>
    `
    
    return L.divIcon({
      html: iconHtml,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    })
  }

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

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-lg">
      <MapContainer 
        center={center} 
        zoom={14} 
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {sites.map((site) => {
          const isVisited = visitedSites.includes(site.id)
          
          return (
            <Marker
              key={site.id}
              position={[site.coordinates.lat, site.coordinates.lng]}
              icon={createCustomIcon(isVisited)}
            >
              <Popup maxWidth={300} className="custom-popup">
                <div className="p-2">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base leading-tight flex-1">
                      {site.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleVisit(site.id)
                      }}
                      className="flex-shrink-0 hover:scale-110 transition-transform"
                      aria-label={isVisited ? 'Mark as not visited' : 'Mark as visited'}
                    >
                      {isVisited ? (
                        <CheckCircle weight="fill" className="w-6 h-6 text-primary" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-muted-foreground rounded" />
                      )}
                    </button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    {site.category}
                  </p>
                  
                  <p className="text-sm text-foreground/90 mb-3 line-clamp-3">
                    {site.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="text-xs">
                      <Users weight="fill" className="w-3 h-3 mr-1" />
                      {site.crowdLevel}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Star weight="fill" className="w-3 h-3 mr-1 text-accent" />
                      {site.rating}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock weight="bold" className="w-4 h-4" />
                    <span>{site.duration}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
