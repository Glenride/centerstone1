import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function WaitlistForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        console.log('Form submitted');
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border bg-card p-8 text-center text-card-foreground shadow-sm">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check"
                    >
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold">You're on the list!</h3>
                <p className="text-muted-foreground">
                    We'll let you know when Centerstone is ready for you.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Add another email
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex flex-col space-y-2 text-center">
                    <span className="text-4xl font-serif">1.</span>
                    <h3 className="text-2xl font-serif font-semibold leading-none tracking-tight">
                        Let's Get You Started
                    </h3>
                </div>
            </div>
            <div className="p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                            id="first-name"
                            required
                            placeholder="Enter your full name..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                            id="last-name"
                            required
                            placeholder="Enter your full name..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            placeholder="Enter your email..."
                        />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <Button variant="outline" type="button">
                            ← Previous
                        </Button>
                        <Button type="submit">Next →</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
