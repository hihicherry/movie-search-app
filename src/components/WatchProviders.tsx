import { WatchProvider, WatchProviderRegion } from '../types/tmdb';
import { ERROR_MESSAGES } from '../utils/errors';
import { logoUrl } from '../utils/tmdbImage';

const bone = 'bg-[#d5d2d2] theme-blue:bg-[#c5d4e8]';

interface WatchProvidersProps {
  isLoading: boolean;
  isError: boolean;
  region?: WatchProviderRegion | null;
}

const CATEGORIES: {
  key: 'flatrate' | 'rent' | 'buy' | 'free';
  label: string;
}[] = [
  { key: 'flatrate', label: '訂閱' },
  { key: 'rent', label: '租借' },
  { key: 'buy', label: '購買' },
  { key: 'free', label: '免費' },
];

function sortProviders(providers: WatchProvider[]): WatchProvider[] {
  return [...providers].sort((a, b) => a.display_priority - b.display_priority);
}

function uniqueProviders(providers: WatchProvider[]): WatchProvider[] {
  const seen = new Set<number>();
  return providers.filter(provider => {
    if (seen.has(provider.provider_id)) return false;
    seen.add(provider.provider_id);
    return true;
  });
}

function providersForCategory(
  region: WatchProviderRegion,
  key: (typeof CATEGORIES)[number]['key']
): WatchProvider[] {
  if (key === 'free') {
    return uniqueProviders(
      sortProviders([...(region.free ?? []), ...(region.ads ?? [])])
    );
  }
  return sortProviders(region[key] ?? []);
}

function hasAnyProvider(region: WatchProviderRegion): boolean {
  return CATEGORIES.some(
    category => providersForCategory(region, category.key).length > 0
  );
}

function WatchProviders({ isLoading, isError, region }: WatchProvidersProps) {
  return (
    <section
      className="mt-6 font-pixel bg-theme-purple-card-gradient theme-blue:bg-theme-blue-card-gradient rounded-2xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-colors duration-300"
      style={{ backdropFilter: 'blur(10px)' }}
      aria-busy={isLoading}
    >
      <h2 className="text-purple theme-blue:text-blue text-xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.100)]">
        在哪裡看
      </h2>

      {isLoading && (
        <div className="mt-4 animate-pulse space-y-3" aria-live="polite">
          <span className="sr-only">觀看平台載入中</span>
          <div className={`h-4 w-16 ${bone}`} />
          <div className="flex flex-wrap gap-3">
            <div className={`h-10 w-28 ${bone}`} />
            <div className={`h-10 w-28 ${bone}`} />
            <div className={`h-10 w-24 ${bone}`} />
          </div>
        </div>
      )}

      {!isLoading && isError && (
        <p className="mt-3 text-sm text-red-500">
          {ERROR_MESSAGES.PROVIDERS_FAILED}
        </p>
      )}

      {!isLoading && !isError && (!region || !hasAnyProvider(region)) && (
        <p className="mt-3 text-sm text-gray-700">台灣目前沒有可觀看平台資料</p>
      )}

      {!isLoading && !isError && region && hasAnyProvider(region) && (
        <div className="mt-4 space-y-4">
          {CATEGORIES.map(category => {
            const providers = providersForCategory(region, category.key);
            if (providers.length === 0) return null;

            return (
              <div key={category.key}>
                <h3 className="text-sm text-purple theme-blue:text-blue font-bold">
                  {category.label}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-3">
                  {providers.map(provider => (
                    <li key={`${category.key}-${provider.provider_id}`}>
                      <a
                        href={region.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-sm border-2 border-t-white border-l-white border-r-violet-300 border-b-violet-300 theme-blue:border-r-sky-300 theme-blue:border-b-sky-300 bg-white/50 px-2 py-1.5 text-gray-800 hover:bg-violet-100 theme-blue:hover:bg-sky-100"
                      >
                        {provider.logo_path ? (
                          <img
                            src={logoUrl(provider.logo_path, 'w45')}
                            srcSet={`${logoUrl(provider.logo_path, 'w45')} 1x, ${logoUrl(provider.logo_path, 'w92')} 2x`}
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded object-contain bg-white"
                            loading="lazy"
                          />
                        ) : null}
                        <span className="text-xs">
                          {provider.provider_name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-[11px] text-gray-600">
        資料來源：
        <a
          href="https://www.justwatch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-purple theme-blue:hover:text-blue"
        >
          JustWatch
        </a>
      </p>
    </section>
  );
}

export default WatchProviders;
