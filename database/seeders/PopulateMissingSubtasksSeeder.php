<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PopulateMissingSubtasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasksData = [
            'Task 3.1: Technical Diagrams & Flowcharts' => [
                'Create system architecture diagram',
                'Draft data flow diagrams',
                'Review diagrams with technical lead',
            ],
            'Task 3.2: The "Enablement" Write-up' => [
                'Draft detailed description of the invention',
                'Document "best mode" of implementation',
                'Review for clarity and completeness',
            ],
            'Task 3.3: Prototype/MVP Development' => [
                'Build core functional prototype',
                'Test key features',
                'Refine based on initial tests',
            ],
            'Task 4.1: Provisional Patent Application (PPA)' => [
                'Prepare cover sheet',
                'Format specification and drawings',
                'File via USPTO EFS-Web',
            ],
            'Task 4.2: Patent Pending Status' => [
                'Update marketing materials',
                'Add "Patent Pending" notice to website',
                'Track filing date',
            ],
            'Task 4.3: Non-Disclosure Agreements (NDAs)' => [
                'Draft standard Mutual NDA',
                'Create One-way NDA template',
                'Review with legal counsel',
            ],
            'Task 5.1: Customer Validation' => [
                'Conduct 10 customer interviews',
                'Analyze feedback',
                'Adjust value proposition',
            ],
            'Task 5.2: Valuation Model' => [
                'Research comparable exits',
                'Build DCF model',
                'Estimate TAM/SAM/SOM',
            ],
            'Task 5.3: The "Sell Sheet"' => [
                'Draft key benefits',
                'Design visual layout',
                'Create PDF one-pager',
            ],
            'Option A: The Asset Sale (Acquisition)' => [
                'Identify potential acquirers',
                'Prepare data room',
                'Outreach to target list',
            ],
            'Option B: Full Patent & Launch' => [
                'Review PPA deadline (12 months)',
                'Hire patent attorney',
                'Draft non-provisional application',
            ],
        ];

        foreach ($tasksData as $taskName => $subtasks) {
            $tasks = \App\Models\Task::where('name', $taskName)->get();
            foreach ($tasks as $task) {
                // Check if subtasks already exist to avoid duplication
                if ($task->subtasks()->count() > 0) {
                    continue;
                }

                foreach ($subtasks as $index => $subtaskName) {
                    $task->subtasks()->create([
                        'name' => $subtaskName,
                        'is_completed' => false,
                        'order' => $index,
                    ]);
                }
            }
        }
    }
}
