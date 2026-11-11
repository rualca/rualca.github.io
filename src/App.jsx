import { lazy, Suspense, useEffect, useState } from 'react';
import Hero from './components/hero';
import Navbar from './components/Navbar';
import Experience from './components/Experience';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useIsMobile } from './hooks/useIsMobile';
import { initAnalytics, trackLinkClicks, trackSectionViews } from './lib/analytics';

import './App.css'

const BelowFold = lazy(() => import('./BelowFold'));

// On phones the rest of the page waits for the first interaction (or this
// long), so it never competes with first paint on slow CPUs. Desktop loads it
// straight away.
const MOBILE_FALLBACK_MS = 8000;
const INTERACTION_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'scroll'];

function App() {
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

  const [interacted, setInteracted] = useState(false);
  const showBelowFold = !isMobile || interacted;

  useEffect(() => {
    if (!isMobile || interacted) return undefined;

    const wake = () => setInteracted(true);
    INTERACTION_EVENTS.forEach((name) =>
      window.addEventListener(name, wake, { once: true, passive: true }),
    );
    const timer = setTimeout(wake, MOBILE_FALLBACK_MS);

    return () => {
      INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, wake));
      clearTimeout(timer);
    };
  }, [isMobile, interacted]);

  useEffect(() => {
    if (reduceMotion || isMobile) {
      return undefined;
    }

    let cancelled = false;
    let teardown;

    // Lenis, GSAP and ScrollTrigger are only needed for smooth scrolling on
    // desktop, so they are fetched after the first render instead of shipping
    // in the entry bundle.
    Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;

      // 1. Initialize Lenis with custom settings for scroll speed
      const lenis = new Lenis({
        duration: 1.2, // Affects the animation duration
        lerp: 0.05, // Lower values (e.g., 0.05) are smoother and "floatier". Higher values (e.g., 0.2) are more responsive.
        smoothWheel: true,
      });

      // 2. Connect Lenis to GSAP's ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // 3. Use GSAP's ticker to drive Lenis's animation loop
      const lenisTick = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(lenisTick);

      gsap.ticker.lagSmoothing(0);

      // 4. Cleanup on component unmount
      teardown = () => {
        lenis.destroy();
        // App owns no ScrollTriggers — they belong to ScrollReveal. Refresh
        // recomputes positions against the native scroller instead of
        // killing triggers this component does not own.
        ScrollTrigger.refresh();
        gsap.ticker.remove(lenisTick);
      };
    });

    return () => {
      cancelled = true;
      if (teardown) teardown();
    };
  }, [reduceMotion, isMobile]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        {showBelowFold ? (
          <Suspense fallback={<div aria-hidden="true" className="min-h-screen" />}>
            <BelowFold isMobile={isMobile} />
          </Suspense>
        ) : (
          <div aria-hidden="true" className="min-h-screen" />
        )}
      </main>
    </>
  )
}

export default App
