<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\RecordsActivity;

class Subtask extends Model
{
    use RecordsActivity;
    protected $fillable = ['task_id', 'name', 'is_completed', 'order', 'notes'];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
