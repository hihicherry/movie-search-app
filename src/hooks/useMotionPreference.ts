import { useReducedMotion } from 'framer-motion';

export const CARD_HOVER_LIFT = {
  scale: 1.05,
  boxShadow: '0px 5px 5px #475569',
} as const;

export function useMotionPreference() {
  const reduceMotion = Boolean(useReducedMotion());

  return {
    reduceMotion,
    cardHover: reduceMotion ? undefined : CARD_HOVER_LIFT,
    cardTransition: { duration: reduceMotion ? 0 : 0.3 },
  };
}
