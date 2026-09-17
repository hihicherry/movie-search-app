import { MediaType } from '../types/tmdb';

const GENRE_NAMES_ZH_TW: Record<number, string> = {
  28: '動作',
  12: '冒險',
  16: '動畫',
  35: '喜劇',
  80: '犯罪',
  99: '紀錄',
  18: '劇情',
  10751: '家庭',
  14: '奇幻',
  36: '歷史',
  27: '恐怖',
  10402: '音樂',
  9648: '懸疑',
  10749: '愛情',
  878: '科幻',
  10770: '電視電影',
  53: '驚悚',
  10752: '戰爭',
  37: '西部',
  10759: '動作冒險',
  10762: '兒童',
  10763: '新聞',
  10764: '實境秀',
  10765: '科幻奇幻',
  10766: '肥皂劇',
  10767: '談話',
  10768: '戰爭與政治',
};

export const MOVIE_GENRE_IDS = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
  53, 10752, 37,
] as const;

export const TV_GENRE_IDS = [
  10759, 16, 35, 80, 99, 18, 10751, 10762, 9648, 10763, 10764, 10765, 10766,
  10767, 10768, 37,
] as const;

export function genreIdsFor(mediaType: MediaType): readonly number[] {
  return mediaType === 'movie' ? MOVIE_GENRE_IDS : TV_GENRE_IDS;
}

export function genreDisplayNameById(id: number): string | undefined {
  return GENRE_NAMES_ZH_TW[id];
}

export function genreDisplayName(genre: { id: number; name: string }): string {
  return genreDisplayNameById(genre.id) ?? genre.name;
}

export function genreKey(ids: number[]): string {
  return [...ids].sort((a, b) => a - b).join(',');
}

export function parseGenreIds(
  raw: string | null,
  mediaType: MediaType
): number[] {
  if (!raw) return [];
  const allowed = new Set(genreIdsFor(mediaType));
  const seen = new Set<number>();
  const ids: number[] = [];
  for (const part of raw.split(',')) {
    const id = Number(part);
    if (!Number.isInteger(id) || !allowed.has(id) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}
