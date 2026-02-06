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
        static::created(function ($project) {
            $project->createPhasesFromTemplate();
        });
    }

    /**
     * Generate standard phases and tasks for a new project.
     */
    public function createPhasesFromTemplate()
    {
        // Phase 1: Invention Evaluation (Google Form)
        $p1 = $this->phases()->create([
            'name' => 'Phase 1: Invention Evaluation',
            'description' => 'Complete the initial evaluation questionnaire. DISCLAIMER: No AI was used to generate or process anything information in this questionnaire. All responses will be saved in their respective Google Drive locations outside of Centerstone operations.',
            'status' => 'in_progress',
            'order' => 0,
        ]);
        $p1->tasks()->create(['name' => 'Task 1.1: Complete Evaluation Form', 'description' => 'Fill out the Invention Evaluation Questionnaire here: https://forms.gle/wzqujPHzJk3ZsKeJ6', 'order' => 1]);

        // Phase 2: The Deep Dive
        $p2 = $this->phases()->create([
            'name' => 'Phase 2: The Deep Dive (Prior Art & Strategy)',
            'description' => 'Confirm the "gut check" from Phase 1 with hard data before spending significantly on legal fees.',
            'status' => 'pending', // Changed to pending since Phase 1 is now first
            'order' => 1,
        ]);
        
        $t2_1 = $p2->tasks()->create(['name' => 'Task 2.1: Professional Prior Art Search', 'description' => 'Move beyond Google. Use USPTO, WIPO, and specialized databases to find existing patents that might block you.', 'order' => 1]);
        $t2_1->subtasks()->createMany([
            ['name' => 'Search USPTO database for similar keywords', 'order' => 1],
            ['name' => 'Search WIPO/PCT database for international filings', 'order' => 2],
            ['name' => 'Review referenced patents in top 3 closest matches', 'order' => 3],
        ]);

        $t2_2 = $p2->tasks()->create(['name' => 'Task 2.2: Competitive Landscape Analysis', 'description' => 'Identify who would actually buy this patent (potential acquirers) or who you are competing against.', 'order' => 2]);
        $t2_2->subtasks()->createMany([
            ['name' => 'List top 5 potential competitors', 'order' => 1],
            ['name' => 'Identify potential licensees/acquirers', 'order' => 2],
            ['name' => 'Analyze competitor pricing and feature sets', 'order' => 3],
        ]);

        $t2_3 = $p2->tasks()->create(['name' => 'Task 2.3: The "White Space" Definition', 'description' => 'Clearly define what makes your invention different from the prior art.', 'order' => 3]);
        $t2_3->subtasks()->createMany([
            ['name' => 'Draft "Problem/Solution" statement', 'order' => 1],
            ['name' => 'List 3 unique technical differentiators', 'order' => 2],
        ]);

        // Phase 3: Technical Crystallization
        $p3 = $this->phases()->create([
            'name' => 'Phase 3: Technical Crystallization',
            'description' => 'Move from "Idea" to "Invention." You cannot patent a vague concept; you must patent a specific implementation.',
            'order' => 2,
        ]);
        // Simple creation for tasks without specific subtasks yet, can be expanded later
        $p3->tasks()->createMany([
            ['name' => 'Task 3.1: Technical Diagrams & Flowcharts', 'description' => 'Create the standard engineering drawings required for a patent application.', 'order' => 1],
            ['name' => 'Task 3.2: The "Enablement" Write-up', 'description' => 'Write a detailed description that would allow a "person skilled in the art" to build your invention.', 'order' => 2],
            ['name' => 'Task 3.3: Prototype/MVP Development', 'description' => 'Build a functional version (physical or software) to prove the concept works as described.', 'order' => 3],
        ]);

        // Phase 4: IP Protection
        $p4 = $this->phases()->create([
            'name' => 'Phase 4: IP Protection (The Filing)',
            'description' => 'Secure your priority date ("Pending" status) to stop the clock on competitors.',
            'order' => 3,
        ]);
        $p4->tasks()->createMany([
            ['name' => 'Task 4.1: Provisional Patent Application (PPA)', 'description' => 'File a lower-cost, informal application to secure an early filing date.', 'order' => 1],
            ['name' => 'Task 4.2: Patent Pending Status', 'description' => 'Officially mark your documents and marketing materials as "Patent Pending."', 'order' => 2],
            ['name' => 'Task 4.3: Non-Disclosure Agreements (NDAs)', 'description' => 'Prepare specific NDAs for any partners or developers you bring on board.', 'order' => 3],
        ]);

        // Phase 5: Valuation & Market Testing
        $p5 = $this->phases()->create([
            'name' => 'Phase 5: Valuation & Market Testing',
            'description' => 'Prove the invention has monetary value (essential for acquisition).',
            'order' => 4,
        ]);
        $p5->tasks()->createMany([
            ['name' => 'Task 5.1: Customer Validation', 'description' => 'Discreetly test the market interest using the "Patent Pending" status as a shield.', 'order' => 1],
            ['name' => 'Task 5.2: Valuation Model', 'description' => 'Estimate the revenue potential. If you plan to sell/license, you need to know what the IP is worth.', 'order' => 2],
            ['name' => 'Task 5.3: The "Sell Sheet"', 'description' => 'Create a one-page overview for potential licensees or acquirers.', 'order' => 3],
        ]);

        // Phase 6: Finalization
        $p6 = $this->phases()->create([
            'name' => 'Phase 6: Finalization (The Fork in the Road)',
            'description' => 'Decide whether to build a business or sell the asset.',
            'order' => 5,
        ]);
        $p6->tasks()->createMany([
            ['name' => 'Option A: The Asset Sale (Acquisition)', 'description' => 'Pitch the Commercialization Dossier to identified companies.', 'order' => 1],
            ['name' => 'Option B: Full Patent & Launch', 'description' => 'Convert the Provisional Application into a Non-Provisional Utility Patent.', 'order' => 2],
        ]);
    }
}
