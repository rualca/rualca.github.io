import { useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useIsMobile } from '../hooks/useIsMobile';
import { initAnalytics, trackLinkClicks, trackSectionViews } from '../lib/analytics';

/**
 * The page's global, non-visual behaviour: analytics wiring and Lenis smooth
 * scrolling. It renders nothing, so it is its own island and can hydrate after
 * the visible islands instead of delaying them.
 *
 * Lenis is skipped entirely on phones and under prefers-reduced-motion: native
 * scrolling is the better experience on a touch device, and motion the user
 * asked not to see is not worth the libraries. The dynamic imports keep GSAP
 * and Lenis out of the bundle until they are actually needed.
 */
export default function SmoothScroll() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stopInit = initAnalytics();
    const stopLinks = trackLinkClicks();
    const stopViews = trackSectionViews(['experience']);
    return () => {
      stopInit();
      stopLinks();
      stopViews();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || isMobile) {
      return undefined;
    }

    let cancelled = false;
    let teardown;

    Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.2,
        lerp: 0.05,
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const lenisTick = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(lenisTick);

      gsap.ticker.lagSmoothing(0);

      teardown = () => {
        lenis.destroy();
        // This component owns no ScrollTriggers — they belong to ScrollReveal.
        // Refresh recomputes positions against the native scroller instead of
        // killing triggers it does not own.
        ScrollTrigger.refresh();
        gsap.ticker.remove(lenisTick);
      };
    });

    return () => {
      cancelled = true;
      if (teardown) teardown();
    };
  }, [reduceMotion, isMobile]);

  return null;
}
