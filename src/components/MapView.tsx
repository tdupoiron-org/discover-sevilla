import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Site } from '@/types/site'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, CheckCircle } from '@phosphor-icons/react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in react-leaflet
// Solución para los iconos de marcador predeterminados en react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapViewProps {
  sites: Site[]
  visitedSites: string[]
  onToggleVisit: (siteId: string) => void
  userLocation?: { lat: number; lng: number }
}

// Component to handle user location centering
// Componente para manejar el centrado de la ubicación del usuario
function LocationMarker({ position }: { position: { lat: number; lng: number } }) {
  const map = useMap()
  
  useEffect(() => {
    map.flyTo(position, 13, {
      duration: 1.5
    })
  }, [map, position])

  const userIcon = L.divIcon({
    className: 'custom-user-marker',
    html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  })

  return <Marker position={position} icon={userIcon} />
}

export function MapView({ sites, visitedSites, onToggleVisit, userLocation }: MapViewProps) {
  const mapRef = useRef<L.Map>(null)

  // Calculate center of all sites or use Sevilla center
  // Calcular el centro de todos los sitios o usar el centro de Sevilla
  const center: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng]
    : [37.3886, -5.9953]

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

  // Create custom markers for visited sites
  // Crear marcadores personalizados para sitios visitados
  const createMarkerIcon = (isVisited: boolean) => {
    const color = isVisited ? '#10b981' : '#dc2626'
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><div style="width: 12px; height: 12px; background: white; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })
  }

  return (
    <div className="w-full h-[600px] md:h-[700px] rounded-xl overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {userLocation && <LocationMarker position={userLocation} />}
        
        {sites.map((site) => {
          const isVisited = visitedSites.includes(site.id)
          return (
            <Marker
              key={site.id}
              position={[site.latitude, site.longitude]}
              icon={createMarkerIcon(isVisited)}
            >
              <Popup className="custom-popup" maxWidth={300}>
                <div className="p-2">
                  <div className="relative">
                    <img 
                      src={site.image} 
                      alt={site.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    {isVisited && (
                      <div className="absolute top-2 right-2 bg-white/95 rounded-full p-1.5">
                        <CheckCircle weight="fill" className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-base mb-1">{site.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    {site.category}
                  </p>
                  
                  <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
                    {site.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="text-xs">
                      <Users weight="fill" className="w-3 h-3 mr-1" />
                      {site.crowdLevel}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock weight="bold" className="w-3 h-3 mr-1" />
                      {site.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Star weight="fill" className="w-3 h-3 mr-1 text-accent" />
                      {site.rating}
                    </Badge>
                  </div>
                  
                  <button
                    onClick={() => onToggleVisit(site.id)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isVisited
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {isVisited ? 'Mark as Not Visited' : 'Mark as Visited'}
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
