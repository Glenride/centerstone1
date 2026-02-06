import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Project, Phase, Task, Subtask } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import { ChevronDown, Pencil, Check, X, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ClickableText from '@/components/clickable-text';
import { cn } from '@/lib/utils';

export default function ProjectShow({ project }: { project: Project }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: project.title,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
                        <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                    </Badge>
                </div>

                <div className="grid gap-6">
                    <Accordion type="single" collapsible className="w-full" defaultValue={`phase-${project.phases?.[0]?.id}`}>
                        {project.phases?.map((phase) => (
                            <PhaseItem key={phase.id} phase={phase} />
                        ))}
                    </Accordion>
                </div>
            </div>
        </AppLayout>
    );
}

function PhaseItem({ phase }: { phase: Phase }) {
    const [duration, setDuration] = useState(phase.duration || '');
    const [isEditingDuration, setIsEditingDuration] = useState(false);

    // Calculate progress based on completed TASKS and SUBTASKS
    const totalTasks = phase.tasks?.length || 0;
    const completedTasks = phase.tasks?.filter(t => t.is_completed).length || 0;

    // Calculate total weight: tasks count + sum(all subtasks)
    let totalItems = totalTasks;
    let completedItems = completedTasks;

    phase.tasks?.forEach(task => {
        if (task.subtasks) {
            totalItems += task.subtasks.length;
            completedItems += task.subtasks.filter(s => s.is_completed).length;
        }
    });

    const progress = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

    const updatePhase = (data: Partial<Phase>) => {
        router.patch(`/phases/${phase.id}`, data, {
            preserveScroll: true,
            onSuccess: () => setIsEditingDuration(false),
        });
    };

    const handlePriorityClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
        const currentIndex = priorities.indexOf(phase.priority || 'medium');
        const nextPriority = priorities[(currentIndex + 1) % priorities.length];
        updatePhase({ priority: nextPriority });
    };

    const handleDurationSubmit = () => {
        updatePhase({ duration });
    };

    const getPriorityColor = (p?: string) => {
        switch (p) {
            case 'high': return 'bg-red-500 hover:bg-red-600';
            case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
            case 'low': return 'bg-green-500 hover:bg-green-600';
            default: return 'bg-gray-500';
        }
    };

    return (
        <AccordionItem value={`phase-${phase.id}`}>
            <AccordionTrigger className="hover:no-underline flex gap-4 pr-4">
                <div className="flex flex-1 items-center justify-between mr-4">
                    <div className="flex flex-col text-left">
                        <span className="text-lg font-semibold">{phase.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge
                                className={cn("cursor-pointer capitalize", getPriorityColor(phase.priority))}
                                onClick={handlePriorityClick}
                            >
                                {phase.priority || 'medium'}
                            </Badge>
                            {phase.status === 'completed' && (
                                <Badge variant="secondary">Completed</Badge>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-end gap-1 min-w-[120px]">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <div className="flex items-center gap-2 w-full">
                                <Progress value={progress} className="h-2 w-24" />
                                <span className="text-xs font-medium">{progress}%</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 min-w-[100px]">
                            <span className="text-xs text-muted-foreground">Duration</span>
                            {isEditingDuration ? (
                                <div className="flex items-center gap-1">
                                    <Input
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="h-7 w-48 text-xs"
                                        placeholder="24 hours"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleDurationSubmit();
                                            if (e.key === 'Escape') {
                                                setDuration(phase.duration || '');
                                                setIsEditingDuration(false);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleDurationSubmit}>
                                        <Check className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    className="text-sm font-medium cursor-pointer hover:underline flex items-center gap-1"
                                    onClick={() => setIsEditingDuration(true)}
                                >
                                    {phase.duration || '24 hours'}
                                    <Pencil className="h-3 w-3 text-muted-foreground opacity-50" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="pl-4 border-l-2 border-muted space-y-6 py-4">
                    <ClickableText text={phase.description} className="text-muted-foreground mb-4 block" />

                    <div className="space-y-4">
                        {phase.tasks?.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

function TaskItem({ task }: { task: Task }) {
    const handleCheck = (checked: boolean) => {
        router.patch(`/tasks/${task.id}`, {
            is_completed: checked
        }, { preserveScroll: true });
    };

    return (
        <Collapsible className="rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 p-4">
                <Checkbox
                    id={`task-${task.id}`}
                    checked={task.is_completed}
                    onCheckedChange={(checked) => handleCheck(checked as boolean)}
                    className="mt-1"
                />
                <div className="flex-1 grid gap-1.5">
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor={`task-${task.id}`}
                            className={cn(
                                "text-base font-medium leading-none cursor-pointer",
                                task.is_completed && "line-through text-muted-foreground"
                            )}
                        >
                            {task.name}
                        </Label>
                        {task.subtasks && task.subtasks.length > 0 && (
                            <CollapsibleTrigger asChild>
                                <button className="p-1 hover:bg-muted rounded-md transition-colors">
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </CollapsibleTrigger>
                        )}
                    </div>
                    <ClickableText text={task.description} className="text-sm text-muted-foreground" />
                </div>
            </div>

            {task.subtasks && task.subtasks.length > 0 && (
                <CollapsibleContent>
                    <div className="pl-12 pr-4 pb-4 space-y-3 border-t bg-muted/20 pt-3">
                        {task.subtasks.map((subtask) => (
                            <SubtaskItem key={subtask.id} subtask={subtask} />
                        ))}
                    </div>
                </CollapsibleContent>
            )}
            <CollapsibleContent>
                <div className="pl-12 pr-4 pb-2 bg-muted/20">
                    <AddSubtaskForm taskId={task.id} />
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

function SubtaskItem({ subtask }: { subtask: Subtask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(subtask.name);

    const handleCheck = (checked: boolean) => {
        router.patch(`/subtasks/${subtask.id}`, {
            is_completed: checked
        }, { preserveScroll: true });
    };

    const handleNameSubmit = () => {
        if (name !== subtask.name) {
            router.patch(`/subtasks/${subtask.id}`, {
                name: name
            }, {
                preserveScroll: true,
                onSuccess: () => setIsEditing(false)
            });
        } else {
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-center gap-2 group">
            <Checkbox
                id={`subtask-${subtask.id}`}
                checked={subtask.is_completed}
                onCheckedChange={(checked) => handleCheck(checked as boolean)}
            />

            <div className="flex-1">
                {isEditing ? (
                    <div className="flex items-center gap-1">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-7 text-sm"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleNameSubmit();
                                if (e.key === 'Escape') {
                                    setName(subtask.name);
                                    setIsEditing(false);
                                }
                            }}
                            autoFocus
                        />
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleNameSubmit}>
                            <Check className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                            setName(subtask.name);
                            setIsEditing(false);
                        }}>
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor={`subtask-${subtask.id}`}
                            className={cn(
                                "text-sm font-normal text-muted-foreground cursor-pointer flex-1",
                                subtask.is_completed && "line-through opacity-70"
                            )}
                        >
                            {subtask.name}
                        </Label>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
                        >
                            <Pencil className="h-3 w-3 text-muted-foreground" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function AddSubtaskForm({ taskId }: { taskId: number }) {
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (!name.trim()) return;

        router.post(`/tasks/${taskId}/subtasks`, {
            name: name
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setName('');
                setIsAdding(false);
            }
        });
    };

    if (!isAdding) {
        return (
            <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors py-1"
            >
                <Plus className="h-3 w-3" />
                Add Subtask
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2 py-1">
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Subtask name..."
                className="h-7 text-xs flex-1"
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                    if (e.key === 'Escape') setIsAdding(false);
                }}
            />
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSubmit}>
                <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setIsAdding(false)}>
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
}
