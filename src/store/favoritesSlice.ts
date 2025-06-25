import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, TVShow, MediaType } from '../types/tmdb';

interface FavoritesState {
  favorites: (Movie | TVShow)[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (
      state,
      action: PayloadAction<{ item: Movie | TVShow; mediaType: MediaType }>
    ) => {
      const { item, mediaType } = action.payload;
      const isAlreadyFavorite = state.favorites.some(
        fav => fav.id === item.id && fav.mediaType === mediaType
      );
      if (!isAlreadyFavorite) {
        state.favorites.push({ ...item, mediaType });
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<{ itemId: number; mediaType: MediaType }>
    ) => {
      state.favorites = state.favorites.filter(
        item =>
          item.id !== action.payload.itemId ||
          item.mediaType !== action.payload.mediaType
      );
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
