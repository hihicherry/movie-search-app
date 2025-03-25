const APIKEY = "29c03fd685daf100af0e688cdd6a3315";
const BASE_URL = "https://api.themoviedb.org/3";

//獲取近期受歡迎的電影
export const getPopularMovies = async() => {
    const response = await fetch(
		`${BASE_URL}/movie/popular?api_key=${APIKEY}&language=zh-TW`
	);
    const data = await response.json();
    return data.results;
};

//獲取近期受歡迎的電視劇
export const getPopularTVShows = async() => {
    const response = await fetch(
		`${BASE_URL}/tv/popular?api_key=${APIKEY}&language=zh-TW`
	);
    const data = await response.json();
    return data.results;
};

//查詢電影
export const searchMovies = async (query) => {
	const response = await fetch(
		`${BASE_URL}/search/movie?api_key=${APIKEY}&query=${encodeURIComponent(
			query
		)}&language=zh-TW`
	);
	const data = await response.json();
	return data.results;
};

//查詢電視劇
export const searchTVShows = async (query)=>{
    const response = await fetch(
		`${BASE_URL}/search/tv?api_key=${APIKEY}&query=${encodeURIComponent(
			query
		)}&language=zh-TW`
	);
    const data = await response.json();
    return data.results;
};