import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Highlighter } from "@/components/ui/highlighter";

export default function About({ scrollContainerRef }) {
  return (
    <section id="about" className="w-full min-h-screen bg-white text-black p-8 sm:p-16 md:p-24 flex items-center justify-center">
      <div className="max-w-3xl text-left">
        <div className="mb-10 flex justify-start">
                    <h2 className="text-5xl font-bold font-pixel underline-wavy-yellow inline-block">
                        <Highlighter action="underline" color="#FFD700">
                            About Me
                        </Highlighter>
                    </h2>
        </div>
        <ScrollReveal
          scrollContainerRef={scrollContainerRef}
          baseOpacity={0}
          enableBlur={true}
          baseRotation={1.2}
          blurStrength={10}
          containerClassName="my-6"
          textClassName="font-sans text-base sm:text-lg md:text-xl leading-relaxed"
        >
          I am CTO at Aimira, where an AI quality-control platform inspects fabric on the production line: computer vision catching defects in real time, with roll-level traceability. The factory does not care how elegant the model is if the line has to stop, so I own the unglamorous half: the retraining loop, edge deployment that survives losing the network, and installations you can reproduce.
        </ScrollReveal>
        <ScrollReveal
          scrollContainerRef={scrollContainerRef}
          baseOpacity={0}
          enableBlur={true}
          baseRotation={1.2}
          blurStrength={10}
          containerClassName="my-6"
          textClassName="font-sans text-base sm:text-lg md:text-xl leading-relaxed"
        >
          Over 12 years I have scaled engineering organisations, from six engineers to around forty at Fourvenues, and through migrations at Loomee, Cubicup and Avantio. It is the same problem each time: systems where a consistency failure has real-world consequences for the business and the people who depend on it.
        </ScrollReveal>
        <ScrollReveal
          scrollContainerRef={scrollContainerRef}
          baseOpacity={0}
          enableBlur={true}
          baseRotation={1.2}
          blurStrength={10}
          containerClassName="my-6"
          textClassName="font-sans text-base sm:text-lg md:text-xl leading-relaxed"
        >
          I measure my work by what the business gets: dates it can plan around, cost it can predict, and risk it can explain to the people who fund it. Hexagonal architecture, event-driven systems and delivery you can measure are how I get there, alongside a team that outlives any single decision I make.
        </ScrollReveal>
      </div>
    </section>
  );
}