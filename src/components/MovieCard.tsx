import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Movie, TVShow, MediaType } from '../types/tmdb';

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
      className="relative bg-theme-purple-card-gradient theme-blue:bg-theme-blue-card-gradient h-full flex flex-col shadow-lg border-2 border-violet-300 theme-blue:border-sky-400 transition-colors duration-300 hover:animate-pulse"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="relative aspect-[2/3] w-full p-2">
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={title}
            className="w-full h-full rounded"
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
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
          <button
            className={`absolute top-4 right-4 text-white text-xl p-2 bg-[#00000080] rounded-full border-2 border-white w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-[#302626cc] hover:border-gray-300 ${
              favorite ? '!text-[#ef4444] !border-red-500' : ''
            }`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h2 className="font-pixel text-lg text-purple theme-blue:text-blue m-0">
          {title}
        </h2>
        <p className="font-pixel text-sm text-gray-600">
          {releaseDate ? releaseDate.slice(0, 4) : '未知'}
        </p>
        <Link
          className="font-pixel text-sm text-purple theme-blue:text-blue  hover:text-violet-500 theme-blue:hover:text-sky-500"
          to={`/${mediaType}/${item.id}`}
        >
          詳細資訊
        </Link>
      </div>
    </div>
  );
}

export default memo(MovieCard);
