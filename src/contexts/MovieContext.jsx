import { createContext, useContext, useEffect, useState} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");

        if(storedFavs) setFavorites(JSON.parse(storedFavs));
    },[])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (item, mediaType) => {
		setFavorites((prev) => [
			...prev, {...item, mediaType},
		]);
	};

    const removeFromFavorites = (itemId, mediaType) => {
        setFavorites((prev) => prev.filter(
            (item) => item.id !== itemId || item.mediaType !== mediaType
        ));
    };

    const isFavorites = (itemId, mediaType) => {
        return favorites.some(
            (item)=> item.id === itemId && item.mediaType === mediaType
        );
    };


    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorites,
    };

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}


