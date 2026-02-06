import { Footer } from '@/components/footer';
import { WaitlistForm } from '@/components/waitlist-form';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: {
    auth: any;
    laravelVersion: string;
    phpVersion: string;
}) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-white">
                <header className="flex items-center justify-between px-6 py-6 lg:px-12">
                    <div className="flex items-center gap-2">
                        {/* Logo / Brand Name */}
                        <div className="rounded-lg bg-primary/10 p-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-primary">
                            Centerstone
                        </span>
                    </div>
                    <nav className="hidden gap-8 font-medium md:flex">
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Why Early
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Impact
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Resources
                        </a>
                    </nav>
                    <div>
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                <span className="hidden text-sm font-medium text-muted-foreground md:inline-block">
                                    {(() => {
                                        const greetings = [
                                            "Cheerio!",
                                            "'Ello governor!",
                                            "Top hole!",
                                            "Splendid to see you!",
                                            "Righto!",
                                            "Tally-ho!",
                                            "Wotcha!",
                                            "How do you do?",
                                        ];
                                        // Simple random selection based on user ID or minute to be somewhat stable or just random
                                        return greetings[Math.floor(Math.random() * greetings.length)];
                                    })()} {auth.user.name}
                                </span>
                                <Link
                                    href="/dashboard"
                                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Join Waitlist
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                <main className="flex grow items-center justify-center px-6 py-12 lg:px-12">
                    <div className="grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:gap-24">
                        <div className="flex flex-col justify-center space-y-8">
                            <div>
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-accent">
                                    <span className="flex h-2 w-2 rounded-full bg-accent"></span>
                                    Exclusive Early Access
                                </div>
                                <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight lg:text-7xl">
                                    Work Is Evolving Fast. <br />
                                    <span className="italic">
                                        Thriving Or Surviving?
                                    </span>
                                </h1>
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                                Centerstone helps modern professionals grow with
                                clarity, confidence, and momentum. No fluff. No
                                checkbox learning. Just real development that
                                sticks.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="h-10 w-10 overflow-hidden rounded-full border-2 border-background bg-muted"
                                        >
                                            <img
                                                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                                alt="User"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Join the waitlist of{' '}
                                    <span className="text-foreground">
                                        120+ members!
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center lg:justify-end">
                            <div className="w-full max-w-md">
                                <div className="absolute -z-10 h-72 w-72 translate-x-12 translate-y-12 rounded-full bg-primary/5 blur-3xl lg:translate-x-24 lg:translate-y-24"></div>
                                <WaitlistForm />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
