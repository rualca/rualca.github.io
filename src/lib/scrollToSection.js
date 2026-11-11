/**
 * Smooth-scrolls to a section by id. Sections below the first screen are
 * lazy-loaded, so the target may not exist yet: keep looking for it for a
 * few seconds instead of silently doing nothing.
 */
export function scrollToSection(id, { timeout = 4000 } = {}) {
  const start = performance.now();

  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      return;
    }
    if (performance.now() - start < timeout) requestAnimationFrame(attempt);
  };

  attempt();
}
