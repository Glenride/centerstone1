<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubtaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Task $task)
    {
        $this->authorize('update', $task->phase->project);

        if ($task->phase->project->status !== 'active') {
            abort(403, 'Project is inactive.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $task->subtasks()->create([
            'name' => $validated['name'],
            'is_completed' => false,
            'order' => $task->subtasks()->max('order') + 1,
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Subtask $subtask)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subtask $subtask)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subtask $subtask)
    {
        if ($subtask->task->phase->project->user_id !== Auth::id()) {
            abort(403);
        }

        if ($subtask->task->phase->project->status !== 'active') {
            abort(403, 'Project is inactive.');
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'is_completed' => 'sometimes|boolean',
            'notes' => 'nullable|string',
        ]);

        $subtask->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subtask $subtask)
    {
        //
    }
}
