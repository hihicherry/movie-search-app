import { MediaType } from '../types/tmdb';

export const tmdbKeys = {
  popular: (mediaType: MediaType, page: number) =>
    ['tmdb', 'popular', mediaType, page] as const,
  search: (mediaType: MediaType, query: string, page: number) =>
    ['tmdb', 'search', mediaType, query, page] as const,
  searchInGenres: (
    mediaType: MediaType,
    query: string,
    genreKey: string,
    page: number
  ) => ['tmdb', 'searchInGenres', mediaType, query, genreKey, page] as const,
  discover: (mediaType: MediaType, genreKey: string, page: number) =>
    ['tmdb', 'discover', mediaType, genreKey, page] as const,
  details: (mediaType: MediaType, id: string) =>
    ['tmdb', 'details', mediaType, id] as const,
  credits: (mediaType: MediaType, id: string) =>
    ['tmdb', 'credits', mediaType, id] as const,
  videos: (mediaType: MediaType, id: string) =>
    ['tmdb', 'videos', mediaType, id] as const,
  watchProviders: (mediaType: MediaType, id: string) =>
    ['tmdb', 'watchProviders', mediaType, id] as const,
};
