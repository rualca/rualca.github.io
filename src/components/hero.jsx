import React, { lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
 * A modern, minimal hero section component.
 */
export default function Hero() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 1. Spline Background */}
      <div className="absolute inset-0 z-10 w-full h-full">
        {isMobile || reduceMotion ? (
          <HeroBackdrop />
        ) : (
          <Suspense fallback={<HeroBackdrop />}>
            <Spline
              scene="https://prod.spline.design/9xuF1oRA5poA131s/scene.splinecode"
              aria-label="Interactive 3D animation"
            />
          </Suspense>
        )}
      </div>

      {/* 2. Overlay Content */}
      {/* Content is aligned to the center */}
      <div className="relative z-20 flex items-center justify-center w-full h-full p-8 text-center bg-black/20 pointer-events-none sm:p-16 md:p-24">
        <div className="max-w-md pointer-events-auto">
          <h1 className="font-pixel text-5xl font-bold text-white md:text-7xl lg:text-8xl [text-shadow:_0_3px_5px_rgb(0_0_0_/_40%)]">
            Rubén Alapont
          </h1>

          <p className="mt-4 text-lg text-white/90 md:text-xl lg:text-2xl [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
            Head of Engineering &amp; CTO · Valencia, Spain
          </p>

          <p className="mt-2 text-sm text-white/80 md:text-base [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
            I scale engineering organisations and the architectures they ship.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="#projects"
              onClick={e => {
                e.preventDefault();
                setTimeout(() => {
                  const el = document.getElementById('projects');
                  if (el) {
                    el.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }
                }, 100);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-black transition-all duration-300 bg-white rounded-lg shadow-lg pointer-events-auto hover:bg-gray-200 hover:scale-105"
            >
              View My Work
              <ArrowRight size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/rubenalapont"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white transition-all duration-300 bg-transparent border border-white rounded-lg shadow-lg pointer-events-auto hover:bg-white hover:text-black hover:scale-105"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
