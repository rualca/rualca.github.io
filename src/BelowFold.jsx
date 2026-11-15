import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';import CaseStudies from './components/CaseStudies';
import Fractional from './components/Fractional';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectsMobile from './components/ProjectsMobile';
import Education from './components/Education';
import Publications from './components/Publications';
import Readings from './components/Readings';
import ContactForm from './components/ContactForm';
import SocialMagnet from './components/SocialMagnet';
import { useIsMobile } from './hooks/useIsMobile';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { trackSectionViews } from './lib/analytics';

/**
 * Everything below the first screen. It is its own island, so Astro can hold
 * its hydration until the section is actually scrolled into view.
 */
export default function BelowFold() {
  const isMobile = useIsMobile();
  useEffect(() => {
    // The anchor target did not exist when the browser first tried to honour
    // a deep link such as /#projects, so scroll to it once it does.
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  useEffect(
    () =>
      trackSectionViews([
        'case-studies',
        'fractional',
        'about',
        'skills',
        'education',
        'projects',
        'publications',
        'readings',
        'contact',
      ]),
    [],
  );

  return (
    <MotionConfig reducedMotion="user">
      {!isMobile && <SmoothCursor />}
      <CaseStudies />
      <Fractional />
      <About />
      <Skills />
      <Education />
      {isMobile ? <ProjectsMobile /> : <Projects />}
      <Publications />
      <Readings />
      <ContactForm />
      <SocialMagnet />
    </MotionConfig>
  );
}
