'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    badge?: string;
}

export default function SectionWrapper({
    title,
    icon,
    children,
    defaultOpen = true,
    badge,
}: SectionWrapperProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <section className="card animate-fade-in">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left"
                aria-expanded={isOpen}
                aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <div className="card-title">
                    {icon}
                    <span>{title}</span>
                    {badge && (
                        <span className="badge badge-primary">{badge}</span>
                    )}
                </div>
                <span className="text-muted">
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                </span>
            </button>

            <div
                id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
                className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                )}
            >
                {children}
            </div>
        </section>
    );
}
