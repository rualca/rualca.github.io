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
         Engineering leader with over 12 years of experience scaling tech teams and building innovative platforms. I specialize in creating cloud-native architectures, driving AI-powered solutions, and fostering high-performing engineering cultures. From strategic planning to hands-on development, I focus on building scalable, resilient systems that deliver real business value. Passionate about hexagonal architecture, event-driven systems, and leveraging cutting-edge technologies to solve complex problems.
        </ScrollReveal>
      </div>
    </section>
  );
}