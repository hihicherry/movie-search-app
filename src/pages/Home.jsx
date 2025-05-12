import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import { useState, useEffect } from 'react';
import {
  searchMovies,
  searchTVShows,
  getPopularMovies,
  getPopularTVShows,
} from '../services/tmdbApi';
import { ERROR_MESSAGES } from '../utils/errors';
import * as Select from '@radix-ui/react-select'; //下拉選單ui套件
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion'; //hover動畫套件

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]); // 儲存搜尋或熱門結果
  const [visibleMovies, setVisibleMovies] = useState([]); //控制載入動畫
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mediaType, setMediaType] = useState('movie'); // 默認為電影

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const fetchedItems =
          mediaType === 'movie'
            ? await getPopularMovies()
            : await getPopularTVShows();
        setItems(fetchedItems || []);
        setVisibleMovies([]);
        fetchedItems.forEach((item, index) => {
          setTimeout(() => {
            setVisibleMovies(prev => [...prev, item.id]);
          }, index * 150);
        });
      } catch (err) {
        console.log(err);
        setError(ERROR_MESSAGES.FETCH_FAILED);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, [mediaType]);

  const handleSearch = async e => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return; //搜尋框未輸入資料則不進行搜尋,若正在載入中則不能進行搜尋

    setLoading(true);
    try {
      const searchResults =
        mediaType === 'movie'
          ? await searchMovies(searchQuery)
          : await searchTVShows(searchQuery);
      setItems(Array.isArray(searchResults) ? searchResults : []);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(ERROR_MESSAGES.SEARCH_FAILED);
    } finally {
      setLoading(false);
    }

    setSearchQuery(''); //清空搜尋框
  };

  //媒體類型選擇 套用radix ui
  const MediaSelect = () => {
    return (
      <div className="media-select">
        <Select.Root
          value={mediaType || 'movie'}
          onValueChange={setMediaType}
          aria-hidden={false}
        >
          <Select.Trigger className="flex items-center px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-light text-button-start border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-70 focus:shadow-[0_0_0_2px_#000000] w-[98px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <span className="mr-2.5">
              {mediaType === 'movie' ? '電影' : '電視劇'}
            </span>
            <Select.Icon className="text-xl">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content className="w-[98px] bg-white dark:bg-gray-800 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] z-[1]">
            <Select.Item
              value="movie"
              className="p-2 rounded cursor-pointer hover:bg-button-start hover:text-white dark:hover:bg-gray-700 dark:hover:text-light"
            >
              <Select.ItemText>電影</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="tv"
              className="p-2 rounded cursor-pointer hover:bg-button-start hover:text-white dark:hover:bg-gray-700 dark:hover:text-light"
            >
              <Select.ItemText>電視劇</Select.ItemText>
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    );
  };

  return (
    <div className="py-4 w-full box-border bg-white dark:bg-dark-bg transition-colors duration-300">
      <form
        className="max-w-[600px] mx-auto mb-8 flex gap-4 px-4 flex-wrap sm:flex-row items-center"
        onSubmit={handleSearch}
      >
        <input
          className="flex-1 px-4 py-3 border-none rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-light shadow-[0_3px_3px_-2px_#452d7acd] text-base focus:outline-none focus:ring-2 focus:ring-[#7776B3] sm:h-[45px]"
          type="text"
          placeholder="請輸入欲查詢的電影或電視劇名稱"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          aria-label="搜尋電影或電視劇"
        />
        <div className="flex gap-2 sm:gap-4 justify-start w-full sm:w-auto">
          <MediaSelect />
          <button
            className="px-6 py-2.5 bg-button-gradient dark:bg-dark-button-gradient text-white rounded transition-all duration-300 hover:bg-search-btn-hover dark:hover:bg-dark-search-btn-hover shadow-[0_3px_3px_-2px_#444444] flex-shrink-0 sm:h-[45px]"
            type="submit"
            aria-label="執行搜尋"
          >
            查詢
          </button>
        </div>
      </form>
      {error && (
        <div className="text-center text-red-500 dark:text-red-400">
          {error}
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {Array.isArray(items) && items.length > 0 ? (
            items.map(item => (
              <motion.div
                key={item.id}
                initial={{ borderRadius: '8px' }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 5px 15px #4612a1',
                  borderRadius: '10px',
                  backgroundColor: '#7776B3',
                }}
                transition={{ duration: 0.3 }}
              >
                <MovieCard item={item} mediaType={mediaType} />
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-300">
              沒有搜尋結果
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
