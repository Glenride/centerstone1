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
    notes?: string;
    tasks?: Task[];
};

export type Task = {
    id: number;
    name: string;
    description: string;
    is_completed: boolean;
    notes?: string;
    subtasks?: Subtask[];
};

export type Subtask = {
    id: number;
    name: string;
    is_completed: boolean;
    order: number;
    notes?: string;
};

export type Activity = {
    id: number;
    user_id: number;
    project_id: number;
    subject_type: string;
    subject_id: number;
    description: string;
    changes?: { before: any; after: any } | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
};

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};
