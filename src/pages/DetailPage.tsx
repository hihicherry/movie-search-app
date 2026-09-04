import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useFavorites } from '../contexts/FavoritesContext';
import { getDetails, getCredits, getVideos } from '../services/tmdbApi';
import { tmdbKeys } from '../query/keys';
import { ERROR_MESSAGES } from '../utils/errors';
import { Movie, TVShow, Video, MediaType } from '../types/tmdb';

//統一日期格式
const formatDate = (dateString?: string): string => {
  if (!dateString) return '無資料';
  const [year, month, day] = dateString.split('-');
  return `${year}年${month}月${day}日`;
};

const DetailPage: React.FC = () => {
  const { id, mediaType } = useParams();
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const canFetch = Boolean(id) && (mediaType === 'movie' || mediaType === 'tv');

  const detailsQuery = useQuery({
    queryKey: tmdbKeys.details(mediaType as MediaType, id ?? ''),
    queryFn: () => getDetails(mediaType as MediaType, id!),
    enabled: canFetch,
  });

  const creditsQuery = useQuery({
    queryKey: tmdbKeys.credits(mediaType as MediaType, id ?? ''),
    queryFn: () => getCredits(mediaType as MediaType, id!),
    enabled: canFetch,
    select: credits => credits.slice(0, 5),
  });

  const videosQuery = useQuery({
    queryKey: tmdbKeys.videos(mediaType as MediaType, id ?? ''),
    queryFn: () => getVideos(mediaType as MediaType, id!),
    enabled: canFetch,
    select: (videoData: Video[]) => {
      const trailer = videoData.find(
        video =>
          video.site === 'YouTube' &&
          (video.type === 'Trailer' || video.type === 'Teaser')
      );
      return trailer ? [trailer] : [];
    },
  });

  const data = detailsQuery.data ?? null;
  const cast = creditsQuery.data ?? [];
  const videos = videosQuery.data ?? [];
  const isFav = isFavorite(parseInt(id ?? '', 10), mediaType as MediaType);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!data || (mediaType !== 'movie' && mediaType !== 'tv')) return;
    if (isFav) {
      removeFromFavorites(data.id, mediaType);
    } else {
      addToFavorites(data, mediaType);
    }
  };

  const handleTrailerClick = () => {
    if (videos.length > 0) {
      setShowTrailer(true);
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  if (detailsQuery.isLoading)
    return (
      <p className="text-center text-xl font-pixel font-bold text-purple theme-blue:text-blue animate-blink">
        載入中...
      </p>
    );
  if (detailsQuery.isError)
    return (
      <p className="font-pixel text-center text-xl text-red-500">
        {ERROR_MESSAGES.DETAILS_FAILED}
      </p>
    );
  if (!data)
    return (
      <p className="font-pixel text-center text-xl text-gray-500">查無此內容</p>
    );

  return (
    <motion.div
      className="p-6 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280${data.backdrop_path}')`,
        }}
      >
        <h1 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-pixel text-white [text-shadow:_0_2px_10px_#475569]">
          {(data as Movie).title || (data as TVShow).name}
        </h1>
      </div>

      {/* 預告片按鈕區域 */}
      <div className="mt-1 mb-2">
        <button
          className={`mt-2 px-3 py-2 font-pixel rounded-sm transition-all duration-300 ${
            videos.length > 0
              ? 'bg-violet-200 theme-blue:bg-sky-200 text-purple theme-blue:text-blue border-2 border-t-white border-l-white border-r-violet-400 border-b-violet-400 theme-blue:border-r-sky-400 theme-blue:border-b-sky-400 hover:bg-violet-300 theme-blue:hover:bg-sky-300 hover:animate-flicker'
              : 'bg-gray-400 text-gray-200 border-2  border-t-white border-l-white border-b-gray-500 border-r-gray-500 cursor-not-allowed'
          }`}
          onClick={handleTrailerClick}
          disabled={videos.length === 0}
        >
          {videos.length > 0 ? '觀看預告片 ▷' : '無預告片可觀看'}
        </button>
      </div>

      {/* 預告片視窗 */}
      {showTrailer && videos.length > 0 && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative bg-purple-gradient theme-blue:bg-blue-gradient p-4 rounded-lg max-w-4xl w-full">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeTrailer}
            >
              &times;
            </button>
            <div
              className="relative w-full"
              style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full border-2 border-[#7776B3] dark:border-[#533670] rounded-lg"
                src={`https://www.youtube.com/embed/${videos[0].key}?rel=0&modestbranding=1&autoplay=1`}
                title="預告片"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 font-pixel bg-theme-purple-card-gradient theme-blue:bg-theme-blue-card-gradient rounded-2xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-colors duration-300"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <motion.div
          initial="fadeIn"
          animate="fadeIn"
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-purple theme-blue:text-blue text-xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
            主要演員：
          </h2>
          <ul className="mt-2 space-y-1">
            {cast.map(actor => (
              <li key={actor.id} className="text-gray-800">
                {actor.name} - {actor.character}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial="fadeIn"
          animate="fadeIn"
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-purple theme-blue:text-blue text-xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
            內容簡介：
          </h2>
          <p className="mt-2 text-gray-800">{data.overview || '無簡介'}</p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mt-4 text-gray-800">
          <p>
            <span className="font-bold text-purple theme-blue:text-blue [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
              🎬 類型：
            </span>{' '}
            {data.genres?.map(genre => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </p>
          <p>
            <span className="font-bold text-purple theme-blue:text-blue [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
              ⭐ 評分：
            </span>{' '}
            {data.vote_average}
          </p>
          {mediaType === 'movie' && (
            <p>
              <strong className="font-bold text-purple theme-blue:text-blue [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
                📅 上映日期：
              </strong>
              <span>{formatDate((data as Movie).release_date)}</span>
            </p>
          )}
          {mediaType === 'tv' && (
            <>
              <p className="mb-2 text-gray-800">
                <strong className="font-bold text-purple theme-blue:text-blue [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
                  📅 首播日期：
                </strong>
                <span>{formatDate((data as TVShow).first_air_date)}</span>
              </p>
              <p className="mb-2 text-gray-800">
                <strong className="font-bold text-purple theme-blue:text-blue [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
                  📺 季數：
                </strong>{' '}
                {(data as TVShow).number_of_seasons} 季
              </p>
              <p className="mb-2 text-gray-800">
                <strong className="font-bold text-purple theme-blue:text-blue [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
                  📺 集數：
                </strong>{' '}
                {(data as TVShow).number_of_episodes} 集
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className={`mt-2 font-pixel bg-fuchsia-200 text-gray-700 border-2 border-t-white border-l-white border-r-fuchsia-400 border-b-fuchsia-400 px-3 py-2 rounded-sm transition-all duration-300 hover:bg-fuchsia-300 hover:animate-flicker ${
            isFav
              ? 'bg-fuchsia-100 border-r-fuchsia-300 border-b-fuchsia-300 hover:bg-fuchsia-200'
              : ''
          }`}
          onClick={handleFavoriteClick}
        >
          {isFav ? '♡ 從我的最愛移除' : '♥ 加入我的最愛'}
        </button>
        <button
          className="mt-2 font-pixel bg-gray-200 text-gray-700 px-3 py-2 rounded-sm border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 hover:bg-gray-300 hover:animate-flicker"
          onClick={() => navigate(-1)}
        >
          <span>←</span> 返回
        </button>
      </div>
    </motion.div>
  );
};

export default DetailPage;
