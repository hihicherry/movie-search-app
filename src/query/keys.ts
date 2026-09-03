import { MediaType } from '../types/tmdb';

export const tmdbKeys = {
  popular: (mediaType: MediaType) =>
    ['tmdb', 'popular', mediaType] as const,
  search: (mediaType: MediaType, query: string) =>
    ['tmdb', 'search', mediaType, query] as const,
  details: (mediaType: MediaType, id: string) =>
    ['tmdb', 'details', mediaType, id] as const,
  credits: (mediaType: MediaType, id: string) =>
    ['tmdb', 'credits', mediaType, id] as const,
  videos: (mediaType: MediaType, id: string) =>
    ['tmdb', 'videos', mediaType, id] as const,
};
