import * as React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface SearchResult {
    id: number;
    title: string;
    type: string;
    url: string;
    project_title?: string;
}

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    React.useEffect(() => {
        if (!open) {
            setResults([]);
            setQuery('');
            return;
        }
    }, [open]);

    React.useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/search?query=${encodeURIComponent(query)}`);
                setResults(response.data);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (url: string) => {
        setOpen(false);
        router.visit(url);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64 border border-input px-4 py-2 flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
                <Search className="h-4 w-4" />
                <span className="inline-flex">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 gap-0 max-w-xl">
                    <DialogHeader className="px-4 py-3 border-b">
                        <DialogTitle className="sr-only">Search</DialogTitle>
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <input
                                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                                placeholder="Type to search projects, phases, tasks..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                        </div>
                    </DialogHeader>
                    <div className="max-h-[300px] overflow-y-auto p-2">
                        {results.length === 0 && query && !loading && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No results found.
                            </div>
                        )}
                        {results.length > 0 && (
                            <div className="space-y-1">
                                {results.map((result) => (
                                    <button
                                        key={`${result.type}-${result.id}`}
                                        onClick={() => handleSelect(result.url)}
                                        className="w-full flex items-start flex-col gap-1 p-2 rounded-md hover:bg-muted text-left transition-colors"
                                    >
                                        <div className="font-medium text-sm text-foreground">{result.title}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span className="bg-primary/10 text-primary px-1.5 rounded text-[10px] font-medium uppercase tracking-wider">
                                                {result.type}
                                            </span>
                                            {result.project_title && (
                                                <>
                                                    <span>in</span>
                                                    <span className="font-medium text-foreground/80">{result.project_title}</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                        {!query && (
                            <div className="py-12 text-center text-sm text-muted-foreground">
                                Start typing to search...
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
