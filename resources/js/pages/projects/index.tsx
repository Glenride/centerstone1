import { Head, usePage, useForm, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData, Project } from '@/types';
import { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ projects = [] }: { projects: Project[] }) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user.role === 'admin';
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        template: 'ip_commercialization',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/projects', {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

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
                        <section className="flex items-center justify-between rounded-xl border bg-card p-6 shadow-sm">
                            <div>
                                <h2 className="text-lg font-semibold">Centerstone Project Management</h2>
                                <p className="text-sm text-muted-foreground">Manage your IP commercialization projects.</p>
                            </div>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Project
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create New Project</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={submit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="title">Project Title</Label>
                                            <Input
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                required
                                            />
                                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="template">Project Template</Label>
                                            <Select
                                                value={data.template}
                                                onValueChange={(value) => setData('template', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a template" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ip_commercialization">IP Commercialization</SelectItem>
                                                    <SelectItem value="standard">Standard Project Management</SelectItem>
                                                    <SelectItem value="agile">Agile Software Development</SelectItem>
                                                    <SelectItem value="content">Content Creation Pipeline</SelectItem>
                                                    <SelectItem value="blank">Blank Project</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {data.template === 'ip_commercialization' && "The standard Centerstone flow for patenting and commercializing IP."}
                                                {data.template === 'standard' && "Classic 5-phase project management lifecycle."}
                                                {data.template === 'agile' && "Iterative development flow for software projects."}
                                                {data.template === 'content' && "Workflow for producing and publishing content."}
                                                {data.template === 'blank' && "Start from scratch with no pre-defined phases."}
                                            </p>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="submit" disabled={processing}>
                                                Create Project
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </section>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <div key={project.id} className="flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-lg">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-xs rounded-full bg-primary/10 px-2.5 py-0.5 text-primary font-medium">
                                            {project.status}
                                        </span>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/projects/${project.id}`}>
                                                View <ArrowRight className="ml-2 h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {projects.length === 0 && (
                                <div className="col-span-full py-12 text-center text-muted-foreground">
                                    No projects found. Create one to get started!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Default Waitlist Content */}
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
