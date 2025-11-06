export interface Site {
  id: string
  name: string
  description: string
  image: string
  duration: string
  crowdLevel: 'low' | 'medium' | 'high'
  rating: number
  popularity: 'must-see' | 'popular' | 'hidden-gem'
  category: string
}

// User-specific data for each site
// Datos específicos del usuario para cada sitio
export interface UserSiteData {
  isPriority: boolean
  userRating: number | null // 1-5 stars, null if not rated
}
