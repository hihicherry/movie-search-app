import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Movie, TVShow, MediaType } from '../types/tmdb';

interface MovieContextType {
  favorites: (Movie | TVShow)[];
  addToFavorites: (item: Movie | TVShow, mediaType: MediaType) => void;
  removeFromFavorites: (itemId: number, mediaType: MediaType) => void;
  isFavorite: (itemId: number, mediaType: MediaType) => boolean;
  theme: 'light' | 'dark';
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
  // 初始化收藏清單，從 localStorage 讀取或預設為空陣列
  const [favorites, setFavorites] = useState<(Movie | TVShow)[]>(() => {
    const storedFavs = localStorage.getItem('favorites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // 初始化主題，從 localStorage 讀取或預設為淺色
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // 監聽favorites變化，存入localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 監聽 theme 變化，存入 localStorage 並更新 document class
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // 切換主題（light/dark）
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 添加到收藏清單，確保不重複
  const addToFavorites = (item: Movie | TVShow, mediaType: MediaType) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(
        fav => fav.id === item.id && fav.mediaType === mediaType
      );
      if (isAlreadyFavorite) return prev;
      const newItem = { ...item, mediaType };
      console.log('Adding to favorites:', newItem);
      return [...prev, newItem];
    });
  };

  // 從收藏清單移除
  const removeFromFavorites = (itemId: number, mediaType: MediaType) => {
    setFavorites(prev =>
      prev.filter(item => item.id !== itemId || item.mediaType !== mediaType)
    );
  };

  // 從收藏清單移除
  const isFavorite = (itemId: number, mediaType: MediaType) => {
    return favorites.some(
      item => item.id === itemId && item.mediaType === mediaType
    );
  };

  // 提供context給其他元件使用
  const value: MovieContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    theme,
    toggleTheme,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
