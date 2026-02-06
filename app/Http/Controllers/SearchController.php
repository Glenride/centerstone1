<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('query');
        
        if (!$query) {
            return response()->json([]);
        }

        $userId = $request->user()->id;

        // Search Projects
        $projects = \App\Models\Project::where('user_id', $userId)
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            })
            ->limit(5)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'type' => 'Project',
                    'url' => route('projects.show', $project),
                    'project_title' => $project->title,
                ];
            });

        // Search Phases
        $phases = \App\Models\Phase::whereHas('project', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('notes', 'like', "%{$query}%");
            })
            ->with('project')
            ->limit(5)
            ->get()
            ->map(function ($phase) {
                return [
                    'id' => $phase->id,
                    'title' => $phase->name,
                    'type' => 'Phase',
                    'url' => route('projects.show', $phase->project) . "?phase={$phase->id}",
                    'project_title' => $phase->project->title,
                ];
            });

        // Search Tasks
        $tasks = \App\Models\Task::whereHas('phase.project', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('notes', 'like', "%{$query}%");
            })
            ->with('phase.project')
            ->limit(5)
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->name,
                    'type' => 'Task',
                    'url' => route('projects.show', $task->phase->project) . "?task={$task->id}",
                    'project_title' => $task->phase->project->title,
                ];
            });

        // Search Subtasks
        $subtasks = \App\Models\Subtask::whereHas('task.phase.project', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('notes', 'like', "%{$query}%");
            })
            ->with('task.phase.project')
            ->limit(5)
            ->get()
            ->map(function ($subtask) {
                return [
                    'id' => $subtask->id,
                    'title' => $subtask->name,
                    'type' => 'Subtask',
                    'url' => route('projects.show', $subtask->task->phase->project) . "?subtask={$subtask->id}",
                    'project_title' => $subtask->task->phase->project->title,
                ];
            });

        return response()->json([
            ...$projects,
            ...$phases,
            ...$tasks,
            ...$subtasks,
        ]);
    }
}
