"use client"

import React, { useState } from 'react';
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import GlareHover from './GlareHover';
import { ArrowUpRight } from 'lucide-react';
import { publications as articlesData } from '../data/publications';
import { isPermalink } from '../data/publication-link';

const CardBody = ({ article, isLinked }) => (
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
                {isLinked && (
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-yellow-500 transition-colors shrink-0" />
                )}
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
);

const ArticleCard = ({ article }) => {
    if (isPermalink(article.url)) {
        return (
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
            >
                <CardBody article={article} isLinked />
            </a>
        );
    }

    return (
        <div className="block">
            <CardBody article={article} isLinked={false} />
        </div>
    );
};

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
                    {displayedArticles.map((article) => (
                        <ArticleCard key={article.title} article={article} />
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
