const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const posterUrl = (
  posterPath: string,
  size: 'w185' | 'w342' | 'w500' = 'w342'
) => `${TMDB_IMAGE_BASE}/${size}${posterPath}`;

export const posterSrcSet = (posterPath: string) =>
  [
    `${posterUrl(posterPath, 'w185')} 185w`,
    `${posterUrl(posterPath, 'w342')} 342w`,
    `${posterUrl(posterPath, 'w500')} 500w`,
  ].join(', ');

export const POSTER_SIZES =
  '(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 22vw';
