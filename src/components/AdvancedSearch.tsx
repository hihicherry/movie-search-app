import { useState } from 'react';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { MediaType } from '../types/tmdb';
import { genreDisplayNameById, genreIdsFor } from '../utils/genres';

interface AdvancedSearchProps {
  mediaType: MediaType;
  selectedGenreIds: number[];
  onToggleGenre: (id: number) => void;
  onClear: () => void;
}

function AdvancedSearch({
  mediaType,
  selectedGenreIds,
  onToggleGenre,
  onClear,
}: AdvancedSearchProps) {
  const [open, setOpen] = useState(false);
  const selected = new Set(selectedGenreIds);
  const hasFilter = selectedGenreIds.length > 0;

  const handleClear = () => {
    onClear();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="進階搜尋"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className={`flex h-[45px] w-[45px] flex-shrink-0 items-center justify-center rounded-sm border-2 border-t-white border-l-white transition-all duration-300 ${
          hasFilter
            ? 'bg-violet-300 theme-blue:bg-sky-300 text-purple theme-blue:text-blue border-r-violet-500 border-b-violet-500 theme-blue:border-r-sky-500 theme-blue:border-b-sky-500'
            : 'bg-violet-200 theme-blue:bg-sky-200 text-purple theme-blue:text-blue border-r-violet-400 border-b-violet-400 theme-blue:border-r-sky-400 theme-blue:border-b-sky-400 hover:bg-violet-300 theme-blue:hover:bg-sky-300'
        }`}
      >
        <MixerHorizontalIcon />
      </button>
      {open && (
        <div className="basis-full w-full rounded-sm border-2 border-violet-300 theme-blue:border-sky-400 bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="font-pixel text-sm text-purple theme-blue:text-blue">
              依類型篩選
            </p>
            <button
              type="button"
              onClick={handleClear}
              disabled={!hasFilter}
              className="font-pixel text-xs text-gray-600 underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-40"
            >
              清除篩選
            </button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {genreIdsFor(mediaType).map(id => {
              const active = selected.has(id);
              const label = genreDisplayNameById(id) ?? String(id);
              return (
                <li key={id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggleGenre(id)}
                    className={`font-pixel rounded-sm border px-2 py-1 text-xs transition-colors ${
                      active
                        ? 'border-violet-500 theme-blue:border-sky-500 bg-violet-200 theme-blue:bg-sky-200 text-purple theme-blue:text-blue'
                        : 'border-violet-200 theme-blue:border-sky-200 bg-gray-50 text-gray-700 hover:bg-violet-100 theme-blue:hover:bg-sky-100'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default AdvancedSearch;
