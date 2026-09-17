import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import PaginationBar from '../components/PaginationBar';
import AdvancedSearch from '../components/AdvancedSearch';
import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  searchMovies,
  searchTVShows,
  getPopularMovies,
  getPopularTVShows,
  discoverMovies,
  discoverTVShows,
  TMDB_MAX_PAGE,
} from '../services/tmdbApi';
import { tmdbKeys } from '../query/keys';
import { ERROR_MESSAGES } from '../utils/errors';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useMotionPreference } from '../hooks/useMotionPreference';
import { genreKey, parseGenreIds } from '../utils/genres';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { MediaType, Movie, PaginatedResponse, TVShow } from '../types/tmdb';

interface MediaSelectProps {
  mediaType: MediaType;
  onMediaTypeChange: (value: MediaType) => void;
}

function MediaSelect({ mediaType, onMediaTypeChange }: MediaSelectProps) {
  return (
    <div className="media-select">
      <Select.Root
        value={mediaType}
        onValueChange={onMediaTypeChange}
        aria-hidden={false}
      >
        <Select.Trigger className="flex items-center px-3 py-2.5 font-pixel bg-white text-purple theme-blue:text-blue border border-violet-300 theme-blue:border-sky-400 rounded-sm hover:bg-gray-100 focus:shadow-[0_0_0_2px_#000000] w-[110px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
          <span className="mr-2.5">
            {mediaType === 'movie' ? '電影' : '電視劇'}
          </span>
          <Select.Icon className="text-xl">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content className="w-[98px] bg-white rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] z-[1]">
          <Select.Item
            value="movie"
            className="font-pixel p-2 rounded cursor-pointer hover:bg-purple theme-blue:hover:bg-blue hover:text-white"
          >
            <Select.ItemText>電影</Select.ItemText>
          </Select.Item>
          <Select.Item
            value="tv"
            className="font-pixel p-2 rounded cursor-pointer hover:bg-purple theme-blue:hover:bg-blue hover:text-white"
          >
            <Select.ItemText>電視劇</Select.ItemText>
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  );
}

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);
const SEARCH_DEBOUNCE_MS = 400;

const mediaTypeFromSearchParams = (params: URLSearchParams): MediaType =>
  params.get('type') === 'tv' ? 'tv' : 'movie';

const pageFromSearchParams = (params: URLSearchParams): number => {
  const raw = Number(params.get('page'));
  if (!Number.isInteger(raw) || raw < 1) return 1;
  return Math.min(raw, TMDB_MAX_PAGE);
};

