<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'description', 'status'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function phases(): HasMany
    {
        return $this->hasMany(Phase::class)->orderBy('order');
    }

    /**
     * Boot the model.
     */
    protected static function booted()
    {
        // Removed automatic phase creation in favor of explicit controller call
    }

    /**
     * Generate standard phases and tasks for a new project.
     */
    /**
     * Generate standard phases and tasks for a new project.
     */
    public function createPhasesFromTemplate(string $templateKey = 'ip_commercialization')
    {
        $templates = \App\Services\ProjectTemplates::getTemplates();
        
        $template = $templates[$templateKey] ?? $templates['ip_commercialization'];
        $phases = $template['phases'] ?? [];

        foreach ($phases as $index => $phaseData) {
            $phase = $this->phases()->create([
                'name' => $phaseData['name'],
                'description' => $phaseData['description'] ?? null,
                'status' => $index === 0 ? 'in_progress' : 'locked',
                'order' => $index,
            ]);

            foreach ($phaseData['tasks'] as $taskIndex => $taskData) {
                $task = $phase->tasks()->create([
                    'name' => $taskData['name'],
                    'description' => $taskData['description'] ?? null,
                    'order' => $taskIndex,
                ]);

                if (isset($taskData['subtasks']) && is_array($taskData['subtasks'])) {
                    foreach ($taskData['subtasks'] as $subtaskIndex => $subtaskName) {
                        $task->subtasks()->create([
                            'name' => $subtaskName,
                            'order' => $subtaskIndex,
                        ]);
                    }
                }
            }
        }
    }
}
