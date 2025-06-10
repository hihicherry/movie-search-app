import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Movie, TVShow, MediaType } from '../types/tmdb';

function Favorites() {
  const { favorites } = useMovieContext();
  const [filter, setFilter] = useState<MediaType | 'all'>('all');

  const filteredFavorites = favorites.filter(item => {
    if (filter === 'all') return true;
    return item.mediaType === filter;
  });

  const filterButtons: { label: string; value: MediaType | 'all' }[] = [
    { label: '全部', value: 'all' },
    { label: '電影', value: 'movie' },
    { label: '電視劇', value: 'tv' },
  ];

  const renderFavorites = () => (
    <div className="p-8 w-full box-border transition-colors duration-300">
      <h2 className="mb-4 font-pixel text-center text-4xl text-purple theme-blue:text-blue">
        我的最愛
      </h2>
      <div className="flex justify-center gap-3 mb-8">
        {filterButtons.map(btn => (
          <button
            key={btn.value}
            className={`px-3 py-1 font-pixel text-sm rounded-sm transition-all duration-300 ${
              filter === btn.value
                ? 'text-purple theme-blue:text-blue bg-violet-200 theme-blue:bg-sky-200 border-2 border-t-white border-l-white border-r-violet-400 border-b-violet-400 theme-blue:border-r-sky-400 theme-blue:border-b-sky-400'
                : 'text-gray-700 bg-gray-300 border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 hover:scale-105 hover:text-purple dark:hover:text-blue hover:border-t-white hover:border-l-white hover:border-violet-300 dark:hover:border-sky-400 hover:bg-violet-300 theme-blue:hover:bg-sky-300 hover:border-r-violet-400 hover:border-b-violet-400 theme-blue:hover:border-r-sky-400 theme-blue:hover:border-b-sky-400 hover:animate-flicker'
            }`}
            onClick={() => setFilter(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFavorites.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 5px 5px #475569',
            }}
            transition={{ duration: 0.3 }}
          >
            <MovieCard item={item} mediaType={item.mediaType as MediaType} />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div className="p-8 w-full box-border transition-colors duration-300">
      <h2 className="mb-4 font-pixel text-center text-4xl text-purple theme-blue:text-blue">
        我的最愛
      </h2>
      <div className="flex justify-center gap-3 mb-8">
        {filterButtons.map(btn => (
          <button
            key={btn.value}
            className={`px-3 py-1 font-pixel text-sm rounded-sm transition-all duration-300 ${
              filter === btn.value
                ? 'text-purple theme-blue:text-blue bg-violet-200 theme-blue:bg-sky-200 border-2 border-t-white border-l-white border-r-violet-400 border-b-violet-400 theme-blue:border-r-sky-400 theme-blue:border-b-sky-400'
                : 'text-gray-700 bg-gray-300 border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 hover:scale-105 hover:text-purple dark:hover:text-blue hover:border-t-white hover:border-l-white hover:border-violet-300 dark:hover:border-sky-400 hover:bg-violet-300 theme-blue:hover:bg-sky-300 hover:border-r-violet-400 hover:border-b-violet-400 theme-blue:hover:border-r-sky-400 theme-blue:hover:border-b-sky-400 hover:animate-flicker'
            }`}
            onClick={() => setFilter(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="text-center rounded-xl mx-auto my-8 max-w-[600px]">
        <h2 className="mb-4 text-3xl text-navbar-start dark:text-dark-navbar-start">
          {filter === 'all'
            ? '尚未新增任何作品至我的最愛'
            : `尚未新增任何${filter === 'movie' ? '電影' : '電視劇'}至我的最愛`}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-lg leading-6">
          {filter === 'all'
            ? '開始加入你喜愛的作品吧！'
            : `開始加入你喜愛的${filter === 'movie' ? '電影' : '電視劇'}吧！`}
        </p>
      </div>
    </div>
  );

  return filteredFavorites.length > 0 ? renderFavorites() : renderEmpty();
}

export default Favorites;
