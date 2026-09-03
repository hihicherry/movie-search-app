import { Movie, TVShow, Cast, Video, MediaType } from '../types/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const getApiKey = (): string => {
  if (!API_KEY) {
    throw new Error(
      '缺少 VITE_TMDB_API_KEY，請複製 .env.example 為 .env 並填入金鑰'
    );
  }
  return API_KEY;
};

// 通用api函數
const fetchTMDB = async <T>(
  endpoint: string,
  params: Record<string, string> = {},
  includeLanguage: boolean = true
): Promise<T> => {
  try {
    const queryParams: Record<string, string> = {
      api_key: getApiKey(),
      ...params,
    };
    // 只有在 includeLanguage 為 true 時添加語言參數
    if (includeLanguage) {
      queryParams.language = 'zh-TW';
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${BASE_URL}${endpoint}?${queryString}`);
    if (!response.ok) throw new Error('API 請求失敗');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('無法獲取資料，請稍後再試');
  }
};

//獲取近期受歡迎的電影
export const getPopularMovies = (): Promise<Movie[]> =>
  fetchTMDB<{ results: Movie[] }>('/movie/popular').then(data => data.results);

//獲取近期受歡迎的電視劇
export const getPopularTVShows = (): Promise<TVShow[]> =>
  fetchTMDB<{ results: TVShow[] }>('/tv/popular').then(data => data.results);

//查詢電影
export const searchMovies = (query: string): Promise<Movie[]> =>
  fetchTMDB<{ results: Movie[] }>('/search/movie', { query }).then(
    data => data.results
  );

//查詢電視劇
export const searchTVShows = (query: string): Promise<TVShow[]> =>
  fetchTMDB<{ results: TVShow[] }>('/search/tv', { query }).then(
    data => data.results
  );

// 獲取電影或電視劇介紹
export const getDetails = (
  mediaType: MediaType,
  id: string
): Promise<Movie | TVShow> => fetchTMDB(`/${mediaType}/${id}`);

// 獲取演員名單
export const getCredits = (mediaType: MediaType, id: string): Promise<Cast[]> =>
  fetchTMDB<{ cast: Cast[] }>(`/${mediaType}/${id}/credits`).then(
    data => data.cast
  );

// 獲取電影或電視劇的預告片
export const getVideos = (mediaType: MediaType, id: string): Promise<Video[]> =>
  fetchTMDB<{ results: Video[] }>(`/${mediaType}/${id}/videos`, {}, false).then(
    data => data.results
  );
