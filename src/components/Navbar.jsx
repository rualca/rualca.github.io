import React from 'react';
import logo from '../assets/logo3.png'; // Make sure this path is correct
import { scrollToSection } from '../lib/scrollToSection';

function handleNavClick(e, id) {
  e.preventDefault();
  scrollToSection(id);
}

/**
 * A minimal, transparent navigation bar.
 * It uses Flexbox to space out the logo and navigation links.
 * The `z-30` class ensures it sits on top of other content.
 */
export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6">
      <nav aria-label="Main" className="container flex items-center justify-between gap-4 mx-auto">
        {/* Logo */}
        <a href="#">
          <img
            src={logo}
            alt="Rubén Alapont — Head of Engineering & CTO"
            className="w-28 h-6"
            width={112}
            height={24}
          />

        </a>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-medium text-white/90 sm:gap-x-6">
          <a
            href="#experience"
            onClick={e => handleNavClick(e, 'experience')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Experience
          </a>
          <a
            href="#case-studies"
            onClick={e => handleNavClick(e, 'case-studies')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Case studies
          </a>
          <a
            href="#fractional"
            onClick={e => handleNavClick(e, 'fractional')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Fractional CTO
          </a>
          <a
            href="#about"
            onClick={e => handleNavClick(e, 'about')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={e => handleNavClick(e, 'skills')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Skills
          </a>
          <a
            href="#education"
            onClick={e => handleNavClick(e, 'education')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Education
          </a>
          <a
            href="#projects"
            onClick={e => handleNavClick(e, 'projects')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Projects
          </a>
          <a
            href="#publications"
            onClick={e => handleNavClick(e, 'publications')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Publications
          </a>
          <a
            href="#readings"
            onClick={e => handleNavClick(e, 'readings')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Readings
          </a>
          <a
            href="#contact"
            onClick={e => handleNavClick(e, 'contact')}
            className="rounded-sm transition hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}