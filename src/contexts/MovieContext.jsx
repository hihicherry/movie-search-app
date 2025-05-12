import { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  // 初始化收藏清單，從 localStorage 讀取或預設為空陣列
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem('favorites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // 初始化主題，從 localStorage 讀取或預設為淺色
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
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
  const addToFavorites = (item, mediaType) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(
        fav => fav.id === item.id && fav.mediaType === mediaType
      );
      if (isAlreadyFavorite) return prev;
      const newItem = { ...item, mediaType };
      console.log('Adding to favorites:', newItem);
      return [...prev, { ...item, mediaType }];
    });
  };

  // 從收藏清單移除
  const removeFromFavorites = (itemId, mediaType) => {
    setFavorites(prev =>
      prev.filter(item => item.id !== itemId || item.mediaType !== mediaType)
    );
  };

  // 從收藏清單移除
  const isFavorite = (itemId, mediaType) => {
    return favorites.some(
      item => item.id === itemId && item.mediaType === mediaType
    );
  };

  // 提供context給其他元件使用
  const value = {
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
