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
    <div className="p-8 w-full box-border bg-white dark:bg-dark-bg transition-colors duration-300">
      <h2 className="mb-4 text-center text-4xl text-navbar-start dark:text-dark-navbar-start">
        我的最愛
      </h2>
      <div className="flex justify-center gap-4 mb-8">
        {filterButtons.map(btn => (
          <button
            key={btn.value}
            className={`px-4 py-2 rounded-lg text-white transition-all duration-300 ${
              filter === btn.value
                ? 'bg-button-gradient dark:bg-dark-button-gradient scale-105'
                : 'bg-gray-400 dark:bg-gray-600 hover:bg-filter-btn-hover dark:hover:bg-dark-filter-btn-hover hover:scale-105'
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
            initial={{ opacity: 0, borderRadius: '8px' }}
            animate={{ opacity: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 5px 15px #4612a1',
              borderRadius: '10px',
              backgroundColor: '#7776B3',
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
    <div className="text-center p-16 bg-[#ffffff0d] dark:bg-[#1e1a3c33] rounded-xl mx-auto my-8 max-w-[600px]">
      <h2 className="mb-4 text-3xl text-navbar-start dark:text-dark-navbar-start">
        {filter === 'all'
          ? '尚未新增任何作品至我的最愛'
          : `尚未新增任何${filter === 'movie' ? '電影' : '電視'}至我的最愛`}
      </h2>
      <p className="text-gray-500 dark:text-gray-300 text-lg leading-6">
        開始加入你喜愛的{filter === 'movie' ? '電影' : '電視'}吧！
      </p>
    </div>
  );

  return filteredFavorites.length > 0 ? renderFavorites() : renderEmpty();
}

export default Favorites;
