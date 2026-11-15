import { describe, it, expect, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * Teardown contract: unmounting one ScrollReveal must destroy only the triggers
 * it created. Anything else would let a single island take down the scroll
 * animations owned by every other island on the page.
 */
describe('ScrollReveal teardown', () => {
  afterEach(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    document.body.innerHTML = '';
  });

  it('kills only its own triggers and leaves foreign ones alive', () => {
    const foreign = document.createElement('div');
    document.body.appendChild(foreign);

    const foreignTween = gsap.to(foreign, {
      x: 10,
      scrollTrigger: { trigger: foreign, start: 'top bottom', end: 'bottom top' },
    });
    const foreignTrigger = foreignTween.scrollTrigger;
    expect(foreignTrigger).toBeTruthy();

    const { unmount } = render(<ScrollReveal>uno dos tres</ScrollReveal>);
    expect(ScrollTrigger.getAll().length).toBeGreaterThan(1);

    unmount();

    expect(ScrollTrigger.getAll()).toContain(foreignTrigger);
  });
});
