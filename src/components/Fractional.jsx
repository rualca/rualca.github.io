import React from 'react';
import { Mail } from 'lucide-react';
import { Highlighter } from "@/components/ui/highlighter";
import { fractional } from '../data/fractional';

export default function Fractional() {
  return (
    <section id="fractional" className="w-full bg-gray-50 text-black py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold font-pixel underline-wavy-yellow inline-block">
            <Highlighter action="underline" color="#FFD700">
              {fractional.headline} 🧩
            </Highlighter>
          </h2>
        </div>

        <p className="max-w-2xl mx-auto text-center text-base md:text-lg text-gray-700 mb-12">
          {fractional.summary}
        </p>

        <h3 className="max-w-4xl mx-auto text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          When founders call
        </h3>
        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2 mb-14">
          {fractional.triggers.map((trigger) => (
            <div
              key={trigger.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h4 className="text-base font-bold text-gray-900 mb-2">{trigger.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{trigger.body}</p>
            </div>
          ))}
        </div>

        <h3 className="max-w-4xl mx-auto text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          How it works
        </h3>
        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3 mb-14">
          {fractional.engagements.map((engagement) => (
            <div
              key={engagement.name}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col"
            >
              <h4 className="text-base font-bold text-gray-900">{engagement.name}</h4>
              <p className="text-xs font-medium text-yellow-600 mb-3">{engagement.cadence}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{engagement.body}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 mb-10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
            What it is not
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            {fractional.notThis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600 mb-5">{fractional.availability}</p>
          <a
            href={`mailto:${fractional.cta.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-300 px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-colors duration-300 hover:bg-yellow-400"
          >
            <Mail size={18} />
            {fractional.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
