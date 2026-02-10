"use client"

import React, { useState } from 'react';
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import GlareHover from './GlareHover';
import { ArrowUpRight, BookOpen, ChevronDown, ChevronUp, Star } from 'lucide-react';

const readingsData = [
    {
        title: 'The Systemic CTO',
        author: 'Antoine Craske',
        type: 'book',
        tags: ['CTO', 'Leadership', 'Engineering Management'],
        url: '',
        coverUrl: '',
        year: 2024,
        rating: 0,
        review: '',
    },
    {
        title: 'Jony Ive: The Genius Behind Apple\'s Greatest Products',
        author: 'Leander Kahney',
        type: 'book',
        tags: ['Biography', 'Design', 'Apple'],
        url: '',
        coverUrl: '',
        year: 2013,
        rating: 0,
        review: '',
    },
    {
        title: 'Engineers\' Survival Guide',
        author: 'Merih Taze',
        type: 'book',
        tags: ['Engineering', 'Career', 'Self-Improvement'],
        url: '',
        coverUrl: '',
        year: 2022,
        rating: 0,
        review: '',
    },
    {
        title: 'Refactoring: Improving the Design of Existing Code',
        author: 'Martin Fowler',
        type: 'book',
        tags: ['Software Design', 'Clean Code', 'Best Practices'],
        url: '',
        coverUrl: '',
        year: 2018,
        rating: 0,
        review: '',
    },
    {
        title: 'Strategic Monoliths and Microservices',
        author: 'Vaughn Vernon & Tomasz Jaskula',
        type: 'book',
        tags: ['Architecture', 'Microservices', 'DDD'],
        url: '',
        coverUrl: '',
        year: 2022,
        rating: 0,
        review: '',
    },
    {
        title: 'Tim Cook: The Genius Who Took Apple to the Next Level',
        author: 'Leander Kahney',
        type: 'book',
        tags: ['Biography', 'Leadership', 'Business'],
        url: '',
        coverUrl: '',
        year: 2019,
        rating: 0,
        review: '',
    },
    {
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        type: 'book',
        tags: ['Architecture', 'SOLID', 'Software Design'],
        url: '',
        coverUrl: '',
        year: 2017,
        rating: 0,
        review: '',
    },
    {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        type: 'book',
        tags: ['Clean Code', 'Best Practices', 'Software Design'],
        url: '',
        coverUrl: '',
        year: 2008,
        rating: 0,
        review: '',
    },
    {
        title: 'Elon Musk: El empresario que anticipa el futuro',
        author: 'Ashlee Vance',
        type: 'book',
        tags: ['Biography', 'Business', 'Innovation'],
        url: '',
        coverUrl: '',
        year: 2015,
        rating: 0,
        review: '',
    },
    {
        title: 'An Elegant Puzzle: Systems of Engineering Management',
        author: 'Will Larson',
        type: 'book',
        tags: ['Engineering Management', 'Leadership'],
        url: '',
        coverUrl: '',
        year: 2019,
        rating: 0,
        review: '',
    },
    {
        title: 'The Staff Engineer\'s Path',
        author: 'Tanya Reilly',
        type: 'book',
        tags: ['Engineering', 'Career', 'Leadership'],
        url: '',
        coverUrl: '',
        year: 2022,
        rating: 0,
        review: '',
    },
    {
        title: 'Accelerate: The Science of Lean Software and DevOps',
        author: 'Nicole Forsgren, Jez Humble & Gene Kim',
        type: 'book',
        tags: ['DevOps', 'DORA Metrics', 'Engineering'],
        url: '',
        coverUrl: '',
        year: 2018,
        rating: 0,
        review: '',
    },
    {
        title: 'The Phoenix Project',
        author: 'Gene Kim, Kevin Behr & George Spafford',
        type: 'book',
        tags: ['DevOps', 'IT Management', 'Novel'],
        url: '',
        coverUrl: '',
        year: 2013,
        rating: 0,
        review: '',
    },
    {
        title: 'Inspired: How to Create Tech Products Customers Love',
        author: 'Marty Cagan',
        type: 'book',
        tags: ['Product Management', 'Technology', 'Leadership'],
        url: '',
        coverUrl: '',
        year: 2017,
        rating: 0,
        review: '',
    },
    {
        title: 'Patterns of Enterprise Application Architecture',
        author: 'Martin Fowler',
        type: 'book',
        tags: ['Architecture', 'Design Patterns', 'Enterprise'],
        url: '',
        coverUrl: '',
        year: 2002,
        rating: 0,
        review: '',
    },
    {
        title: 'Building Microservices',
        author: 'Sam Newman',
        type: 'book',
        tags: ['Microservices', 'Architecture', 'Distributed Systems'],
        url: '',
        coverUrl: '',
        year: 2021,
        rating: 0,
        review: '',
    },
];

const StarRating = ({ rating }) => {
    if (!rating) return null;
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    className={i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                />
            ))}
        </div>
    );
};

const ReadingCard = ({ reading }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="block group">
            <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={1350}
                playOnce={true}
                width="100%"
                height="100%"
                background="#fff"
                borderRadius="16px"
                className="h-full"
                style={{ border: '1px solid #e5e7eb' }}
            >
                <div className="flex flex-col h-full bg-white rounded-[16px] p-5 w-full">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <BookOpen size={12} />
                            {reading.type === 'book' ? 'Book' : 'Article'}
                            {reading.year ? ` · ${reading.year}` : ''}
                        </span>
                        {reading.url && (
                            <a
                                href={reading.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-yellow-500 transition-colors shrink-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ArrowUpRight size={16} />
                            </a>
                        )}
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                        {reading.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-3">
                        {reading.author}
                    </p>

                    <div className="mb-3">
                        <StarRating rating={reading.rating} />
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                        {reading.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-200 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpanded(!expanded);
                            }}
                            className="flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
                        >
                            {expanded ? 'Hide' : 'My'} review
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {expanded && reading.review && (
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
                                {reading.review}
                            </p>
                        )}
                        {expanded && !reading.review && (
                            <p className="mt-2 text-sm text-gray-400 italic border-t border-gray-100 pt-2">
                                Review coming soon...
                            </p>
                        )}
                    </div>
                </div>
            </GlareHover>
        </div>
    );
};

export default function Readings() {
    const [showAll, setShowAll] = useState(false);
    const displayedReadings = showAll ? readingsData : readingsData.slice(0, 3);

    return (
        <section
            id="readings"
            className="relative w-full text-black py-20 overflow-hidden bg-white"
        >
            <InteractiveGridPattern
                className={cn(
                    "absolute inset-0 h-full w-full",
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
                width={20}
                height={20}
                squares={[80, 80]}
                squaresClassName="fill-gray-100"
            />

            <div className="relative z-10 px-2">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold font-pixel underline-wavy-yellow inline-block">
                        <Highlighter action="underline" color="#FFD700">
                            Readings 📚
                        </Highlighter>
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm">
                        Books and articles that have shaped my thinking on engineering, leadership &amp; architecture
                    </p>
                </div>

                {readingsData.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No readings added yet. Check back soon.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
                            {displayedReadings.map((reading, index) => (
                                <ReadingCard key={index} reading={reading} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            {!showAll && readingsData.length > 3 && (
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="btn"
                                >
                                    View More
                                </button>
                            )}
                            {showAll && readingsData.length > 3 && (
                                <button
                                    onClick={() => setShowAll(false)}
                                    className="btn"
                                >
                                    View Less
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
