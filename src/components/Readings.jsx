"use client"

import React, { useState } from 'react';
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import GlareHover from './GlareHover';
import { ArrowUpRight, BookOpen, ChevronDown, ChevronUp, Star, X } from 'lucide-react';

const readingsData = [
    {
        title: 'The Systemic CTO',
        author: 'Antoine Craske',
        type: 'book',
        tags: ['CTO', 'Leadership', 'Engineering Management'],
        url: '',
        coverUrl: '',
        year: 2024,
        rating: 5,
        review: 'A modern, systems-thinking approach to the CTO role. Craske provides frameworks for navigating the complexity of technical leadership that go beyond typical management advice. Highly relevant for anyone stepping into or growing within a CTO position.',
    },
    {
        title: 'Jony Ive: The Genius Behind Apple\'s Greatest Products',
        author: 'Leander Kahney',
        type: 'book',
        tags: ['Biography', 'Design', 'Apple'],
        url: '',
        coverUrl: '',
        year: 2013,
        rating: 4,
        review: 'A fascinating look into the mind behind Apple\'s iconic design language. Kahney reveals how obsession with simplicity and materials can create products that define entire generations. A great reminder that engineering and design must go hand in hand.',
    },
    {
        title: 'Engineers\' Survival Guide',
        author: 'Merih Taze',
        type: 'book',
        tags: ['Engineering', 'Career', 'Self-Improvement'],
        url: '',
        coverUrl: '',
        year: 2022,
        rating: 4,
        review: 'Practical, no-nonsense career advice for software engineers at any stage. Covers everything from navigating corporate politics to growing technically. I wish I had this book earlier in my career — it would have saved me from learning many lessons the hard way.',
    },
    {
        title: 'Refactoring: Improving the Design of Existing Code',
        author: 'Martin Fowler',
        type: 'book',
        tags: ['Software Design', 'Clean Code', 'Best Practices'],
        url: '',
        coverUrl: '',
        year: 2018,
        rating: 5,
        review: 'The definitive catalog of refactoring techniques. Fowler\'s second edition modernizes the examples while keeping the timeless principles intact. I reference this book constantly when mentoring developers on how to improve existing codebases incrementally.',
    },
    {
        title: 'Strategic Monoliths and Microservices',
        author: 'Vaughn Vernon & Tomasz Jaskula',
        type: 'book',
        tags: ['Architecture', 'Microservices', 'DDD'],
        url: '',
        coverUrl: '',
        year: 2022,
        rating: 4,
        review: 'A refreshingly balanced take on the monolith vs. microservices debate. Vernon and Jaskula argue for strategic decision-making over hype-driven architecture. Essential reading for anyone deciding how to structure their systems at scale.',
    },
    {
        title: 'Tim Cook: The Genius Who Took Apple to the Next Level',
        author: 'Leander Kahney',
        type: 'book',
        tags: ['Biography', 'Leadership', 'Business'],
        url: '',
        coverUrl: '',
        year: 2019,
        rating: 4,
        review: 'An insightful portrait of how operational excellence and quiet leadership can be just as transformative as visionary showmanship. Cook\'s approach to supply chain mastery and values-driven management offers valuable lessons for any tech leader.',
    },
    {
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        type: 'book',
        tags: ['Architecture', 'SOLID', 'Software Design'],
        url: '',
        coverUrl: '',
        year: 2017,
        rating: 4,
        review: 'A solid reference for understanding architectural boundaries and the dependency rule. While some examples feel dated, the core principles around hexagonal architecture and component separation remain timeless and directly applicable to my daily work.',
    },
    {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        type: 'book',
        tags: ['Clean Code', 'Best Practices', 'Software Design'],
        url: '',
        coverUrl: '',
        year: 2008,
        rating: 4,
        review: 'A classic that every developer should read early in their career. The principles of meaningful naming, small functions, and code readability have fundamentally shaped how I write and review code. Some parts show their age, but the core message endures.',
    },
    {
        title: 'Elon Musk: El empresario que anticipa el futuro',
        author: 'Ashlee Vance',
        type: 'book',
        tags: ['Biography', 'Business', 'Innovation'],
        url: '',
        coverUrl: '',
        year: 2015,
        rating: 3,
        review: 'An intense biography that shows the extremes of ambition-driven leadership. While Musk\'s relentless execution is undeniable, the book also reveals the human cost of that approach. Thought-provoking for reflecting on what kind of leader you want to be.',
    },
    {
        title: 'An Elegant Puzzle: Systems of Engineering Management',
        author: 'Will Larson',
        type: 'book',
        tags: ['Engineering Management', 'Leadership'],
        url: '',
        coverUrl: '',
        year: 2019,
        rating: 5,
        review: 'Larson distills complex engineering management topics into clear, actionable frameworks. From team sizing to managing technical debt, this book covers the real challenges engineering leaders face. A must-have on any engineering manager\'s shelf.',
    },
    {
        title: 'The Staff Engineer\'s Path',
        author: 'Tanya Reilly',
        type: 'book',
        tags: ['Engineering', 'Career', 'Leadership'],
        url: '',
        coverUrl: '',
        year: 2022,
        rating: 5,
        review: 'Finally, a book that maps the individual contributor leadership track with the same rigor as management books. Reilly nails the nuances of technical leadership without authority — sponsoring projects, creating alignment, and driving architectural decisions.',
    },
    {
        title: 'Accelerate: The Science of Lean Software and DevOps',
        author: 'Nicole Forsgren, Jez Humble & Gene Kim',
        type: 'book',
        tags: ['DevOps', 'DORA Metrics', 'Engineering'],
        url: '',
        coverUrl: '',
        year: 2018,
        rating: 5,
        review: 'The foundation behind DORA metrics and data-driven engineering. This book changed how I measure team performance and helped me move away from vanity metrics towards meaningful indicators of software delivery and organizational health.',
    },
    {
        title: 'The Phoenix Project',
        author: 'Gene Kim, Kevin Behr & George Spafford',
        type: 'book',
        tags: ['DevOps', 'IT Management', 'Novel'],
        url: '',
        coverUrl: '',
        year: 2013,
        rating: 5,
        review: 'A novel that makes DevOps principles click like no textbook can. Following Bill\'s journey through IT chaos is painfully relatable. I\'ve recommended this book to every non-technical stakeholder who wants to understand why engineering practices matter.',
    },
    {
        title: 'Inspired: How to Create Tech Products Customers Love',
        author: 'Marty Cagan',
        type: 'book',
        tags: ['Product Management', 'Technology', 'Leadership'],
        url: '',
        coverUrl: '',
        year: 2017,
        rating: 5,
        review: 'Cagan dismantles the feature-factory mindset and shows how empowered product teams actually work. As a technical leader, understanding product discovery and dual-track agile has been crucial for building things that truly matter to users.',
    },
    {
        title: 'Patterns of Enterprise Application Architecture',
        author: 'Martin Fowler',
        type: 'book',
        tags: ['Architecture', 'Design Patterns', 'Enterprise'],
        url: '',
        coverUrl: '',
        year: 2002,
        rating: 4,
        review: 'A timeless reference catalog for enterprise patterns. While some patterns feel legacy, concepts like Repository, Unit of Work, and Domain Model remain foundational. I still reach for this book when designing data access layers and domain logic.',
    },
    {
        title: 'Building Microservices',
        author: 'Sam Newman',
        type: 'book',
        tags: ['Microservices', 'Architecture', 'Distributed Systems'],
        url: '',
        coverUrl: '',
        year: 2021,
        rating: 5,
        review: 'The most comprehensive and practical guide to microservices architecture. Newman covers decomposition strategies, inter-service communication, and the organizational aspects that most books ignore. The second edition adds critical insights on security and resilience.',
    },
    {
        title: 'Building Applications with AI Agents',
        author: 'Manus Ahuja',
        type: 'book',
        tags: ['AI', 'Agents', 'Software Engineering'],
        url: '',
        coverUrl: '',
        year: 2025,
        rating: 4,
        review: 'A timely and practical guide to the emerging world of AI agents. Covers agent architectures, tool use, and orchestration patterns with hands-on examples. Essential reading for any engineer looking to build production-ready AI-powered applications.',
    },
    {
        title: 'Lo Único: La sencilla y sorprendente verdad que hay detrás de los grandes resultados',
        author: 'Gary Keller & Jay Papasan',
        type: 'book',
        tags: ['Productivity', 'Self-Improvement', 'Business'],
        url: '',
        coverUrl: '',
        year: 2013,
        rating: 4,
        review: 'A powerful reminder that focus beats multitasking every time. The domino effect metaphor and the focusing question have become tools I use daily for prioritizing both personal and team goals. Simple premise, profound impact on how I manage my time.',
    },
    {
        title: 'This Is Service Design Doing',
        author: 'Marc Stickdorn, Markus Edgar Hormess, Adam Lawrence & Jakob Schneider',
        type: 'book',
        tags: ['Service Design', 'UX', 'Design Thinking'],
        url: '',
        coverUrl: '',
        year: 2018,
        rating: 4,
        review: 'A comprehensive toolkit for applying service design in practice. The hands-on methods and real-world case studies bridge the gap between theory and execution. Invaluable for understanding the end-to-end user journey beyond just the digital interface.',
    },
    {
        title: 'Hands-On Large Language Models',
        author: 'Jay Alammar & Maarten Grootendorst',
        type: 'book',
        tags: ['AI', 'LLMs', 'Machine Learning'],
        url: '',
        coverUrl: '',
        year: 2024,
        rating: 5,
        review: 'The best practical introduction to LLMs I\'ve found. Alammar\'s gift for visual explanations combined with hands-on code makes complex concepts like attention mechanisms and fine-tuning accessible. A must-read for engineers entering the AI space.',
    },
    {
        title: 'Machine Learning Design Patterns',
        author: 'Valliappa Lakshmanan, Sara Robinson & Michael Munn',
        type: 'book',
        tags: ['Machine Learning', 'Design Patterns', 'AI'],
        url: '',
        coverUrl: '',
        year: 2020,
        rating: 4,
        review: 'Brings the concept of design patterns to the ML world with practical, battle-tested solutions. Covers everything from data representation to model training and serving. Particularly useful for engineering teams building ML systems in production.',
    },
    {
        title: 'Productividad Feel Good',
        author: 'Ali Abdaal',
        type: 'book',
        tags: ['Productivity', 'Self-Improvement', 'Well-being'],
        url: '',
        coverUrl: '',
        year: 2024,
        rating: 4,
        review: 'A refreshing take on productivity that prioritizes well-being over hustle culture. Abdaal\'s evidence-based approach to feeling good while being productive resonates with my belief that sustainable performance comes from energy management, not time management.',
    },
    {
        title: 'Entrepreneur Revolution',
        author: 'Daniel Priestley',
        type: 'book',
        tags: ['Entrepreneurship', 'Business', 'Innovation'],
        url: '',
        coverUrl: '',
        year: 2013,
        rating: 3,
        review: 'An energizing read about the shift from the industrial age to the entrepreneur age. Priestley offers a compelling vision for building a personal brand and creating value. Some ideas feel aspirational rather than actionable, but the mindset shift is valuable.',
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

const allTags = [...new Set(readingsData.flatMap((r) => r.tags))].sort();

export default function Readings() {
    const [showAll, setShowAll] = useState(false);
    const [activeTag, setActiveTag] = useState(null);

    const filteredReadings = activeTag
        ? readingsData.filter((r) => r.tags.includes(activeTag))
        : readingsData;

    const displayedReadings = showAll ? filteredReadings : filteredReadings.slice(0, 3);

    const handleTagClick = (tag) => {
        setActiveTag((prev) => (prev === tag ? null : tag));
        setShowAll(false);
    };

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

                <div className="flex flex-wrap justify-center gap-2 max-w-screen-lg mx-auto mb-10">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={cn(
                                "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200",
                                activeTag === tag
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                    {activeTag && (
                        <button
                            onClick={() => { setActiveTag(null); setShowAll(false); }}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 flex items-center gap-1"
                        >
                            Clear
                            <X size={12} />
                        </button>
                    )}
                </div>

                {readingsData.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No readings added yet. Check back soon.</p>
                    </div>
                ) : filteredReadings.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No readings found for "{activeTag}".</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
                            {displayedReadings.map((reading, index) => (
                                <ReadingCard key={`${activeTag}-${index}`} reading={reading} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            {!showAll && filteredReadings.length > 3 && (
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="btn"
                                >
                                    View More ({filteredReadings.length - 3} more)
                                </button>
                            )}
                            {showAll && filteredReadings.length > 3 && (
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
