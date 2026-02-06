<?php

namespace App\Services;

class ProjectTemplates
{
    public static function getTemplates(): array
    {
        return [
            'ip_commercialization' => [
                'name' => 'IP Commercialization (Default)',
                'description' => 'The standard Centerstone flow for patenting and commercializing IP.',
                'phases' => self::getIpCommercializationPhases(),
            ],
            'standard' => [
                'name' => 'Standard Project Management',
                'description' => 'Classic 5-phase project management lifecycle.',
                'phases' => [
                    [
                        'name' => 'Phase 1: Initiation',
                        'description' => 'Define the project goals and feasibility.',
                        'tasks' => [
                            ['name' => 'Define Project Charter'],
                            ['name' => 'Identify Stakeholders'],
                            ['name' => 'Feasibility Study'],
                        ]
                    ],
                    [
                        'name' => 'Phase 2: Planning',
                        'description' => 'Outline the scope, timeline, and resources.',
                        'tasks' => [
                            ['name' => 'Create WBS (Work Breakdown Structure)'],
                            ['name' => 'Develop Schedule'],
                            ['name' => 'Resource Allocation'],
                            ['name' => 'Risk Management Plan'],
                        ]
                    ],
                    [
                        'name' => 'Phase 3: Execution',
                        'description' => 'Deliverables are built and presented.',
                        'tasks' => [
                            ['name' => 'Kick-off Meeting'],
                            ['name' => 'Team Onboarding'],
                            ['name' => 'Deliverable Creation'],
                        ]
                    ],
                    [
                        'name' => 'Phase 4: Monitoring & Control',
                        'description' => 'Track progress and adjust as needed.',
                        'tasks' => [
                            ['name' => 'Status Reporting'],
                            ['name' => 'Budget Tracking'],
                            ['name' => 'Quality Assurance'],
                        ]
                    ],
                    [
                        'name' => 'Phase 5: Closure',
                        'description' => 'Finalize and hand off the project.',
                        'tasks' => [
                            ['name' => 'Final Deliverable Handoff'],
                            ['name' => 'Post-Mortem / Retrospective'],
                            ['name' => 'Archive Documentation'],
                        ]
                    ],
                ]
            ],
            'agile' => [
                'name' => 'Agile Software Development',
                'description' => 'Iterative development flow for software projects.',
                'phases' => [
                    [
                        'name' => 'Sprint 0: Inception',
                        'description' => 'Setup and initial backlog creation.',
                        'tasks' => [
                            ['name' => 'Product Vision Workshop'],
                            ['name' => 'Initial Backlog Creation'],
                            ['name' => 'Environment Setup'],
                        ]
                    ],
                    [
                        'name' => 'Sprint 1: MVP Features',
                        'description' => 'First iteration of core features.',
                        'tasks' => [
                            ['name' => 'Sprint Planning'],
                            ['name' => 'Development'],
                            ['name' => 'Code Review'],
                            ['name' => 'Sprint Review & Retrospective'],
                        ]
                    ],
                    [
                        'name' => 'Sprint 2: Enhancements',
                        'description' => 'Refining and adding secondary features.',
                        'tasks' => [
                            ['name' => 'Sprint Planning'],
                            ['name' => 'Development'],
                            ['name' => 'Testing'],
                        ]
                    ],
                    [
                        'name' => 'Release & Deployment',
                        'description' => 'Getting the software to production.',
                        'tasks' => [
                            ['name' => 'UAT (User Acceptance Testing)'],
                            ['name' => 'Production Deployment'],
                            ['name' => 'Smoke Testing'],
                        ]
                    ],
                ]
            ],
            'content' => [
                'name' => 'Content Creation Pipeline',
                'description' => 'Workflow for producing and publishing content.',
                'phases' => [
                    [
                        'name' => 'Phase 1: Ideation & Strategy',
                        'description' => 'Brainstorming topics and keywords.',
                        'tasks' => [
                            ['name' => 'Keyword Research'],
                            ['name' => 'Topic Selection'],
                            ['name' => 'Brief Creation'],
                        ]
                    ],
                    [
                        'name' => 'Phase 2: Drafting',
                        'description' => 'Writing the actual content.',
                        'tasks' => [
                            ['name' => 'First Draft'],
                            ['name' => 'Self-Edit'],
                        ]
                    ],
                    [
                        'name' => 'Phase 3: Review & Edit',
                        'description' => 'Quality control and refinements.',
                        'tasks' => [
                            ['name' => 'Peer Review'],
                            ['name' => 'SEO Optimization Check'],
                            ['name' => 'Final Polish'],
                        ]
                    ],
                    [
                        'name' => 'Phase 4: Publishing & Promotion',
                        'description' => 'Going live and distributing.',
                        'tasks' => [
                            ['name' => 'Upload to CMS'],
                            ['name' => 'Social Media Blasts'],
                            ['name' => 'Email Newsletter Inclusion'],
                        ]
                    ],
                ]
            ],
            'blank' => [
                'name' => 'Blank Project',
                'description' => 'Start from scratch with no pre-defined phases.',
                'phases' => [],
            ],
        ];
    }

