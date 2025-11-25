import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransportRoute } from '../../services/api';

interface FavouritesState {
  items: TransportRoute[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<TransportRoute>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleFavourite: (state, action: PayloadAction<TransportRoute>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearFavourites: (state) => {
      state.items = [];
    },
  },
});

export const { addFavourite, removeFavourite, toggleFavourite, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
