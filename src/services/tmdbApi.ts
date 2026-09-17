import {
  Movie,
  TVShow,
  Cast,
  Video,
  MediaType,
  PaginatedResponse,
  WatchProvidersResponse,
} from '../types/tmdb';
import { genreKey } from '../utils/genres';

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

export const TMDB_MAX_PAGE = 500;
const LIST_PAGE_SIZE = 20;
const MAX_GENRE_FILTER_SCAN_PAGES = 5;

function itemMatchesGenres(
  item: { genre_ids?: number[] },
  genreIds: number[]
): boolean {
  const ids = item.genre_ids ?? [];
  return genreIds.some(id => ids.includes(id));
}

async function searchAndFilterByGenre<T extends { genre_ids?: number[] }>(
  searchFn: (query: string, page: number) => Promise<PaginatedResponse<T>>,
  query: string,
  genreIds: number[],
  page: number
): Promise<PaginatedResponse<T>> {
  const matches: T[] = [];
  let searchPage = 1;
  let totalSearchPages = 1;
  const needed = page * LIST_PAGE_SIZE;

  while (
    matches.length < needed &&
    searchPage <= totalSearchPages &&
    searchPage <= Math.min(TMDB_MAX_PAGE, MAX_GENRE_FILTER_SCAN_PAGES)
  ) {
    const data = await searchFn(query, searchPage);
    totalSearchPages = data.total_pages;
    matches.push(
      ...data.results.filter(item => itemMatchesGenres(item, genreIds))
    );
    searchPage += 1;
  }

  const start = (page - 1) * LIST_PAGE_SIZE;
  const results = matches.slice(start, start + LIST_PAGE_SIZE);
  const scannedAll =
    searchPage > totalSearchPages || searchPage > MAX_GENRE_FILTER_SCAN_PAGES;
  const total_results = scannedAll
    ? matches.length
    : Math.max(
        matches.length,
        results.length === LIST_PAGE_SIZE ? needed + 1 : matches.length
      );
  const total_pages = Math.max(
    1,
    Math.min(TMDB_MAX_PAGE, Math.ceil(total_results / LIST_PAGE_SIZE) || 1)
  );

  return {
    page,
    results,
    total_pages,
    total_results,
  };
}

//獲取近期受歡迎的電影
export const getPopularMovies = (page = 1): Promise<PaginatedResponse<Movie>> =>
  fetchTMDB<PaginatedResponse<Movie>>('/movie/popular', {
    page: String(page),
  });

//獲取近期受歡迎的電視劇
export const getPopularTVShows = (
  page = 1
): Promise<PaginatedResponse<TVShow>> =>
  fetchTMDB<PaginatedResponse<TVShow>>('/tv/popular', {
    page: String(page),
  });

//查詢電影
export const searchMovies = (
  query: string,
  page = 1
): Promise<PaginatedResponse<Movie>> =>
  fetchTMDB<PaginatedResponse<Movie>>('/search/movie', {
    query,
    page: String(page),
  });

//查詢電視劇
export const searchTVShows = (
  query: string,
  page = 1
): Promise<PaginatedResponse<TVShow>> =>
  fetchTMDB<PaginatedResponse<TVShow>>('/search/tv', {
    query,
    page: String(page),
  });

export const searchMoviesInGenres = (
  query: string,
  genreIds: number[],
  page = 1
): Promise<PaginatedResponse<Movie>> =>
  searchAndFilterByGenre(searchMovies, query, genreIds, page);

export const searchTVShowsInGenres = (
  query: string,
  genreIds: number[],
  page = 1
): Promise<PaginatedResponse<TVShow>> =>
  searchAndFilterByGenre(searchTVShows, query, genreIds, page);

export const discoverMovies = (
  genreIds: number[],
  page = 1
): Promise<PaginatedResponse<Movie>> =>
  fetchTMDB<PaginatedResponse<Movie>>('/discover/movie', {
    with_genres: genreKey(genreIds),
    sort_by: 'popularity.desc',
    page: String(page),
  });

export const discoverTVShows = (
  genreIds: number[],
  page = 1
): Promise<PaginatedResponse<TVShow>> =>
  fetchTMDB<PaginatedResponse<TVShow>>('/discover/tv', {
    with_genres: genreKey(genreIds),
    sort_by: 'popularity.desc',
    page: String(page),
  });

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

export const getWatchProviders = (
  mediaType: MediaType,
  id: string
): Promise<WatchProvidersResponse> =>
  fetchTMDB<WatchProvidersResponse>(
    `/${mediaType}/${id}/watch/providers`,
    {},
    false
  );
