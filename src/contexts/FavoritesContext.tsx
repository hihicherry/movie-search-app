import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Movie, TVShow, MediaType } from '../types/tmdb';

type FavoriteItem = (Movie | TVShow) & { mediaType: MediaType };

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: Movie | TVShow, mediaType: MediaType) => void;
  removeFromFavorites: (itemId: number, mediaType: MediaType) => void;
  isFavorite: (itemId: number, mediaType: MediaType) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const readStoredFavorites = (): FavoriteItem[] => {
  try {
    const raw = localStorage.getItem('favorites');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistFavorites = (favorites: FavoriteItem[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] =
    useState<FavoriteItem[]>(readStoredFavorites);

  const addToFavorites = useCallback(
    (item: Movie | TVShow, mediaType: MediaType) => {
      setFavorites(prev => {
        const exists = prev.some(
          fav => fav.id === item.id && fav.mediaType === mediaType
        );
        if (exists) return prev;
        const next = [...prev, { ...item, mediaType }];
        persistFavorites(next);
        return next;
      });
    },
    []
  );

  const removeFromFavorites = useCallback(
    (itemId: number, mediaType: MediaType) => {
      setFavorites(prev => {
        const next = prev.filter(
          item => item.id !== itemId || item.mediaType !== mediaType
        );
        persistFavorites(next);
        return next;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (itemId: number, mediaType: MediaType) =>
      favorites.some(
        item => item.id === itemId && item.mediaType === mediaType
      ),
    [favorites]
  );

  const value = useMemo<FavoritesContextType>(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }),
    [favorites, addToFavorites, removeFromFavorites, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
