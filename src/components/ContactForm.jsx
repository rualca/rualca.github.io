import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { analyticsEnabled, track } from '../lib/analytics';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div id="contact" className="relative flex w-full items-center justify-center overflow-hidden bg-background pt-16 pb-32 md:pt-24 md:pb-48">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
      <div className="relative z-10 container px-4 mx-auto">
        {/* Centered Form */}
        <div className="max-w-md mx-auto px-8 py-6 bg-gray-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Contact Me</h2>
          <form 
            action="https://formspree.io/f/xrbwdkqb" 
            method="POST"
            // Only the fixed topic is reported; name, email and message never are.
            onSubmit={() => track('contact_submit', { topic: form.topic })}
          >
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="name">Your Name</label>
              <input
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                placeholder="Enter your name"
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="email">Your Email</label>
              <input
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                placeholder="Enter your email"
                name="email"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="topic">I'm contacting about</label>
              <select
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                name="topic"
                id="topic"
                value={form.topic}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Choose one</option>
                <option value="Fractional CTO">Fractional CTO</option>
                <option value="Advisory">Technical advisory</option>
                <option value="Role">A role</option>
                <option value="Other">Something else</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="message">Your Message</label>
              <textarea
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                rows="4"
                placeholder="Enter your message"
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="flex justify-center gap-6 mt-8 text-sm font-medium text-gray-700">
          <a
            href="https://www.linkedin.com/in/rubenalapont"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm underline underline-offset-4 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/rualca"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm underline underline-offset-4 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
          >
            GitHub
          </a>
        </div>
        {analyticsEnabled() && (
          <p className="mt-6 text-center text-xs text-gray-500">
            This site uses cookieless, anonymous analytics. No personal data is collected.
          </p>
        )}
      </div>
    </div>
  );
}