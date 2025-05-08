import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovieContext } from '../contexts/MovieContext';
import { getDetails, getCredits } from '../services/tmdbApi';
import { ERROR_MESSAGES } from '../utils/errors';

//統一日期格式
const formatDate = dateString => {
  if (!dateString) return '無資料';
  const [year, month, day] = dateString.split('-');
  return `${year}年${month}月${day}日`;
};

const DetailPage = () => {
  const { id, mediaType } = useParams();
  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useMovieContext();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const isAlreadyFav = isFavorite(parseInt(id), mediaType);
    setIsFav(isAlreadyFav);
  }, [favorites, id, mediaType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getDetails(mediaType, id);
        setData(details);
      } catch (err) {
        setError(ERROR_MESSAGES.DETAILS_FAILED);
      }
    };

    const fetchCast = async () => {
      try {
        const credits = await getCredits(mediaType, id);
        setCast(credits.slice(0, 5));
      } catch (err) {
        setError(ERROR_MESSAGES.CREDITS_FAILED);
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchData(), fetchCast()]);
      setLoading(false);
    };

    loadData();
  }, [id, mediaType]);

  const handleFavoriteClick = e => {
    e.preventDefault();
    if (isFav) {
      removeFromFavorites(data.id, mediaType);
    } else {
      addToFavorites(data, mediaType);
    }
  };

  if (loading)
    return (
      <p className="text-center text-xl font-bold text-[#533670] animate-blink">
        載入中...
      </p>
    );
  if (!data)
    return <p className="text-center text-xl text-gray-500">查無此內容</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <motion.div
      className="p-6"
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
        <div className="absolute inset-0 bg-overlay-gradient"></div>
        <h1 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-bold text-white [text-shadow:_0_2px_10px_#4612a1]">
          {data.title || data.name}
        </h1>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card-gradient text-white rounded-2xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
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
              <li key={actor.id} className="text-muted">
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
          <p className="mt-2 text-muted">{data.overview || '無簡介'}</p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mt-4 text-muted">
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
              <span>
                {data.release_date
                  ? `${data.release_date.split('-')[0]}年${
                      data.release_date.split('-')[1]
                    }月${data.release_date.split('-')[2]}日`
                  : '無資料'}
              </span>
            </p>
          )}
          {mediaType === 'tv' && (
            <>
              <p className="mb-2 text-muted">
                <strong className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
                  📅 首播日期：
                </strong>
                <span>
                  {data.first_air_date
                    ? `${data.first_air_date.split('-')[0]}年${
                        data.first_air_date.split('-')[1]
                      }月${data.first_air_date.split('-')[2]}日`
                    : '無資料'}
                </span>
              </p>
              <p className="mb-2 text-muted">
                <strong className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
                  📺 季數：
                </strong>{' '}
                {data.number_of_seasons} 季
              </p>
              <p className="mb-2 text-muted">
                <strong className="font-bold text-soft [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
                  📺 集數：
                </strong>{' '}
                {data.number_of_episodes} 集
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className={`bg-favorite-btn text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-favorite-btn-hover ${
            isFav ? 'bg-favorite-btn-active animate-pulse' : ''
          }`}
          onClick={handleFavoriteClick}
        >
          {isFav ? '♡ 從我的最愛移除' : '♥ 加入我的最愛'}
        </button>
        <button
          className="bg-back-btn text-light px-4 py-2 rounded-lg hover:bg-back-btn-hover"
          onClick={() => navigate(-1)}
        >
          <span>←</span> 返回
        </button>
      </div>
    </motion.div>
  );
};

export default DetailPage;
