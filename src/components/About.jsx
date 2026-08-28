import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Highlighter } from "@/components/ui/highlighter";

export default function About({ scrollContainerRef }) {
  return (
    <section id="about" className="w-full min-h-screen bg-white text-black p-8 sm:p-16 md:p-24 flex items-center justify-center">
      <div className="max-w-4xl text-center">
        <div className="mb-12 flex justify-center">
                    <h2 className="text-5xl font-bold font-pixel underline-wavy-yellow inline-block">
                        <Highlighter action="underline" color="#FFD700">
                            About Me 😊
                        </Highlighter>
                    </h2>
        </div>  
        <ScrollReveal
          scrollContainerRef={scrollContainerRef}
          baseOpacity={0}
          enableBlur={true}
          baseRotation={1.2}
          blurStrength={10}
          containerClassName="my-12"
          textClassName="font-sans text-base sm:text-lg md:text-xl"
        >
         I am CTO at Aimira, where an AI quality-control platform inspects fabric on the production line: computer vision catching defects in real time, roll-level traceability, and the production data that makes both of them mean something. It is industrial software, which is to say the factory does not care how elegant the model is if the line has to stop — so what I actually own is the boring half: the retraining loop, the edge deployment that survives losing the network, and an installation you can reproduce instead of improvise. Over 12 years I have scaled engineering organisations and the architectures they ship — from six engineers to around forty at Fourvenues, from MVP to production platform at Loomee, and through migrations at Cubicup and Avantio that taught me as much about when not to split a system as about how. I care about hexagonal architecture, event-driven systems, and delivery you can measure instead of argue about. And about the unglamorous half of the job: building a team that outlives any single decision I make.
        </ScrollReveal>
      </div>
    </section>
  );
}