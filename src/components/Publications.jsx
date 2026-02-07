"use client"

import React, { useState } from 'react';
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import GlareHover from './GlareHover';
import { ArrowUpRight } from 'lucide-react';

const articlesData = [
    {
        title: 'Purpose-Driven Leadership: CTO Rule #7',
        date: 'Feb 18, 2025',
        url: 'https://medium.com/@ruben.alapont/purpose-driven-leadership-cto-rule-7-179d5fe31900',
        tags: ['Leadership', 'Management', 'Engineering'],
    },
    {
        title: 'The Art of Explaining the World: CTO Rule #6',
        date: 'Feb 10, 2025',
        url: 'https://medium.com/@ruben.alapont/the-art-of-explaining-the-world-cto-rule-6-d04ca9c31174',
        tags: ['Leadership', 'Coaching', 'Management'],
    },
    {
        title: 'The Power of Accountability: CTO Rule #5',
        date: 'Feb 4, 2025',
        url: 'https://medium.com/@ruben.alapont/the-power-of-accountability-the-fifth-rule-of-an-extraordinary-cto-210004102c2a',
        tags: ['Management', 'Technology', 'Leadership'],
    },
    {
        title: "It's All About People: CTO Rule #4",
        date: 'Jan 27, 2025',
        url: 'https://medium.com/@ruben.alapont/its-all-about-people-the-fourth-rule-of-an-extraordinary-cto-a5209c326f50',
        tags: ['Leadership', 'Management', 'Learning'],
    },
    {
        title: 'The Power of 1:1s: CTO Rule #3',
        date: 'Jan 24, 2025',
        url: 'https://medium.com/@ruben.alapont/the-power-of-1-1s-the-third-rule-of-an-extraordinary-cto-7db97a13d7ed',
        tags: ['Engineering', 'Management', 'Mental Health'],
    },
    {
        title: 'When to Ask for Help: CTO Rule #2',
        date: 'Jan 21, 2025',
        url: 'https://medium.com/@ruben.alapont/when-to-ask-for-help-the-second-rule-of-an-extraordinary-cto-5381cd5d4a16',
        tags: ['Leadership', 'Management', 'Coding'],
    },
    {
        title: 'The Art of Yes: CTO Rule #1',
        date: 'Jan 19, 2025',
        url: 'https://medium.com/@ruben.alapont/the-art-of-yes-the-first-rule-of-an-extraordinary-cto-62206483aaf3',
        tags: ['CTO', 'Engineering', 'Self-Improvement'],
    },
    {
        title: 'Implementing SPACE Metrics: Best Practices and Strategies',
        date: 'Oct 17, 2024',
        url: 'https://medium.com/@ruben.alapont/implementing-space-metrics-best-practices-and-strategies-0f826405416b',
        tags: ['Web Development', 'Technology', 'Programming'],
    },
    {
        title: 'Measuring Efficiency in SPACE Metrics',
        date: 'Oct 16, 2024',
        url: 'https://medium.com/@ruben.alapont/measuring-efficiency-in-space-metrics-6d7df5e1cfcb',
        tags: ['Technology', 'Web Development', 'Programming'],
    },
    {
        title: 'Measuring Communication in SPACE Metrics',
        date: 'Oct 14, 2024',
        url: 'https://medium.com/@ruben.alapont/measuring-communication-in-space-metrics-18b8ee3a7ebf',
        tags: ['Programming', 'Technology', 'Web Development'],
    },
    {
        title: 'How to Measure Activity in SPACE Metrics',
        date: 'Oct 12, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SPACE Metrics', 'Engineering'],
    },
    {
        title: 'What are SPACE Metrics and Why Do They Matter?',
        date: 'Oct 11, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SPACE Metrics', 'Technology'],
    },
    {
        title: 'How to Measure Performance in SPACE Metrics',
        date: 'Oct 10, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SPACE Metrics', 'Engineering'],
    },
    {
        title: 'How to Measure Satisfaction in SPACE Metrics',
        date: 'Oct 8, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SPACE Metrics', 'Engineering'],
    },
    {
        title: 'Deployment Frequency: The Secret to High-Performing Teams',
        date: 'Sep 23, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DORA Metrics', 'DevOps'],
    },
    {
        title: 'Reducing Mean Time to Recovery',
        date: 'Sep 21, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DORA Metrics', 'DevOps'],
    },
    {
        title: 'Strategies for Optimizing Lead Time for Changes',
        date: 'Sep 19, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DORA Metrics', 'Engineering'],
    },
    {
        title: 'How to Measure and Improve Change Failure Rate',
        date: 'Sep 17, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DORA Metrics', 'DevOps'],
    },
    {
        title: 'Understanding DORA Metrics: A Comprehensive Guide',
        date: 'Sep 11, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DORA Metrics', 'Engineering'],
    },
    {
        title: "Say No to What Doesn't Make You Feel 'Hell Yeah!': Empowering Your Affirmations",
        date: 'Dec 3, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Self-Improvement', 'Leadership'],
    },
    {
        title: 'Automating Security Updates in NPM Packages',
        date: 'Aug 29, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js', 'Security'],
    },
    {
        title: 'NPM Workspaces: Managing Multi-Package Projects',
        date: 'Aug 24, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Advanced NPM: Working with Peer Dependencies',
        date: 'Aug 23, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'NPM Caching: Speeding Up Your Development Process',
        date: 'Aug 22, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'NPM Config: Customizing Your NPM Environment',
        date: 'Aug 22, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Using NPM in Continuous Integration and Continuous Deployment (CI/CD) Pipelines',
        date: 'Aug 21, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'CI/CD', 'DevOps'],
    },
    {
        title: 'NPM vs Yarn: Comparing Node.js Package Managers',
        date: 'Aug 21, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Troubleshooting Common NPM Issues: Tips and Solutions',
        date: 'Aug 20, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Securing Node.js Projects: An Introduction to NPM Audit',
        date: 'Aug 19, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js', 'Security'],
    },
    {
        title: 'NPM Link: Developing and Testing Local NPM Packages',
        date: 'Aug 17, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Versioning Explained: Semantic Versioning in NPM Packages',
        date: 'Aug 16, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Exploring NPM Registries: A Guide to Public and Private Package Management',
        date: 'Aug 15, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Global vs Local Packages in NPM: Best Practices and Use Cases',
        date: 'Aug 15, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: "Dependency Management in NPM: Understanding 'dependencies' vs 'devDependencies'",
        date: 'Aug 12, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'NPM Scripts: Simplifying Tasks with Single-Line Commands',
        date: 'Aug 11, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'NPM CLI: Mastering Command Line Interface for Efficient Development',
        date: 'Aug 11, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Understanding the package.json file',
        date: 'Aug 10, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Installing Your First Package with NPM: A Step-by-Step Tutorial',
        date: 'Aug 9, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Getting Started with NPM: An Introductory Guide',
        date: 'Aug 8, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['NPM', 'Node.js'],
    },
    {
        title: 'Transforming Data: Using Transform Streams',
        date: 'Mar 18, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Streamlining Your Code: Best Practices for Node.js Streams',
        date: 'Mar 15, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Error Handling in Node.js Streams: Best Practices',
        date: 'Mar 15, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Piping Hot: The Power of Pipe() in Node.js Streams',
        date: 'Mar 9, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Stream Your Way: Creating Custom Streams',
        date: 'Mar 5, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Handling Data: Buffers and Streams in Node.js',
        date: 'Feb 27, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Flowing with Streams: Working with the Stream Module',
        date: 'Feb 20, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'The Anatomy of Streams: Readable and Writable Streams in Node.js',
        date: 'Feb 12, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Diving into Streams: Understanding the Basics in Node.js',
        date: 'Feb 11, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: 'Simplifying Dependency Management in Node.js with Container Libraries',
        date: 'Feb 8, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Architecture'],
    },
    {
        title: 'Testing Strategies in Domain-Driven Design (DDD)',
        date: 'Feb 6, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Testing'],
    },
    {
        title: 'Domain Events and Event Sourcing in Domain-Driven Design',
        date: 'Feb 6, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Event Sourcing'],
    },
    {
        title: 'Aggregates and Aggregate Roots in Domain-Driven Design',
        date: 'Feb 5, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Architecture'],
    },
    {
        title: 'Value Objects in Depth in Domain-Driven Design',
        date: 'Feb 4, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Architecture'],
    },
    {
        title: 'Domain Services and Factories in Domain-Driven Design',
        date: 'Feb 3, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Architecture'],
    },
    {
        title: 'Tactical Design Patterns in DDD: Modeling Complex Domains Effectively',
        date: 'Feb 2, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Design Patterns'],
    },
    {
        title: 'Repository and Unit of Work in Domain-Driven Design',
        date: 'Feb 1, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Architecture'],
    },
    {
        title: 'Strategic Design with Domain-Driven Design (DDD)',
        date: 'Jan 30, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Architecture'],
    },
    {
        title: 'Domain-Driven Design (DDD) Paradigm: Introduction to Domain-Driven Design',
        date: 'Jan 29, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Architecture'],
    },
    {
        title: 'Domain-Driven Design (DDD) Paradigm: A Comprehensive Guide',
        date: 'Jan 19, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['DDD', 'Architecture'],
    },
    {
        title: 'SOLID Principles Series: The Dependency Inversion Principle (DIP) in TypeScript',
        date: 'Jan 9, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SOLID', 'TypeScript'],
    },
    {
        title: 'SOLID Principles Series: Embracing the Interface Segregation Principle (ISP) in TypeScript',
        date: 'Jan 7, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SOLID', 'TypeScript'],
    },
    {
        title: 'SOLID Principles Series: Demystifying the Liskov Substitution Principle (LSP) in Node.js',
        date: 'Jan 6, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SOLID', 'Node.js'],
    },
    {
        title: 'Inversion of Control in TypeScript: A Paradigm Shift in Software Design',
        date: 'Jan 4, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['TypeScript', 'Architecture'],
    },
    {
        title: 'Understanding the Differences Between Interfaces and Types in TypeScript',
        date: 'Jan 3, 2024',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['TypeScript'],
    },
    {
        title: 'ReturnType in TypeScript: Enhancing Readability and Maintainability',
        date: 'Dec 31, 2023',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['TypeScript'],
    },
    {
        title: 'Diving into Streams: Understanding the Basics in Node.js',
        date: 'Dec 29, 2023',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['Node.js', 'Streams'],
    },
    {
        title: "Avoiding 'export * from...' in TypeScript",
        date: 'Dec 29, 2023',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['TypeScript'],
    },
    {
        title: 'SOLID Principles Series: Mastering the Open-Closed Principle (OCP) in Node.js with TypeScript',
        date: 'Dec 28, 2023',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['SOLID', 'TypeScript', 'Node.js'],
    },
    {
        title: 'Beyond Traditional Functions: Embracing Arrow Functions in JavaScript',
        date: 'Dec 27, 2023',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['JavaScript'],
    },
    {
        title: 'The Power of Dependency Injection in TypeScript',
        date: 'Dec 26, 2023',
        url: 'https://medium.com/@ruben.alapont',
        tags: ['TypeScript', 'Architecture'],
    },
];

