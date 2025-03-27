import { createContext, useContext, useEffect, useState} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
	const [favorites, setFavorites] = useState(() => {
		//初始化時讀取localstorage的資料
		const storedFavs = localStorage.getItem("favorites");
		return storedFavs ? JSON.parse(storedFavs) : [];
	});

	// 監聽favorites變化，存入localStorage
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const addToFavorites = (item, mediaType) => {
		setFavorites((prev) => {
			const isAlreadyFavorite = prev.some(
				(fav) => fav.id === item.id && fav.mediaType === mediaType
			);
			if (isAlreadyFavorite) return prev;
			const newItem = { ...item, mediaType };
			console.log("Adding to favorites:", newItem);
			return [...prev, { ...item, mediaType }]; // 確保 mediaType 存進去！
		});
	};

	const removeFromFavorites = (itemId, mediaType) => {
		setFavorites((prev) =>
			prev.filter(
				(item) => item.id !== itemId || item.mediaType !== mediaType
			)
		);
	};

	const isFavorites = (itemId, mediaType) => {
		return favorites.some(
			(item) => item.id === itemId && item.mediaType === mediaType
		);
	};

    //提供context給其他元件使用
	const value = {
		favorites,
		addToFavorites,
		removeFromFavorites,
		isFavorites,
	};

	return (
		<MovieContext.Provider value={value}>{children}</MovieContext.Provider>
	);
}


