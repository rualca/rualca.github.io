import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'motion/react';
import Hero from './components/hero';
import Navbar from './components/Navbar';
import Experience from './components/Experience';
import Fractional from './components/Fractional';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectsMobile from './components/ProjectsMobile';
import Certifications from './components/Certifications';
import Education from './components/Education';
import SocialMagnet from './components/SocialMagnet';
import Publications from './components/Publications';
import Readings from './components/Readings';
import ContactForm from './components/ContactForm';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useIsMobile } from './hooks/useIsMobile';

import './App.css'

function App() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || isMobile) {
      return undefined;
    }

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
    return () => {
      lenis.destroy();
      // App owns no ScrollTriggers — they belong to ScrollReveal. Refresh
      // recomputes positions against the native scroller instead of
      // killing triggers this component does not own.
      ScrollTrigger.refresh();
      gsap.ticker.remove(lenisTick);
    };
  }, [reduceMotion, isMobile]);

  return (
    <MotionConfig reducedMotion="user">
      {!isMobile && <SmoothCursor />}
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Fractional />
        <About />
        <Skills />
        <Education />
        {isMobile ? <ProjectsMobile /> : <Projects />}
        <Publications />
        <Readings />
        {/* <Certifications /> */}
        <ContactForm />
        <SocialMagnet />
      </main>
    </MotionConfig>
  )
}

export default App

