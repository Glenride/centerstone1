<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\RecordsActivity;

class Task extends Model
{
    use HasFactory, RecordsActivity;

    protected $fillable = ['phase_id', 'name', 'description', 'is_completed', 'notes', 'order'];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function phase(): BelongsTo
    {
        return $this->belongsTo(Phase::class);
    }

    public function subtasks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Subtask::class)->orderBy('order');
    }
}
