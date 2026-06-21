import { useEffect, useState } from 'react';

/**
 * Animated count-up hook.
 * @param {number} target - Target number to count to
 * @param {number} [duration=1000] - Animation duration in ms
 * @param {boolean} [start=true] - Whether to start the animation
 * @returns {number} - Current animated value
 */
const useCountUp = (target, duration = 1000, start = true) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !start) {
      setValue(target);
      return;
    }

    if (target === 0) {
      setValue(0);
      return;
    }

    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
};

export default useCountUp;
