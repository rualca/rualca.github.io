import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Highlighter } from "@/components/ui/highlighter";
import { caseStudies, caseStudiesDisclaimer } from '../data/caseStudies';
import { track } from '../lib/analytics';

const SECTIONS = [
  ['Context', 'context'],
  ['Problem', 'problem'],
  ['Decision', 'decision'],
  ['Result', 'result'],
  ['Takeaway', 'takeaway'],
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="w-full bg-white text-black py-20 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold font-pixel underline-wavy-yellow inline-block">
            <Highlighter action="underline" color="#FFD700">
              Case studies
            </Highlighter>
          </h2>
        </div>
        <p className="max-w-2xl mx-auto text-center text-sm text-gray-600 mb-12">
          {caseStudiesDisclaimer}
        </p>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {caseStudies.map((study, index) => (
            <details
              key={study.id}
              open={index === 0}
              className="group rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <summary
                onClick={(event) => {
                  // At click time the state is still the previous one: closed means it is opening.
                  if (!event.currentTarget.parentElement.open) track('case_study_open', { id: study.id });
                }}
                className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-lg font-bold text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900 [&::-webkit-details-marker]:hidden">
                {study.title}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <dl className="space-y-4 px-5 pb-5">
                {SECTIONS.map(([label, key]) => (
                  <div key={key}>
                    <dt className="text-sm font-semibold text-gray-700">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">{study[key]}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
