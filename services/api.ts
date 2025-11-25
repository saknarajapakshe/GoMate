import axios from 'axios';

// Using Transport for London API (free, no auth required for basic endpoints)
const BASE_URL = 'https://api.tfl.gov.uk';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get consistent placeholder images using Picsum (reliable alternative to deprecated Unsplash Source)
const getPlaceholderImage = (seed: number) => {
   return `https://picsum.photos/seed/${seed}/400/300`;
};

// Types
export interface TransportRoute {
  id: string;
  title: string;
  description: string;
  type: 'bus' | 'train' | 'destination';
  status: 'Active' | 'Popular' | 'Upcoming';
  image: string;
  duration?: string;
  origin?: string;
  destination?: string;
  price?: string;
  schedule?: string[];
  rating?: number;
  reviews?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
}

// Sri Lankan Transport Mock Data (since there's no free Sri Lankan transport API)
const SRI_LANKAN_BUSES: TransportRoute[] = [
  {
    id: 'bus-1',
    title: 'Route 138 - Colombo → Kandy',
    description: 'Express highway service via E01',
    type: 'bus',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
    duration: '2h 30min',
    origin: 'Colombo Central',
    destination: 'Kandy Bus Stand',
    price: 'LKR 450',
    schedule: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 'bus-2',
    title: 'Route 2 - Colombo → Galle',
    description: 'Coastal route via Southern Expressway',
    type: 'bus',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop',
    duration: '1h 45min',
    origin: 'Fort Railway Station',
    destination: 'Galle Bus Stand',
    price: 'LKR 380',
    schedule: ['05:30', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
    rating: 4.7,
    reviews: 456,
  },
  {
    id: 'bus-3',
    title: 'Route 48 - Colombo → Negombo',
    description: 'Airport express service',
    type: 'bus',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    duration: '45min',
    origin: 'Pettah',
    destination: 'Negombo Town',
    price: 'LKR 120',
    schedule: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],
    rating: 4.2,
    reviews: 189,
  },
  {
    id: 'bus-4',
    title: 'Route 99 - Colombo → Matara',
    description: 'Long-distance coastal journey',
    type: 'bus',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400',
    duration: '3h 30min',
    origin: 'Colombo Fort',
    destination: 'Matara',
    price: 'LKR 550',
    schedule: ['06:30', '10:30', '14:30', '18:30'],
    rating: 4.0,
    reviews: 78,
  },
  {
    id: 'bus-5',
    title: 'Route 57 - Colombo → Jaffna',
    description: 'Northern express via A9 highway',
    type: 'bus',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=400',
    duration: '6h 00min',
    origin: 'Colombo Central',
    destination: 'Jaffna',
    price: 'LKR 1200',
    schedule: ['06:00', '10:00', '14:00', '22:00'],
    rating: 4.3,
    reviews: 312,
  },
];

const SRI_LANKAN_TRAINS: TransportRoute[] = [
  {
    id: 'train-1',
    title: 'Colombo → Kandy Express',
    description: 'Scenic mountain railway journey',
    type: 'train',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=300&fit=crop',
    duration: '2h 45min',
    origin: 'Colombo Fort',
    destination: 'Kandy Station',
    price: 'LKR 280 - 1500',
    schedule: ['05:55', '07:00', '10:35', '15:35'],
    rating: 4.8,
    reviews: 892,
  },
  {
    id: 'train-2',
    title: 'Kandy → Ella Scenic',
    description: 'World-famous tea country route',
    type: 'train',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop',
    duration: '6h 30min',
    origin: 'Kandy',
    destination: 'Ella',
    price: 'LKR 400 - 2000',
    schedule: ['08:47', '11:10'],
    rating: 4.9,
    reviews: 1256,
  },
  {
    id: 'train-3',
    title: 'Colombo → Galle Coast Line',
    description: 'Oceanside railway experience',
    type: 'train',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=400',
    duration: '2h 30min',
    origin: 'Colombo Fort',
    destination: 'Galle',
    price: 'LKR 180 - 900',
    schedule: ['06:55', '08:30', '12:40', '15:30', '17:45'],
    rating: 4.6,
    reviews: 567,
  },
  {
    id: 'train-4',
    title: 'Colombo → Trincomalee',
    description: 'Eastern coastal route',
    type: 'train',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1555952238-b19b7cead9db?w=400',
    duration: '7h 00min',
    origin: 'Colombo Fort',
    destination: 'Trincomalee',
    price: 'LKR 450 - 1800',
    schedule: ['06:05', '21:00'],
    rating: 4.4,
    reviews: 234,
  },
  {
    id: 'train-5',
    title: 'Colombo → Jaffna Express',
    description: 'Northern line intercity',
    type: 'train',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
    duration: '5h 30min',
    origin: 'Colombo Fort',
    destination: 'Jaffna',
    price: 'LKR 500 - 2200',
    schedule: ['05:45', '18:00'],
    rating: 4.5,
    reviews: 189,
  },
];

