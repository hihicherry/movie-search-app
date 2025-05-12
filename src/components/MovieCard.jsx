import { useMovieContext } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';

function MovieCard({ item, mediaType }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(item.id, mediaType);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(item.id, mediaType);
    } else {
      addToFavorites(item, mediaType);
    }
  }

  const title = mediaType === 'movie' ? item.title : item.name;
  const releaseDate =
    mediaType === 'movie' ? item.release_date : item.first_air_date;

  return (
    <div
      className="relative rounded-lg bg-card-gradient dark:bg-dark-card-gradient h-full flex flex-col shadow-[0_4px_10px_rgba(0,0,0,0.401)] transition-colors duration-300"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="relative aspect-[2/3] w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className="w-full h-full rounded"
        />
        <div className="absolute inset-0 bg-overlay-gradient dark:bg-dark-overlay-gradient opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
          <button
            className={`absolute top-4 right-4 text-white text-xl p-2 bg-[#00000080] rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-[#302626cc] ${
              favorite ? 'text-[#ff4757]' : ''
            }`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-base text-light dark:text-muted m-0">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {releaseDate ? releaseDate.slice(0, 4) : '未知'}
        </p>
        <Link
          className="text-light dark:text-muted hover:text-hover dark:hover:text-hover"
          to={`/movie-search-app/${
            mediaType === 'movie' ? 'movie' : 'tv'
          }/${item.id}`}
        >
          詳細資訊
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
