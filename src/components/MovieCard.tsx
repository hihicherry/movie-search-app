import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Movie, TVShow, MediaType } from '../types/tmdb';
import { POSTER_SIZES, posterSrcSet, posterUrl } from '../utils/tmdbImage';

interface MovieCardProps {
  item: Movie | TVShow;
  mediaType: MediaType;
}

function MovieCard({ item, mediaType }: MovieCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, mediaType);

  function onFavoriteClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(item.id, mediaType);
    } else {
      addToFavorites(item, mediaType);
    }
  }

  const title =
    mediaType === 'movie' ? (item as Movie).title : (item as TVShow).name;
  const releaseDate =
    mediaType === 'movie'
      ? (item as Movie).release_date
      : (item as TVShow).first_air_date;

  return (
    <div
      className="relative bg-theme-purple-card-gradient theme-blue:bg-theme-blue-card-gradient h-full flex flex-col shadow-md md:shadow-lg border-2 border-violet-300 theme-blue:border-sky-400 transition-colors duration-300 hover:animate-pulse"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="relative aspect-[2/3] w-full p-1.5 md:p-2">
        {item.poster_path ? (
          <img
            src={posterUrl(item.poster_path)}
            srcSet={posterSrcSet(item.poster_path)}
            sizes={POSTER_SIZES}
            alt={title}
            className="w-full h-full rounded object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full rounded bg-violet-200 theme-blue:bg-sky-200 flex items-center justify-center font-pixel text-xs text-purple theme-blue:text-blue"
            aria-label={`${title} 無海報`}
          >
            無海報
          </div>
        )}
        <button
          className={`absolute top-2 right-2 md:top-3 md:right-3 text-white text-base md:text-xl p-1.5 md:p-2 bg-[#00000080] rounded-full border-2 border-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors duration-200 hover:bg-[#302626cc] hover:border-gray-300 ${
            favorite ? '!text-[#ef4444] !border-red-500' : ''
          }`}
          onClick={onFavoriteClick}
          aria-label={favorite ? '從我的最愛移除' : '加入我的最愛'}
        >
          ♥
        </button>
      </div>
      <div className="p-2 md:p-3 flex-1 flex flex-col gap-1 md:gap-2">
        <h2 className="font-pixel text-xs md:text-sm text-purple theme-blue:text-blue m-0 leading-snug">
          {title}
        </h2>
        <p className="font-pixel text-[11px] md:text-xs text-gray-600">
          {releaseDate ? releaseDate.slice(0, 4) : '未知'}
        </p>
        <Link
          className="font-pixel text-[11px] md:text-xs text-purple theme-blue:text-blue hover:text-violet-500 theme-blue:hover:text-sky-500"
          to={`/${mediaType}/${item.id}`}
        >
          詳細資訊
        </Link>
      </div>
    </div>
  );
}

export default memo(MovieCard);
