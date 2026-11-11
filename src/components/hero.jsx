import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { scrollToSection } from '../lib/scrollToSection';

const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * Static CSS-gradient fallback for mobile and reduced-motion viewers,
 * replacing the interactive Spline background without downloading its runtime.
 */
function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    />
  );
}

/**
 * True once the page has loaded and the browser is idle. The 3D scene is
 * decorative, so it must never compete with first paint for bandwidth or
 * the main thread.
 */
function useIdleAfterLoad(enabled) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;
    let cancel = () => {};
    const fire = () => {
      if (!cancelled) setReady(true);
    };
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        const handle = window.requestIdleCallback(fire, { timeout: 2000 });
        cancel = () => window.cancelIdleCallback(handle);
      } else {
        const handle = setTimeout(fire, 300);
        cancel = () => clearTimeout(handle);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      cancel();
    };
  }, [enabled]);

  return ready;
}

/**
 * A modern, minimal hero section component.
 */
export default function Hero() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const sceneAllowed = !isMobile && !reduceMotion;
  const sceneReady = useIdleAfterLoad(sceneAllowed);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 1. Spline Background */}
      <div className="absolute inset-0 z-10 w-full h-full">
        {sceneAllowed && sceneReady ? (
          <Suspense fallback={<HeroBackdrop />}>
            <div className="w-full h-full animate-in fade-in duration-1000">
              <Spline
                scene="https://prod.spline.design/9xuF1oRA5poA131s/scene.splinecode"
                aria-label="Interactive 3D animation"
              />
            </div>
          </Suspense>
        ) : (
          <HeroBackdrop />
        )}
      </div>

      {/* 2. Overlay Content */}
      {/* Content is aligned to the center */}
      <div className="relative z-20 flex items-center justify-center w-full h-full p-8 text-center bg-[radial-gradient(ellipse_80%_60%_at_50%_54%,rgb(0_0_0_/_58%)_0%,rgb(0_0_0_/_40%)_35%,rgb(0_0_0_/_22%)_70%,rgb(0_0_0_/_14%)_100%)] pointer-events-none sm:p-16 md:p-24">
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="font-pixel text-5xl font-bold text-white md:text-7xl lg:text-8xl [text-shadow:_0_3px_5px_rgb(0_0_0_/_40%)]">
            Rubén Alapont
          </h1>

          <p className="mt-4 text-lg font-medium text-white md:text-xl lg:text-2xl [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
            CTO at Aimira · Valencia, Spain
          </p>

          <p className="mt-2 text-sm text-white md:text-base [text-shadow:_0_2px_4px_rgb(0_0_0_/_55%)]">
            I help product companies turn AI and engineering into measurable business results.
          </p>

          <p className="mt-3 text-sm text-white md:text-base [text-shadow:_0_2px_4px_rgb(0_0_0_/_55%)]">
            Also available for fractional CTO engagements and technical advisory.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="#fractional"
              onClick={e => {
                e.preventDefault();
                scrollToSection('fractional');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-black transition-colors duration-300 bg-white rounded-lg shadow-lg pointer-events-auto hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Fractional CTO
              <ArrowRight size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/rubenalapont"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white transition-colors duration-300 bg-transparent border border-white rounded-lg shadow-lg pointer-events-auto hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
