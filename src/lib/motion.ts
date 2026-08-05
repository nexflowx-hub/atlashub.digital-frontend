/**
 * Shared framer-motion utilities.
 * All animation variants and easing curves used across the site.
 */

/** A smooth deceleration cubic-bezier curve */
export const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

/** Standard fade-up animation variants */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

/** Container variant with stagger children */
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/** Faster fade-up for cards */
export const cardFadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};
