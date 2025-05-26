import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovieContext } from '../contexts/MovieContext';
import { getDetails, getCredits, getVideos } from '../services/tmdbApi';
import { ERROR_MESSAGES } from '../utils/errors';
import { Movie, TVShow, Cast, Video, MediaType } from '../types/tmdb';

//統一日期格式
const formatDate = (dateString?: string): string => {
  if (!dateString) return '無資料';
  const [year, month, day] = dateString.split('-');
  return `${year}年${month}月${day}日`;
};

interface Params {
  id: string;
  mediaType: MediaType;
}

const DetailPage: React.FC = () => {
  const { id, mediaType } = useParams<Params>();
  const [data, setData] = useState<Movie | TVShow | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useMovieContext();
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    const isAlreadyFav = isFavorite(parseInt(id!), mediaType!);
    setIsFav(isAlreadyFav);
  }, [favorites, id, mediaType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getDetails(mediaType!, id!);
        setData(details);
      } catch (err) {
        setError(ERROR_MESSAGES.DETAILS_FAILED);
      }
    };

    const fetchCast = async () => {
      try {
        const credits = await getCredits(mediaType!, id!);
        setCast(credits.slice(0, 5));
      } catch (err) {
        setError(ERROR_MESSAGES.CREDITS_FAILED);
      }
    };

    const fetchVideos = async () => {
      try {
        const videoData = await getVideos(mediaType!, id!);
        // 篩選 YouTube 平台的預告片
        const trailer = videoData.find(
          (video: Video) =>
            video.site === 'YouTube' &&
            ['Trailer', 'Teaser'].includes(video.type)
        );
        setVideos(trailer ? [trailer] : []);
      } catch (err) {
        setError('無法載入預告片');
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchData(), fetchCast(), fetchVideos()]);
      setLoading(false);
    };

    loadData();
  }, [id, mediaType]);

  const handleFavoriteClick = e => {
    e.preventDefault();
    if (isFav) {
      removeFromFavorites(data!.id, mediaType!);
    } else {
      addToFavorites(data!, mediaType!);
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

  if (loading)
    return (
      <p className="text-center text-xl font-bold text-[#533670] dark:text-light animate-blink">
        載入中...
      </p>
    );
  if (!data)
    return (
      <p className="text-center text-xl text-gray-500 dark:text-gray-300">
        查無此內容
      </p>
    );
  if (error)
    return (
      <p className="text-center text-xl text-red-500 dark:text-red-400">
        {error}
      </p>
    );

  return (
    <motion.div
      className="p-6 bg-white dark:bg-dark-bg transition-colors duration-300"
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
        <div className="absolute inset-0 bg-overlay-gradient dark:bg-dark-overlay-gradient"></div>
        <h1 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-bold text-white [text-shadow:_0_2px_10px_#4612a1]">
          {(data as Movie).title || (data as TVShow).name}
        </h1>
      </div>

      {/* 預告片按鈕區域 */}
      <div className="mt-6 mb-2">
        <button
          className={`mt-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            videos.length > 0
              ? 'bg-[#7776B3] dark:bg-[#533670] text-white hover:bg-[#6665A2] dark:hover:bg-[#42255F]'
              : 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed'
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
          <div className="relative bg-card-gradient dark:bg-dark-card-gradient p-4 rounded-lg max-w-4xl w-full">
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card-gradient dark:bg-dark-card-gradient text-white rounded-2xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-colors duration-300"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <motion.div
          initial="fadeIn"
          animate="fadeIn"
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-soft text-xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
            主要演員：
          </h2>
          <ul className="mt-2 space-y-1">
            {cast.map(actor => (
              <li key={actor.id} className="text-light dark:text-muted">
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
          <h2 className="text-soft text-xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
            內容簡介：
          </h2>
          <p className="mt-2 text-light dark:text-muted">
            {data.overview || '無簡介'}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mt-4 text-light dark:text-muted">
          <p>
            <span className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
              🎬 類型：
            </span>{' '}
            {data.genres?.map(genre => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </p>
          <p>
            <span className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
              ⭐ 評分：
            </span>{' '}
            {data.vote_average}
          </p>
          {mediaType === 'movie' && (
            <p>
              <strong className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
                📅 上映日期：
              </strong>
              <span>{formatDate((data as Movie).release_date)}</span>
            </p>
          )}
          {mediaType === 'tv' && (
            <>
              <p className="mb-2 text-light dark:text-muted">
                <strong className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
                  📅 首播日期：
                </strong>
                <span>{formatDate((data as TVShow).first_air_date)}</span>
              </p>
              <p className="mb-2 text-light dark:text-muted">
                <strong className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
                  📺 季數：
                </strong>{' '}
                {(data as TVShow).number_of_seasons} 季
              </p>
              <p className="mb-2 text-light dark:text-muted">
                <strong className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
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
          className={`bg-favorite-btn dark:bg-dark-favorite-btn text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-favorite-btn-hover dark:hover:bg-dark-favorite-btn-hover ${
            isFav
              ? 'bg-favorite-btn-active dark:bg-dark-favorite-btn-active animate-pulse'
              : ''
          }`}
          onClick={handleFavoriteClick}
        >
          {isFav ? '♡ 從我的最愛移除' : '♥ 加入我的最愛'}
        </button>
        <button
          className="bg-back-btn dark:bg-dark-back-btn text-white px-4 py-2 rounded-lg hover:bg-back-btn-hover dark:hover:bg-dark-back-btn-hover"
          onClick={() => navigate(-1)}
        >
          <span>←</span> 返回
        </button>
      </div>
    </motion.div>
  );
};

export default DetailPage;
