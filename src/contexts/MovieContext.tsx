import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';
import { toggleTheme } from '../store/themeSlice';
import { Movie, TVShow, MediaType } from '../types/tmdb';

interface MovieContextType {
  favorites: (Movie | TVShow)[];
  addToFavorites: (item: Movie | TVShow, mediaType: MediaType) => void;
  removeFromFavorites: (itemId: number, mediaType: MediaType) => void;
  isFavorite: (itemId: number, mediaType: MediaType) => boolean;
  theme: 'purple' | 'blue';
  toggleTheme: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleAddToFavorites = useCallback(
    (item: Movie | TVShow, mediaType: MediaType) => {
      dispatch(addToFavorites({ item, mediaType }));
    },
    [dispatch]
  );

  const handleRemoveFromFavorites = useCallback(
    (itemId: number, mediaType: MediaType) => {
      dispatch(removeFromFavorites({ itemId, mediaType }));
    },
    [dispatch]
  );

  const isFavorite = useCallback(
    (itemId: number, mediaType: MediaType) =>
      favorites.some(
        item => item.id === itemId && item.mediaType === mediaType
      ),
    [favorites]
  );

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const value = useMemo<MovieContextType>(
    () => ({
      favorites,
      addToFavorites: handleAddToFavorites,
      removeFromFavorites: handleRemoveFromFavorites,
      isFavorite,
      theme,
      toggleTheme: handleToggleTheme,
    }),
    [
      favorites,
      handleAddToFavorites,
      handleRemoveFromFavorites,
      isFavorite,
      theme,
      handleToggleTheme,
    ]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
