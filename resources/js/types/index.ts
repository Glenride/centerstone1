export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type Project = {
    id: number;
    title: string;
    description: string;
    status: string;
    phases?: Phase[];
    created_at: string;
};

export type Phase = {
    id: number;
    name: string;
    description: string;
    status: string;
    duration?: string;
    priority?: 'low' | 'medium' | 'high';
    tasks?: Task[];
};

export type Task = {
    id: number;
    name: string;
    description: string;
    is_completed: boolean;
    subtasks?: Subtask[];
};

export type Subtask = {
    id: number;
    name: string;
    is_completed: boolean;
    order: number;
};

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};
