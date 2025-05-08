const APIKEY = '29c03fd685daf100af0e688cdd6a3315';
const BASE_URL = 'https://api.themoviedb.org/3';

// 通用api函數
const fetchTMDB = async (endpoint, params = {}) => {
  try {
    const queryString = new URLSearchParams({
      api_key: APIKEY,
      language: 'zh-TW',
      ...params,
    }).toString();
    const response = await fetch(`${BASE_URL}${endpoint}?${queryString}`);
    if (!response.ok) throw new Error('API 請求失敗');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('無法獲取資料，請稍後再試');
  }
};

//獲取近期受歡迎的電影
export const getPopularMovies = () =>
  fetchTMDB('/movie/popular').then(data => data.results);

//獲取近期受歡迎的電視劇
export const getPopularTVShows = () =>
  fetchTMDB('/tv/popular').then(data => data.results);

//查詢電影
export const searchMovies = query =>
  fetchTMDB('/search/movie', { query }).then(data => data.results);

//查詢電視劇
export const searchTVShows = query =>
  fetchTMDB('/search/tv', { query }).then(data => data.results);

export const getDetails = (mediaType, id) => fetchTMDB(`/${mediaType}/${id}`);

export const getCredits = (mediaType, id) =>
  fetchTMDB(`/${mediaType}/${id}/credits`).then(data => data.cast);
