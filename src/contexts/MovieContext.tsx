import { createContext, useContext, ReactNode } from 'react';
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

  const handleAddToFavorites = (item: Movie | TVShow, mediaType: MediaType) => {
    dispatch(addToFavorites({ item, mediaType }));
  };

  const handleRemoveFromFavorites = (itemId: number, mediaType: MediaType) => {
    dispatch(removeFromFavorites({ itemId, mediaType }));
  };

  const isFavorite = (itemId: number, mediaType: MediaType) => {
    return favorites.some(
      item => item.id === itemId && item.mediaType === mediaType
    );
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // 提供context給其他元件使用
  const value: MovieContextType = {
    favorites,
    addToFavorites: handleAddToFavorites,
    removeFromFavorites: handleRemoveFromFavorites,
    isFavorite,
    theme,
    toggleTheme: handleToggleTheme,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