const ArticleCard = ({ article, index }) => (
    <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
    >
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
            <div className="flex flex-col h-full bg-white rounded-[16px] p-5">
                <div className="flex items-start justify-between mb-3">
                    <span className="text-xs text-gray-400 font-medium">{article.date}</span>
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-yellow-500 transition-colors shrink-0" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-yellow-600 transition-colors">
                    {article.title}
                </h3>
                <div className="flex flex-wrap gap-1 mt-auto">
                    {article.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-200 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </GlareHover>
    </a>
);

export default function Publications() {
    const [showAll, setShowAll] = useState(false);
    const displayedArticles = showAll ? articlesData : articlesData.slice(0, 3);

    return (
        <section
            id="publications"
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
                            Publications ✍️
                        </Highlighter>
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm">
                        Articles on technical leadership, engineering management &amp; software architecture
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
                    {displayedArticles.map((article, index) => (
                        <ArticleCard key={index} article={article} index={index} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    {!showAll && articlesData.length > 3 && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="btn"
                        >
                            View More
                        </button>
                    )}
                    {showAll && (
                        <>
                            <a
                                href="https://medium.com/@ruben.alapont"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn inline-flex items-center gap-2 mr-4"
                            >
                                Read on Medium
                                <ArrowUpRight size={16} />
                            </a>
                            <button
                                onClick={() => setShowAll(false)}
                                className="btn"
                            >
                                View Less
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
