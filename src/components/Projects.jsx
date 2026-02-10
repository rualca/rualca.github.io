"use client"

import React, { useState } from 'react';
import GlareHover from './GlareHover';
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";


// --- 1. Import your project images ---

import githubRepoLogo from '../assets/github-repo-logo.jpg';
import { Truck } from 'lucide-react';

// --- Data for the projects ---
const projectData = [
    {
        title: 'Role Playing',
        description: 'Hiring and workplace conversation simulator with AI candidates and employees. Practice interviews, difficult conversations, and get feedback without real-world consequences.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/role-playing',
        tags: ['Python', 'TypeScript', 'AI', 'FastAPI', 'React'],
    },
    {
        title: 'Multiagent CrewAI',
        description: 'A framework for developing and testing multi-agent systems using artificial intelligence with CrewAI.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/multiagent-crewai',
        tags: ['Python', 'AI', 'CrewAI'],
    },
    {
        title: 'Agents LangGraph',
        description: 'AI agents built with LangGraph for orchestrating complex workflows and reasoning chains.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/agents-langgraph',
        tags: ['Python', 'LangGraph', 'AI'],
    },
    {
        title: 'RAG LangChain',
        description: 'Retrieval-Augmented Generation implementation using LangChain for enhanced AI responses.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/rag-langchain',
        tags: ['Python', 'LangChain', 'RAG'],
    },
    {
        title: 'Chatbot Streamlit',
        description: 'An interactive AI chatbot built with Streamlit for conversational interfaces.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/chatbot-streamlit',
        tags: ['Python', 'Streamlit', 'AI'],
    },
    {
        title: 'Punk Da Beer',
        description: 'An open-source beer listing app built with hexagonal architecture principles.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/punk-da-beer',
        tags: ['TypeScript', 'Node.js', 'Angular', 'Hexagonal Architecture'],
    },
    {
        title: 'MQTT Response Pattern',
        description: 'Implementation of request-response patterns over MQTT protocol for IoT communication.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/mqtt-response-pattern',
        tags: ['TypeScript', 'MQTT', 'IoT'],
    },
    {
        title: 'AI Image Generator',
        description: 'An AI-powered image generation tool using modern generative models.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/ai-image-generator',
        tags: ['CSS', 'AI', 'Image Generation'],
    },
    {
        title: 'CQRS Node.js',
        description: 'CQRS (Command Query Responsibility Segregation) pattern implementation in Node.js.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/cqrs-nodejs',
        tags: ['TypeScript', 'Node.js', 'CQRS'],
    },
    {
        title: 'TypeScript Hexagonal Template',
        description: 'A starter template for TypeScript projects following hexagonal architecture principles.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/typescript-hexagonal-template',
        tags: ['TypeScript', 'Hexagonal Architecture'],
    },
    {
        title: 'Angular Clean Architecture',
        description: 'An Angular project structured with clean architecture principles for maintainable frontend apps.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/angular-clean-architecture',
        tags: ['TypeScript', 'Angular', 'Clean Architecture'],
    },
    {
        title: 'Node Grafana Prometheus',
        description: 'Node.js application with Grafana and Prometheus integration for monitoring and observability.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/node-grafana-prometheus',
        tags: ['JavaScript', 'Node.js', 'Grafana', 'Prometheus'],
    },
    {
        title: 'Elasticsearch Course',
        description: 'Exercises and examples from an Elasticsearch course covering search and analytics.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/elasticsearch-course',
        tags: ['Elasticsearch'],
    },
    {
        title: 'Minereact',
        description: 'A minimal React implementation built from scratch to understand React internals.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/minereact',
        tags: ['TypeScript', 'React'],
    },
    {
        title: 'Platziverse',
        description: 'A real-time IoT platform built during the Platzi Node.js course.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/platziverse',
        tags: ['HTML', 'Node.js', 'IoT'],
    },
    {
        title: 'HTML5 Game',
        description: 'A classic Snake game built with HTML5 Canvas and vanilla JavaScript.',
        imageUrl: githubRepoLogo,
        repoUrl: 'https://github.com/rualca/HTML5_Game',
        tags: ['JavaScript', 'HTML5', 'Canvas'],
    },
];

// --- Single Project Card Component ---
const ProjectCard = ({ project }) => (
    <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.3}
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
        <div className="flex flex-col h-full bg-white rounded-[16px] overflow-hidden">
            {project.videoUrl ? (
                <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    className="w-full h-1/2 object-cover"
                    poster={project.imageUrl}
                />
            ) : (
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-1/2 object-cover"
                />
            )}
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {project.title}
                </h3>
                <p className="text-gray-600 text-xs mb-2 flex-grow">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-200 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </GlareHover>
);

// --- Main Projects Section Component ---
export default function Projects() {
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? projectData : projectData.slice(0, 3);

    return (
        <section
            id="projects"
            // --- 1. Added bg-white (or bg-background) here ---
            className="relative w-full text-black py-20 overflow-hidden bg-white"
        >
            <InteractiveGridPattern
                className={cn(
                    "absolute inset-0 h-full w-full",
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
                // --- 2. Added the missing props from your demo ---
                width={20}
                height={20}
                squares={[80, 80]}
                // You can set a static color for the squares
                squaresClassName="fill-gray-100"
            />

            <div className="relative z-10 px-2">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold font-pixel underline-wavy-yellow inline-block">
                        <Highlighter action="underline" color="#FFD700">
                            Projects 🚀
                        </Highlighter>
                    </h2>
                </div>
                <div className="grid grid-cols-3 gap-6 max-w-screen-lg mx-auto">
                    {displayedProjects.map((project, index) => (
                        <div key={index} className="aspect-square">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {/* View More / View Less Button */}
                <div className="text-center mt-12">
                    {!showAll && projectData.length > 3 && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="btn"
                        >
                            View More
                        </button>
                    )}
                    {showAll && (
                        <button
                            onClick={() => setShowAll(false)}
                            className="btn"
                        >
                            View Less
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}