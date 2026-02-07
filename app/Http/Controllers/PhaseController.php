<?php

namespace App\Http\Controllers;

use App\Models\Phase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PhaseController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Phase $phase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Phase $phase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Phase $phase)
    {
        $this->authorize('update', $phase->project);

        if ($phase->project->status !== 'active') {
            abort(403, 'Project is inactive.');
        }

        $validated = $request->validate([
            'duration' => 'nullable|string|max:255',
            'priority' => 'nullable|string|in:low,medium,high',
            'notes' => 'nullable|string',
        ]);

        $phase->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Phase $phase)
    {
        //
    }
}
