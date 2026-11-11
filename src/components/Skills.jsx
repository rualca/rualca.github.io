import React from 'react';
import { Typescript, ReactLogo, Node, PostgreSQL, Django, Git } from './SkillLogos';
import { Highlighter } from "@/components/ui/highlighter";

const focusAreas = [
  {
    title: 'Business and product',
    items: [
      'Prioritising against what customers actually earn, not whoever pushes hardest',
      'Defending platform investment against the feature roadmap',
      'Owning infrastructure and inference cost against a price point',
      'Tracking cost deviation and margin per project, not after the job closes',
      'Cutting scope to the smallest release that delivers value',
    ],
  },
  {
    title: 'Leadership',
    items: [
      'Org design and squad boundaries drawn on domains',
      'Hiring bar, interview process and onboarding that scale',
      'Parallel technical and management career tracks',
      'DORA metrics, OKRs and blameless post-mortems',
    ],
  },
  {
    title: 'Architecture',
    items: [
      'Domain-driven and hexagonal design',
      'Event-driven systems, idempotency and concurrency control',
      'Anti-corruption layers around systems you do not control',
      'Knowing when to split a system and when not to',
    ],
  },
  {
    title: 'AI in production',
    items: [
      'Model lifecycle: labelling, validation, drift monitoring, retraining',
      'LLM retrieval with citations, behind an evaluation harness',
      'Error thresholds set per customer as business decisions',
      'Inference cost governance',
    ],
  },
  {
    title: 'Risk and compliance',
    items: [
      'EU AI Act human-oversight obligations in the architecture',
      'Special-category health data: encryption, tenant isolation, EU residency',
      'Intended-use scope and its effect on certification cost',
      'Audit trails that show who decided what',
    ],
  },
];

const handsOn = [
  <Typescript key="ts" />,
  <ReactLogo key="react" />,
  <Node key="node" />,
  <PostgreSQL key="postgresql" />,
  <Django key="django" />,
  <Git key="git" />,
];

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-white text-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold font-pixel inline-block">
            <Highlighter action="underline" color="#FFD700">
              Skills
            </Highlighter>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
          {focusAreas.map((area, index) => (
            <div
              key={area.title}
              className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm${index === 0 ? ' md:col-span-2' : ''}`}
            >
              <h3 className="text-base font-bold text-gray-900 mb-3">{area.title}</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-1">
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <p className="text-sm font-semibold text-gray-700">Hands-on with</p>
          {handsOn.map((logo, index) => (
            <div key={index} className="w-10 h-10 text-gray-600">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
