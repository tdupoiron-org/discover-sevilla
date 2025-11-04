import { Site } from '@/types/site'

export const sevillaSites: Site[] = [
  {
    id: 'real-alcazar',
    name: 'Real Alcázar',
    description: 'Stunning royal palace with intricate Mudéjar architecture and lush gardens. A UNESCO World Heritage Site and Game of Thrones filming location.',
    image: 'https://images.unsplash.com/photo-1583738584400-e8f1e8e1f0b5?w=800&q=80',
    duration: '2-3 hours',
    crowdLevel: 'high',
    rating: 4.9,
    popularity: 'must-see',
    category: 'Palace',
    coordinates: { lat: 37.3838, lng: -5.9931 }
  },
  {
    id: 'seville-cathedral',
    name: 'Seville Cathedral & Giralda',
    description: "The world's largest Gothic cathedral housing Christopher Columbus' tomb. Climb the Giralda tower for panoramic city views.",
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80',
    duration: '1.5-2 hours',
    crowdLevel: 'high',
    rating: 4.8,
    popularity: 'must-see',
    category: 'Cathedral',
    coordinates: { lat: 37.3859, lng: -5.9931 }
  },
  {
    id: 'plaza-espana',
    name: 'Plaza de España',
    description: 'Magnificent semicircular plaza built for the 1929 Ibero-American Exposition, featuring stunning tilework representing Spanish provinces.',
    image: 'https://images.unsplash.com/photo-1580824883033-3e994c5e3d8e?w=800&q=80',
    duration: '1-1.5 hours',
    crowdLevel: 'medium',
    rating: 4.9,
    popularity: 'must-see',
    category: 'Plaza',
    coordinates: { lat: 37.3771, lng: -5.9868 }
  },
  {
    id: 'barrio-santa-cruz',
    name: 'Barrio de Santa Cruz',
    description: 'Charming former Jewish quarter with narrow winding streets, whitewashed houses, orange trees, and hidden plazas.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
    duration: '2-3 hours',
    crowdLevel: 'medium',
    rating: 4.7,
    popularity: 'must-see',
    category: 'Neighborhood',
    coordinates: { lat: 37.3845, lng: -5.9887 }
  },
  {
    id: 'metropol-parasol',
    name: 'Metropol Parasol',
    description: "Modern wooden structure nicknamed 'Las Setas' (The Mushrooms). Walk the rooftop walkway for sunset views over the old town.",
    image: 'https://images.unsplash.com/photo-1590659954962-8a9ae4f6a012?w=800&q=80',
    duration: '45 min - 1 hour',
    crowdLevel: 'low',
    rating: 4.4,
    popularity: 'popular',
    category: 'Architecture',
    coordinates: { lat: 37.3933, lng: -5.9920 }
  },
  {
    id: 'flamenco-triana',
    name: 'Flamenco in Triana',
    description: 'Experience authentic flamenco in the Triana neighborhood, the birthplace of this passionate art form.',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80',
    duration: '1.5-2 hours',
    crowdLevel: 'medium',
    rating: 4.8,
    popularity: 'must-see',
    category: 'Experience',
    coordinates: { lat: 37.3845, lng: -6.0037 }
  },
  {
    id: 'maria-luisa-park',
    name: 'Parque de María Luisa',
    description: 'Beautiful public park with fountains, monuments, and shaded paths. Perfect for a relaxing stroll away from the crowds.',
    image: 'https://images.unsplash.com/photo-1564769610781-4b7009dc35cc?w=800&q=80',
    duration: '1-2 hours',
    crowdLevel: 'low',
    rating: 4.6,
    popularity: 'popular',
    category: 'Park',
    coordinates: { lat: 37.3760, lng: -5.9874 }
  },
  {
    id: 'torre-del-oro',
    name: 'Torre del Oro',
    description: '13th-century Moorish watchtower on the Guadalquivir River. Now houses a maritime museum with city history.',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    duration: '30-45 min',
    crowdLevel: 'low',
    rating: 4.3,
    popularity: 'popular',
    category: 'Monument',
    coordinates: { lat: 37.3824, lng: -5.9962 }
  },
  {
    id: 'triana-market',
    name: 'Mercado de Triana',
    description: 'Historic market in Triana district offering fresh produce, tapas bars, and local atmosphere. Great for food lovers.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    duration: '1-1.5 hours',
    crowdLevel: 'medium',
    rating: 4.5,
    popularity: 'hidden-gem',
    category: 'Market',
    coordinates: { lat: 37.3864, lng: -6.0042 }
  },
  {
    id: 'casa-de-pilatos',
    name: 'Casa de Pilatos',
    description: 'Magnificent 16th-century palace blending Italian Renaissance and Spanish Mudéjar styles. Often less crowded than the Alcázar.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    duration: '1-1.5 hours',
    crowdLevel: 'low',
    rating: 4.6,
    popularity: 'hidden-gem',
    category: 'Palace',
    coordinates: { lat: 37.3911, lng: -5.9871 }
  },
  {
    id: 'archivo-indias',
    name: 'Archivo de Indias',
    description: 'Renaissance building housing invaluable documents about Spanish colonies in the Americas. UNESCO World Heritage Site.',
    image: 'https://images.unsplash.com/photo-1573331519317-30b24326bb9a?w=800&q=80',
    duration: '30-45 min',
    crowdLevel: 'low',
    rating: 4.4,
    popularity: 'hidden-gem',
    category: 'Museum',
    coordinates: { lat: 37.3845, lng: -5.9933 }
  },
  {
    id: 'guadalquivir-cruise',
    name: 'Guadalquivir River Cruise',
    description: 'Relaxing boat ride along the historic river offering unique views of Sevilla\'s monuments and bridges.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    duration: '1 hour',
    crowdLevel: 'low',
    rating: 4.5,
    popularity: 'popular',
    category: 'Experience',
    coordinates: { lat: 37.3839, lng: -5.9963 }
  }
]