const listParamsFrom = (
  query: string,
  mediaType: MediaType,
  page = 1,
  genreIds: number[] = []
) => {
  const next = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) next.set('q', trimmed);
  if (mediaType === 'tv') next.set('type', 'tv');
  const genres = genreKey(genreIds);
  if (genres) next.set('genre', genres);
  if (page > 1) next.set('page', String(page));
  return next;
};

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedQuery = searchParams.get('q')?.trim() ?? '';
  const mediaType = mediaTypeFromSearchParams(searchParams);
  const page = pageFromSearchParams(searchParams);
  const genreParam = searchParams.get('genre');
  const selectedGenreIds = useMemo(
    () => parseGenreIds(genreParam, mediaType),
    [genreParam, mediaType]
  );
  const selectedGenreKey = genreKey(selectedGenreIds);
  const [searchQuery, setSearchQuery] = useState(submittedQuery);
  const [prevSubmittedQuery, setPrevSubmittedQuery] = useState(submittedQuery);
  const debouncedQuery = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE_MS);
  const { cardHover, cardTransition } = useMotionPreference();

  if (submittedQuery !== prevSubmittedQuery) {
    setPrevSubmittedQuery(submittedQuery);
    setSearchQuery(submittedQuery);
  }

  useEffect(() => {
    if (searchQuery.trim() !== debouncedQuery.trim()) return;
    const trimmed = debouncedQuery.trim();
    if (trimmed === submittedQuery) return;
    setSearchParams(listParamsFrom(trimmed, mediaType, 1, selectedGenreIds), {
      replace: true,
    });
  }, [
    debouncedQuery,
    mediaType,
    searchQuery,
    selectedGenreIds,
    setSearchParams,
    submittedQuery,
  ]);

  const isDiscover = selectedGenreIds.length > 0;
  const isSearch = !isDiscover && submittedQuery.length > 0;
  const listQuery = useQuery<PaginatedResponse<Movie | TVShow>>({
    queryKey: isDiscover
      ? tmdbKeys.discover(mediaType, selectedGenreKey, page)
      : isSearch
        ? tmdbKeys.search(mediaType, submittedQuery, page)
        : tmdbKeys.popular(mediaType, page),
    queryFn: () => {
      if (isDiscover) {
        return mediaType === 'movie'
          ? discoverMovies(selectedGenreIds, page)
          : discoverTVShows(selectedGenreIds, page);
      }
      if (isSearch) {
        return mediaType === 'movie'
          ? searchMovies(submittedQuery, page)
          : searchTVShows(submittedQuery, page);
      }
      return mediaType === 'movie'
        ? getPopularMovies(page)
        : getPopularTVShows(page);
    },
    placeholderData: keepPreviousData,
  });

  const items = listQuery.data?.results ?? [];
  const totalResults = listQuery.data?.total_results ?? 0;
  const totalPages = Math.min(listQuery.data?.total_pages ?? 1, TMDB_MAX_PAGE);
  const loading = listQuery.isPending;
  const error = listQuery.isError
    ? isSearch || isDiscover
      ? ERROR_MESSAGES.SEARCH_FAILED
      : ERROR_MESSAGES.FETCH_FAILED
    : null;

  useEffect(() => {
    if (!listQuery.data || listQuery.isPlaceholderData) return;
    if (page > totalPages && totalPages >= 1) {
      setSearchParams(
        listParamsFrom(submittedQuery, mediaType, totalPages, selectedGenreIds),
        {
          replace: true,
        }
      );
    }
  }, [
    listQuery.data,
    listQuery.isPlaceholderData,
    mediaType,
    page,
    selectedGenreIds,
    setSearchParams,
    submittedQuery,
    totalPages,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, submittedQuery, mediaType, selectedGenreKey]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams(
      listParamsFrom(searchQuery, mediaType, 1, selectedGenreIds),
      { replace: true }
    );
  };

  const handleMediaTypeChange = (value: MediaType) => {
    setSearchParams(listParamsFrom('', value));
  };

  const handleToggleGenre = (id: number) => {
    const nextIds = selectedGenreIds.includes(id)
      ? selectedGenreIds.filter(genreId => genreId !== id)
      : [...selectedGenreIds, id];
    setSearchParams(listParamsFrom(searchQuery, mediaType, 1, nextIds));
  };

  const handleClearGenres = () => {
    setSearchParams(listParamsFrom(searchQuery, mediaType));
  };

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), TMDB_MAX_PAGE);
    if (clamped === page) return;
    setSearchParams(
      listParamsFrom(submittedQuery, mediaType, clamped, selectedGenreIds)
    );
  };

  return (
    <div className="py-4 w-full box-border transition-colors duration-300">
      <form
        className="max-w-[600px] mx-auto mb-8 flex gap-4 px-4 flex-wrap sm:flex-row items-start"
        onSubmit={handleSearch}
      >
        <div className="flex flex-1 gap-2 items-center w-full sm:w-auto flex-wrap min-w-0">
          <input
            className="font-pixel flex-1 min-w-0 px-4 py-3 border-2 border-violet-300 theme-blue:border-sky-400 rounded-sm bg-white shadow-[0_3px_3px_-2px_#452d7acd] text-base focus:outline-none focus:ring-2 focus:ring-[#7776B3] theme-blue:focus:ring-[#60A5FA] sm:h-[45px]"
            type="text"
            placeholder="請輸入欲查詢的電影或電視劇名稱"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="搜尋電影或電視劇"
          />
          <AdvancedSearch
            mediaType={mediaType}
            selectedGenreIds={selectedGenreIds}
            onToggleGenre={handleToggleGenre}
            onClear={handleClearGenres}
          />
        </div>
        <div className="flex gap-2 sm:gap-4 justify-start w-full sm:w-auto">
          <MediaSelect
            mediaType={mediaType}
            onMediaTypeChange={handleMediaTypeChange}
          />
          <button
            className="font-pixel px-3 bg-violet-200 theme-blue:bg-sky-200 text-purple theme-blue:text-blue border-2 border-t-white border-l-white border-r-violet-400 border-b-violet-400 theme-blue:border-r-sky-400 theme-blue:border-b-sky-400 rounded-sm transition-all duration-300 hover:bg-violet-300 theme-blue:hover:bg-sky-300 hover:animate-flicker flex-shrink-0 sm:h-[45px]"
            type="submit"
            aria-label="執行搜尋"
          >
            查詢
          </button>
        </div>
      </form>
      {isDiscover && (
        <p className="font-pixel text-center text-sm text-gray-500 theme-blue:text-gray-300 px-4 -mt-6 mb-6">
          目前顯示該類型的熱門作品，標題搜尋未套用
        </p>
      )}
      {error && (
        <div className="text-center text-red-500 theme-blue:text-red-400">
          {error}
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto p-4">
          {SKELETON_KEYS.map(key => (
            <SkeletonCard key={key} />
          ))}
        </div>
      ) : (
        <>
          {items.length > 0 && (
            <p className="font-pixel text-center text-sm text-gray-500 theme-blue:text-gray-300 px-4 mb-2">
              第 {page} / {totalPages} 頁
              {totalResults > 0 ? ` · 共 ${totalResults} 筆` : ''}
            </p>
          )}
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto p-4"
            aria-busy={listQuery.isFetching}
          >
            {items.length > 0 ? (
              items.map(item => (
                <motion.div
                  key={`${mediaType}-${item.id}`}
                  whileHover={cardHover}
                  transition={cardTransition}
                >
                  <MovieCard item={item} mediaType={mediaType} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full font-pixel text-center text-gray-500 theme-blue:text-gray-300">
                沒有搜尋結果
              </div>
            )}
          </div>
          <PaginationBar
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
            disabled={listQuery.isFetching}
          />
        </>
      )}
    </div>
  );
}

export default Home;
