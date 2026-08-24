import React from 'react';
import { Highlighter } from "@/components/ui/highlighter";
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="w-full bg-white text-black py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-pixel underline-wavy-yellow inline-block">
            <Highlighter action="underline" color="#FFD700">
              Experience 🧭
            </Highlighter>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {experience.map((entry) => (
            <div
              key={entry.company}
              className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">{entry.company}</h3>
                <span className="text-sm text-gray-500">{entry.period}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-4">
                {entry.role} · {entry.location}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
