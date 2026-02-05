import { Head, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user.role === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Waitlist Banner - Only for non-admins */}
                {!isAdmin && (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
                        <h3 className="mb-2 text-xl font-bold text-primary">You are on the waitlist!</h3>
                        <p className="text-muted-foreground">
                            Thank you for joining Centerstone. We are rolling out access gradually.
                            We will notify you at your email address as soon as your account is fully active.
                        </p>
                    </div>
                )}

                {/* Admin Dashboard - Project Management Tool */}
                {isAdmin && (
                    <div className="flex flex-col gap-6">
                        <section className="rounded-xl border bg-card p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold">Centerstone Project Management</h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                {/* Metric Cards */}
                                <div className="rounded-lg border bg-muted/50 p-4">
                                    <span className="text-sm text-muted-foreground">Active Projects</span>
                                    <div className="mt-1 text-2xl font-bold">12</div>
                                </div>
                                <div className="rounded-lg border bg-muted/50 p-4">
                                    <span className="text-sm text-muted-foreground">Pending Tasks</span>
                                    <div className="mt-1 text-2xl font-bold">48</div>
                                </div>
                                <div className="rounded-lg border bg-muted/50 p-4">
                                    <span className="text-sm text-muted-foreground">Team Capacity</span>
                                    <div className="mt-1 text-2xl font-bold">85%</div>
                                </div>
                            </div>
                        </section>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Recent Activity Placeholder */}
                            <div className="rounded-xl border bg-card p-6 shadow-sm">
                                <h3 className="mb-4 font-medium">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10" />
                                            <div>
                                                <div className="h-4 w-32 rounded bg-muted"></div>
                                                <div className="mt-1 h-3 w-24 rounded bg-muted/60"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Project List Placeholder */}
                            <div className="rounded-xl border bg-card p-6 shadow-sm">
                                <h3 className="mb-4 font-medium">Projects</h3>
                                <div className="space-y-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-accent/20"></div>
                                                <span className="font-medium">Project Alpha</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">On Track</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Default content only if simplified or remove entirely? 
                    Let's remove the placeholder patterns for admins to make it clean, 
                    or keep them for waitlist users to look like "locked" content.
                */}
                {!isAdmin && (
                    <>
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