    private static function getIpCommercializationPhases(): array
    {
        return [
            [
                'name' => 'Phase 1: Invention Evaluation',
                'description' => 'Complete the initial evaluation questionnaire. DISCLAIMER: No AI was used to generate or process anything information in this questionnaire. All responses will be saved in their respective Google Drive locations outside of Centerstone operations.',
                'tasks' => [
                    ['name' => 'Task 1.1: Complete Evaluation Form', 'description' => 'Fill out the Invention Evaluation Questionnaire here: https://forms.gle/wzqujPHzJk3ZsKeJ6'],
                ]
            ],
            [
                'name' => 'Phase 2: The Deep Dive (Prior Art & Strategy)',
                'description' => 'Confirm the "gut check" from Phase 1 with hard data before spending significantly on legal fees.',
                'tasks' => [
                    [
                        'name' => 'Task 2.1: Professional Prior Art Search',
                        'description' => 'Move beyond Google. Use USPTO, WIPO, and specialized databases to find existing patents that might block you.',
                        'subtasks' => [
                            'Search USPTO database for similar keywords',
                            'Search WIPO/PCT database for international filings',
                            'Review referenced patents in top 3 closest matches',
                        ]
                    ],
                    [
                        'name' => 'Task 2.2: Competitive Landscape Analysis',
                        'description' => 'Identify who would actually buy this patent (potential acquirers) or who you are competing against.',
                        'subtasks' => [
                            'List top 5 potential competitors',
                            'Identify potential licensees/acquirers',
                            'Analyze competitor pricing and feature sets',
                        ]
                    ],
                    [
                        'name' => 'Task 2.3: The "White Space" Definition',
                        'description' => 'Clearly define what makes your invention different from the prior art.',
                        'subtasks' => [
                            'Draft "Problem/Solution" statement',
                            'List 3 unique technical differentiators',
                        ]
                    ],
                ]
            ],
            [
                'name' => 'Phase 3: Technical Crystallization',
                'description' => 'Move from "Idea" to "Invention." You cannot patent a vague concept; you must patent a specific implementation.',
                'tasks' => [
                    [
                        'name' => 'Task 3.1: Technical Diagrams & Flowcharts',
                        'description' => 'Create the standard engineering drawings required for a patent application.',
                        'subtasks' => [
                            'Create system architecture diagram',
                            'Draft data flow diagrams',
                            'Review diagrams with technical lead',
                        ]
                    ],
                    [
                        'name' => 'Task 3.2: The "Enablement" Write-up',
                        'description' => 'Write a detailed description that would allow a "person skilled in the art" to build your invention.',
                        'subtasks' => [
                            'Draft detailed description of the invention',
                            'Document "best mode" of implementation',
                            'Review for clarity and completeness',
                        ]
                    ],
                    [
                        'name' => 'Task 3.3: Prototype/MVP Development',
                        'description' => 'Build a functional version (physical or software) to prove the concept works as described.',
                        'subtasks' => [
                            'Build core functional prototype',
                            'Test key features',
                            'Refine based on initial tests',
                        ]
                    ],
                ]
            ],
            [
                'name' => 'Phase 4: IP Protection (The Filing)',
                'description' => 'Secure your priority date ("Pending" status) to stop the clock on competitors.',
                'tasks' => [
                    [
                        'name' => 'Task 4.1: Provisional Patent Application (PPA)',
                        'description' => 'File a lower-cost, informal application to secure an early filing date.',
                        'subtasks' => [
                            'Prepare cover sheet',
                            'Format specification and drawings',
                            'File via USPTO EFS-Web',
                        ]
                    ],
                    [
                        'name' => 'Task 4.2: Patent Pending Status',
                        'description' => 'Officially mark your documents and marketing materials as "Patent Pending."',
                        'subtasks' => [
                            'Update marketing materials',
                            'Add "Patent Pending" notice to website',
                            'Track filing date',
                        ]
                    ],
                    [
                        'name' => 'Task 4.3: Non-Disclosure Agreements (NDAs)',
                        'description' => 'Prepare specific NDAs for any partners or developers you bring on board.',
                        'subtasks' => [
                            'Draft standard Mutual NDA',
                            'Create One-way NDA template',
                            'Review with legal counsel',
                        ]
                    ],
                ]
            ],
            [
                'name' => 'Phase 5: Valuation & Market Testing',
                'description' => 'Prove the invention has monetary value (essential for acquisition).',
                'tasks' => [
                    [
                        'name' => 'Task 5.1: Customer Validation',
                        'description' => 'Discreetly test the market interest using the "Patent Pending" status as a shield.',
                        'subtasks' => [
                            'Conduct 10 customer interviews',
                            'Analyze feedback',
                            'Adjust value proposition',
                        ]
                    ],
                    [
                        'name' => 'Task 5.2: Valuation Model',
                        'description' => 'Estimate the revenue potential. If you plan to sell/license, you need to know what the IP is worth.',
                        'subtasks' => [
                            'Research comparable exits',
                            'Build DCF model',
                            'Estimate TAM/SAM/SOM',
                        ]
                    ],
                    [
                        'name' => 'Task 5.3: The "Sell Sheet"',
                        'description' => 'Create a one-page overview for potential licensees or acquirers.',
                        'subtasks' => [
                            'Draft key benefits',
                            'Design visual layout',
                            'Create PDF one-pager',
                        ]
                    ],
                ]
            ],
            [
                'name' => 'Phase 6: Finalization (The Fork in the Road)',
                'description' => 'Decide whether to build a business or sell the asset.',
                'tasks' => [
                    [
                        'name' => 'Option A: The Asset Sale (Acquisition)',
                        'description' => 'Pitch the Commercialization Dossier to identified companies.',
                        'subtasks' => [
                            'Identify potential acquirers',
                            'Prepare data room',
                            'Outreach to target list',
                        ]
                    ],
                    [
                        'name' => 'Option B: Full Patent & Launch',
                        'description' => 'Convert the Provisional Application into a Non-Provisional Utility Patent.',
                        'subtasks' => [
                            'Review PPA deadline (12 months)',
                            'Hire patent attorney',
                            'Draft non-provisional application',
                        ]
                    ],
                ]
            ],
        ];
    }
}
