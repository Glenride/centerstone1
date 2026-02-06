<?php

namespace App\Traits;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait RecordsActivity
{
    /**
     * Boot the trait.
     */
    protected static function bootRecordsActivity()
    {
        if (auth()->guest()) return;

        foreach (static::getActivitiesToRecord() as $event) {
            static::$event(function ($model) use ($event) {
                $model->recordActivity($event);
            });
        }
    }

    /**
     * Get events to record.
     */
    protected static function getActivitiesToRecord()
    {
        return ['created', 'updated', 'deleted'];
    }

    /**
     * Record activity for the model.
     */
    protected function recordActivity($event)
    {
        if ($this->wasChanged('updated_at') && count($this->getDirty()) === 1) {
             // Ignore simple touch timestamps
             return;
        }

        ActivityLog::create([
            'user_id' => Auth::id() ?? 1, // Fallback for seeding/testing
            'project_id' => $this->getProjectId(),
            'subject_type' => get_class($this),
            'subject_id' => $this->id,
            'description' => $this->getActivityDescription($event),
            'changes' => $event === 'updated' ? $this->getActivityChanges() : null,
        ]);
    }

    /**
     * Get the description of the activity.
     */
    protected function getActivityDescription($event)
    {
        $class = class_basename($this);
        return "{$event}_{$class}";
    }

    /**
     * Get the changes that were made.
     */
    protected function getActivityChanges()
    {
        // Only get entries that changed, excluding 'updated_at'
        $changes = [];
        foreach ($this->getDirty() as $key => $value) {
            if ($key !== 'updated_at') {
                $changes['before'][$key] = $this->getOriginal($key);
                $changes['after'][$key] = $value;
            }
        }
        return count($changes) > 0 ? $changes : null;
    }

    /**
     * Resolve the project ID for the model.
     */
    public function getProjectId()
    {
        if ($this instanceof \App\Models\Project) {
            return $this->id;
        }

        if (method_exists($this, 'project')) {
            return $this->project_id;
        }

        if ($this instanceof \App\Models\Phase) {
             return $this->project_id;
        }

        if ($this instanceof \App\Models\Task) {
            return $this->phase->project_id;
        }

        if ($this instanceof \App\Models\Subtask) {
            return $this->task->phase->project_id;
        }
        
        return null;
    }
}