const SRI_LANKAN_DESTINATIONS: TransportRoute[] = [
  {
    id: 'dest-1',
    title: 'Sigiriya Lion Rock',
    description: 'UNESCO World Heritage ancient rock fortress',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1588598198321-e706c30b37cb?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 2341,
  },
  {
    id: 'dest-2',
    title: 'Galle Fort',
    description: 'Historic Dutch colonial fortification',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 1876,
  },
  {
    id: 'dest-3',
    title: 'Temple of the Tooth',
    description: 'Sacred Buddhist temple in Kandy',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    rating: 4.8,
    reviews: 2156,
  },
  {
    id: 'dest-4',
    title: 'Ella Nine Arch Bridge',
    description: 'Iconic colonial-era railway bridge',
    type: 'destination',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1580892727672-29bda0a8321a?w=400',
    rating: 4.6,
    reviews: 1543,
  },
  {
    id: 'dest-5',
    title: 'Mirissa Beach',
    description: 'Whale watching and pristine beaches',
    type: 'destination',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    rating: 4.5,
    reviews: 987,
  },
  {
    id: 'dest-6',
    title: 'Yala National Park',
    description: 'Wildlife safari and leopard spotting',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400',
    rating: 4.7,
    reviews: 1234,
  },
  {
    id: 'dest-7',
    title: 'Adams Peak',
    description: 'Sacred pilgrimage mountain',
    type: 'destination',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
    rating: 4.8,
    reviews: 876,
  },
  {
    id: 'dest-8',
    title: 'Anuradhapura',
    description: 'Ancient capital and sacred city',
    type: 'destination',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400',
    rating: 4.6,
    reviews: 654,
  },
];

// API Functions
export const transportApi = {
  // Get all buses
  getBuses: async (): Promise<TransportRoute[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return SRI_LANKAN_BUSES;
  },

  // Get all trains
  getTrains: async (): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return SRI_LANKAN_TRAINS;
  },

  // Get all destinations
  getDestinations: async (): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return SRI_LANKAN_DESTINATIONS;
  },

  // Get all transport routes
  getAllRoutes: async (): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...SRI_LANKAN_BUSES, ...SRI_LANKAN_TRAINS, ...SRI_LANKAN_DESTINATIONS];
  },

  // Get route by ID
  getRouteById: async (id: string): Promise<TransportRoute | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const allRoutes = [...SRI_LANKAN_BUSES, ...SRI_LANKAN_TRAINS, ...SRI_LANKAN_DESTINATIONS];
    return allRoutes.find(route => route.id === id);
  },

  // Search routes
  searchRoutes: async (query: string, filter?: string): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    let routes = [...SRI_LANKAN_BUSES, ...SRI_LANKAN_TRAINS, ...SRI_LANKAN_DESTINATIONS];
    
    // Apply type filter
    if (filter && filter !== 'All') {
      const filterMap: Record<string, TransportRoute['type'][]> = {
        'Buses': ['bus'],
        'Trains': ['train'],
        'Destinations': ['destination'],
        'Popular': ['bus', 'train', 'destination'],
        'Nearby': ['bus', 'train', 'destination'],
        'Timetables': ['bus', 'train'],
      };
      
      if (filter === 'Popular') {
        routes = routes.filter(r => r.status === 'Popular');
      } else if (filter === 'Nearby') {
        // Simulate nearby filter - return first 4
        routes = routes.slice(0, 4);
      } else if (filter === 'Timetables') {
        routes = routes.filter(r => r.type === 'bus' || r.type === 'train');
      } else {
        const types = filterMap[filter];
        if (types) {
          routes = routes.filter(r => types.includes(r.type));
        }
      }
    }
    
    // Apply search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      routes = routes.filter(route =>
        route.title.toLowerCase().includes(lowerQuery) ||
        route.description.toLowerCase().includes(lowerQuery) ||
        route.origin?.toLowerCase().includes(lowerQuery) ||
        route.destination?.toLowerCase().includes(lowerQuery)
      );
    }
    
    return routes;
  },
};

// Auth API (using DummyJSON)
export const authApi = {
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 60,
      });
      
      return {
        user: {
          id: response.data.id.toString(),
          username: response.data.username,
          email: response.data.email,
          name: `${response.data.firstName} ${response.data.lastName}`,
          avatar: response.data.image,
        },
        token: response.data.accessToken,
      };
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },

  register: async (userData: { 
    username: string; 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string;
  }): Promise<{ user: User; token: string }> => {
    try {
      // DummyJSON doesn't have real registration, so we simulate it
      const response = await axios.post('https://dummyjson.com/users/add', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        password: userData.password,
      });
      
      return {
        user: {
          id: response.data.id.toString(),
          username: response.data.username,
          email: response.data.email,
          name: `${response.data.firstName} ${response.data.lastName}`,
        },
        token: 'mock-token-' + Date.now(),
      };
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  getProfile: async (token: string): Promise<User> => {
    try {
      const response = await axios.get('https://dummyjson.com/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return {
        id: response.data.id.toString(),
        username: response.data.username,
        email: response.data.email,
        name: `${response.data.firstName} ${response.data.lastName}`,
        avatar: response.data.image,
      };
    } catch (error) {
      throw new Error('Failed to get profile');
    }
  },
};

export default api;
