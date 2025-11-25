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

const getPlaceholderImage = (seed: number) => {
   return `https://picsum.photos/seed/${seed}/400/300`;
};

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

// UK Transport Mock Data
const UK_BUSES: TransportRoute[] = [
  {
    id: 'bus-1',
    title: 'Route 24 - London → Oxford',
    description: 'Express motorway service via M40',
    type: 'bus',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
    duration: '1h 40min',
    origin: 'Victoria Coach Station',
    destination: 'Oxford City Centre',
    price: '£15.50',
    schedule: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 'bus-2',
    title: 'Route X90 - London → Brighton',
    description: 'Coastal express via M23',
    type: 'bus',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop',
    duration: '2h 10min',
    origin: 'Victoria Coach Station',
    destination: 'Brighton Pool Valley',
    price: '£12.00',
    schedule: ['05:30', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
    rating: 4.7,
    reviews: 456,
  },
  {
    id: 'bus-3',
    title: 'Route 757 - London → Heathrow',
    description: 'Airport express service',
    type: 'bus',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    duration: '55min',
    origin: 'Kings Cross',
    destination: 'Heathrow Central',
    price: '£8.50',
    schedule: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],
    rating: 4.2,
    reviews: 189,
  },
  {
    id: 'bus-4',
    title: 'National Express - London → Manchester',
    description: 'Long-distance intercity service',
    type: 'bus',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400',
    duration: '4h 30min',
    origin: 'Victoria Coach Station',
    destination: 'Manchester Shudehill',
    price: '£25.00',
    schedule: ['06:30', '10:30', '14:30', '18:30'],
    rating: 4.0,
    reviews: 78,
  },
  {
    id: 'bus-5',
    title: 'Megabus - London → Edinburgh',
    description: 'Express overnight service via M1/A1',
    type: 'bus',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=400',
    duration: '9h 30min',
    origin: 'Victoria Coach Station',
    destination: 'Edinburgh Bus Station',
    price: '£35.00',
    schedule: ['07:00', '11:00', '23:00'],
    rating: 4.3,
    reviews: 312,
  },
];

const UK_TRAINS: TransportRoute[] = [
  {
    id: 'train-1',
    title: 'London → Edinburgh East Coast',
    description: 'High-speed intercity mainline',
    type: 'train',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=300&fit=crop',
    duration: '4h 30min',
    origin: 'Kings Cross',
    destination: 'Edinburgh Waverley',
    price: '£45 - £150',
    schedule: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00'],
    rating: 4.8,
    reviews: 892,
  },
  {
    id: 'train-2',
    title: 'London → Penzance Great Western',
    description: 'Scenic journey to Cornwall',
    type: 'train',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop',
    duration: '5h 30min',
    origin: 'Paddington',
    destination: 'Penzance',
    price: '£50 - £180',
    schedule: ['06:03', '08:03', '10:03', '12:03'],
    rating: 4.9,
    reviews: 1256,
  },
  {
    id: 'train-3',
    title: 'London → Brighton Southern',
    description: 'Fast commuter service',
    type: 'train',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=400',
    duration: '1h 00min',
    origin: 'Victoria',
    destination: 'Brighton',
    price: '£15 - £35',
    schedule: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00'],
    rating: 4.6,
    reviews: 567,
  },
  {
    id: 'train-4',
    title: 'London → Manchester Avanti',
    description: 'West Coast mainline service',
    type: 'train',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1555952238-b19b7cead9db?w=400',
    duration: '2h 10min',
    origin: 'Euston',
    destination: 'Manchester Piccadilly',
    price: '£35 - £120',
    schedule: ['06:20', '08:07', '10:07', '12:07', '14:07', '16:07'],
    rating: 4.4,
    reviews: 234,
  },
  {
    id: 'train-5',
    title: 'London → Glasgow Virgin',
    description: 'West Coast express service',
    type: 'train',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
    duration: '4h 30min',
    origin: 'Euston',
    destination: 'Glasgow Central',
    price: '£40 - £140',
    schedule: ['07:40', '09:40', '11:40', '13:40'],
    rating: 4.5,
    reviews: 189,
  },
];

const UK_DESTINATIONS: TransportRoute[] = [
  {
    id: 'dest-1',
    title: 'Stonehenge',
    description: 'UNESCO World Heritage prehistoric monument',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1588598198321-e706c30b37cb?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 2341,
  },
  {
    id: 'dest-2',
    title: 'Tower of London',
    description: 'Historic castle and Crown Jewels',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 1876,
  },
  {
    id: 'dest-3',
    title: 'Edinburgh Castle',
    description: 'Historic fortress on Castle Rock',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    rating: 4.8,
    reviews: 2156,
  },
  {
    id: 'dest-4',
    title: 'Lake District',
    description: 'Stunning national park and lakes',
    type: 'destination',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1580892727672-29bda0a8321a?w=400',
    rating: 4.6,
    reviews: 1543,
  },
  {
    id: 'dest-5',
    title: 'Brighton Beach',
    description: 'Victorian pier and seaside resort',
    type: 'destination',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    rating: 4.5,
    reviews: 987,
  },
  {
    id: 'dest-6',
    title: 'Windsor Castle',
    description: 'Royal residence and historic castle',
    type: 'destination',
    status: 'Popular',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400',
    rating: 4.7,
    reviews: 1234,
  },
  {
    id: 'dest-7',
    title: 'Snowdonia National Park',
    description: 'Welsh mountains and hiking trails',
    type: 'destination',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
    rating: 4.8,
    reviews: 876,
  },
  {
    id: 'dest-8',
    title: 'Bath Roman Baths',
    description: 'Ancient Roman spa and Georgian architecture',
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
    return UK_BUSES;
  },

  // Get all trains
  getTrains: async (): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return UK_TRAINS;
  },

  // Get all destinations
  getDestinations: async (): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return UK_DESTINATIONS;
  },

  // Get all transport routes
  getAllRoutes: async (): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...UK_BUSES, ...UK_TRAINS, ...UK_DESTINATIONS];
  },

  // Get route by ID
  getRouteById: async (id: string): Promise<TransportRoute | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const allRoutes = [...UK_BUSES, ...UK_TRAINS, ...UK_DESTINATIONS];
    return allRoutes.find(route => route.id === id);
  },

  // Search routes
  searchRoutes: async (query: string, filter?: string): Promise<TransportRoute[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    let routes = [...UK_BUSES, ...UK_TRAINS, ...UK_DESTINATIONS];
    
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
