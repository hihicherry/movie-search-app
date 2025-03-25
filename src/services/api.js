const APIKEY = "29c03fd685daf100af0e688cdd6a3315";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async() => {
    const response = await fetch(
		`${BASE_URL}/movie/popular?api_key=${APIKEY}&language=zh-TW`
	);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
	const response = await fetch(`${BASE_URL}/search/movie?api_key=${APIKEY}&query=${encodeURIComponent(query)}`);
	const data = await response.json();
	return data.results;
};

