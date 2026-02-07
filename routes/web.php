<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', [App\Http\Controllers\ProjectController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::resource('projects', App\Http\Controllers\ProjectController::class)
    ->middleware(['auth', 'verified']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::patch('/phases/{phase}', [App\Http\Controllers\PhaseController::class, 'update'])->name('phases.update');
    Route::patch('/tasks/{task}', [App\Http\Controllers\TaskController::class, 'update'])->name('tasks.update');
    Route::post('/tasks/{task}/subtasks', [App\Http\Controllers\SubtaskController::class, 'store'])->name('subtasks.store');
    Route::patch('/subtasks/{subtask}', [App\Http\Controllers\SubtaskController::class, 'update'])->name('subtasks.update');
    Route::get('/search', [App\Http\Controllers\SearchController::class, 'index'])->name('search');
});

require __DIR__.'/settings.php';

Route::get('/debug-project-creation', function () {
    $user = \Illuminate\Support\Facades\Auth::loginUsingId(1); // Force login as admin (ID 1)
    
    if (!$user) {
        return 'Could not log in as user ID 1';
    }

    echo "Logged in as: " . $user->name . " (" . $user->email . ")<br>";
    echo "Role: " . $user->role . "<br>";
    echo "Email Verified At: " . $user->email_verified_at . "<br>";
    
    // Check for Policy
    $policy = \Illuminate\Support\Facades\Gate::getPolicyFor(\App\Models\Project::class);
    echo "Project Policy: " . ($policy ? get_class($policy) : 'None') . "<br>";

    // Check Gate abilities
    echo "Can create project? " . (\Illuminate\Support\Facades\Gate::allows('create', \App\Models\Project::class) ? 'YES' : 'NO') . "<br>";

    // Try to create project manually
    try {
        $project = \App\Models\Project::create([
            'user_id' => $user->id,
            'title' => 'Debug Project ' . time(),
            'description' => 'Created via debug route',
            'status' => 'active',
        ]);
        echo "SUCCESS: Project created with ID " . $project->id;
    } catch (\Exception $e) {
        echo "ERROR: " . $e->getMessage() . "<br>";
        echo "Trace: <pre>" . $e->getTraceAsString() . "</pre>";
    }
});
