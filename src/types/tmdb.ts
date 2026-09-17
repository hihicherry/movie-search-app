export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  genres?: { id: number; name: string }[];
  genre_ids?: number[];
  mediaType: MediaType;
}

export interface TVShow {
  id: number;
  name: string;
  first_air_date?: string;
  poster_path?: string | null;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  genres?: { id: number; name: string }[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  genre_ids?: number[];
  mediaType: MediaType;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
}

export type MediaType = 'movie' | 'tv';

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface WatchProviderRegion {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, WatchProviderRegion>;
}
