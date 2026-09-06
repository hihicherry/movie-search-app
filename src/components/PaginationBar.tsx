type PageItem = number | 'ellipsis';

const visiblePages = (current: number, total: number): PageItem[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total]);
  for (let page = current - 1; page <= current + 1; page += 1) {
    if (page >= 1 && page <= total) pages.add(page);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: PageItem[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      items.push('ellipsis');
    }
    items.push(page);
  });
  return items;
};

const pageButtonClass = (active: boolean) =>
  `min-w-9 px-2 py-1 font-pixel text-sm rounded-sm border-2 transition-all duration-300 disabled:opacity-40 ${
    active
      ? 'bg-violet-200 theme-blue:bg-sky-200 text-purple theme-blue:text-blue border-t-white border-l-white border-r-violet-400 border-b-violet-400 theme-blue:border-r-sky-400 theme-blue:border-b-sky-400'
      : 'bg-white text-purple theme-blue:text-blue border-violet-300 theme-blue:border-sky-400 hover:bg-violet-100 theme-blue:hover:bg-sky-100'
  }`;

interface PaginationBarProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function PaginationBar({
  page,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex flex-wrap justify-center items-center gap-2 px-4 pb-8"
      aria-label="分頁"
    >
      <button
        type="button"
        className={pageButtonClass(false)}
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 1}
        aria-label="上一頁"
      >
        上一頁
      </button>
      {visiblePages(page, totalPages).map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="font-pixel text-sm text-gray-400 px-1"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={pageButtonClass(item === page)}
            onClick={() => onPageChange(item)}
            disabled={disabled || item === page}
            aria-label={`第 ${item} 頁`}
            aria-current={item === page ? 'page' : undefined}
          >
            {item}
          </button>
        )
      )}
      <button
        type="button"
        className={pageButtonClass(false)}
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= totalPages}
        aria-label="下一頁"
      >
        下一頁
      </button>
    </nav>
  );
}

export default PaginationBar;
