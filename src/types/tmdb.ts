export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  genres?: { id: number; name: string }[];
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
