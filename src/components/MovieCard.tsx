import { useMovieContext } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Movie, TVShow, MediaType } from '../types/tmdb';

interface MovieCardProps {
  item: Movie | TVShow;
  mediaType: MediaType;
}

function MovieCard({ item, mediaType }: MovieCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(item.id, mediaType);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // 使用 IntersectionObserver 實現懶加載
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative rounded-xl bg-card-gradient dark:bg-dark-card-gradient h-full flex flex-col shadow-lg border-2 border-violet-300 dark:border-sky-400 transition-colors duration-300"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="relative aspect-[2/3] w-full p-2">
        <img
          ref={imgRef}
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : '/placeholder.jpg'
          }
          alt={title}
          className="w-full h-full rounded"
          loading="lazy"
        />
        <div className="absolute inset-0  opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
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
        <h3 className="font-bold text-purple dark:text-blue m-0">{title}</h3>
        <p className="text-sm text-gray-600">
          {releaseDate ? releaseDate.slice(0, 4) : '未知'}
        </p>
        <Link
          className="text-purple dark:text-blue hover:text-violet-500 dark:hover:text-sky-500"
          to={`/movie-search-app/${mediaType}/${item.id}`}
        >
          詳細資訊
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
