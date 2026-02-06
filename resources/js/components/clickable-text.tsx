import React from 'react';

interface ClickableTextProps {
    text: string;
    className?: string;
}

export default function ClickableText({ text, className = '' }: ClickableTextProps) {
    if (!text) return null;

    // Regex to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = text.split(urlRegex);

    return (
        <span className={className}>
            {parts.map((part, i) => {
                if (part.match(urlRegex)) {
                    // Basic cleanup for punctuation at end of URL if needed, though simple split usually works
                    return (
                        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {part}
                        </a>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </span>
    );
}
