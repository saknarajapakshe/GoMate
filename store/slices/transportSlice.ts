import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transportApi, TransportRoute } from '../../services/api';

interface TransportState {
  buses: TransportRoute[];
  trains: TransportRoute[];
  destinations: TransportRoute[];
  allRoutes: TransportRoute[];
  searchResults: TransportRoute[];
  selectedRoute: TransportRoute | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TransportState = {
  buses: [],
  trains: [],
  destinations: [],
  allRoutes: [],
  searchResults: [],
  selectedRoute: null,
  isLoading: false,
  error: null,
};

export const fetchBuses = createAsyncThunk('transport/fetchBuses', async (_, { rejectWithValue }) => {
  try {
    return await transportApi.getBuses();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch buses');
  }
});

export const fetchTrains = createAsyncThunk('transport/fetchTrains', async (_, { rejectWithValue }) => {
  try {
    return await transportApi.getTrains();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch trains');
  }
});

export const fetchDestinations = createAsyncThunk('transport/fetchDestinations', async (_, { rejectWithValue }) => {
  try {
    return await transportApi.getDestinations();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch destinations');
  }
});

export const fetchAllRoutes = createAsyncThunk('transport/fetchAllRoutes', async (_, { rejectWithValue }) => {
  try {
    return await transportApi.getAllRoutes();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch routes');
  }
});

export const searchRoutes = createAsyncThunk(
  'transport/searchRoutes',
  async ({ query, filter }: { query: string; filter?: string }, { rejectWithValue }) => {
    try {
      return await transportApi.searchRoutes(query, filter);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Search failed');
    }
  }
);

export const fetchRouteById = createAsyncThunk(
  'transport/fetchRouteById',
  async (id: string, { rejectWithValue }) => {
    try {
      const route = await transportApi.getRouteById(id);
      if (!route) {
        return rejectWithValue('Route not found');
      }
      return route;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch route');
    }
  }
);

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },
    clearSelectedRoute: (state) => {
      state.selectedRoute = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Buses
      .addCase(fetchBuses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buses = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Trains
      .addCase(fetchTrains.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrains.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trains = action.payload;
      })
      .addCase(fetchTrains.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Destinations
      .addCase(fetchDestinations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.destinations = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch All Routes
      .addCase(fetchAllRoutes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllRoutes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoutes = action.payload;
        state.buses = action.payload.filter(r => r.type === 'bus');
        state.trains = action.payload.filter(r => r.type === 'train');
        state.destinations = action.payload.filter(r => r.type === 'destination');
      })
      .addCase(fetchAllRoutes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Search Routes
      .addCase(searchRoutes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchRoutes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRoutes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Route By ID
      .addCase(fetchRouteById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRouteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedRoute = action.payload;
      })
      .addCase(fetchRouteById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchResults, setSelectedRoute, clearSelectedRoute } = transportSlice.actions;
export default transportSlice.reducer;
