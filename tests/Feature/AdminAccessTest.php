<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_all_projects()
    {
        $user1 = User::factory()->create();
        $project1 = Project::create([
            'user_id' => $user1->id,
            'title' => 'User 1 Project',
            'status' => 'active',
        ]);

        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get(route('dashboard'));

        $response->assertSee('User 1 Project');
    }

    public function test_admin_can_view_specific_project()
    {
        $user1 = User::factory()->create();
        $project1 = Project::create([
            'user_id' => $user1->id,
            'title' => 'User 1 Project',
            'status' => 'active',
        ]);

        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get(route('projects.show', $project1));

        $response->assertStatus(200);
    }

    public function test_normal_user_cannot_view_others_project()
    {
        $user1 = User::factory()->create();
        $project1 = Project::create([
            'user_id' => $user1->id,
            'title' => 'User 1 Project',
            'status' => 'active',
        ]);

        $user2 = User::factory()->create();

        $response = $this->actingAs($user2)->get(route('projects.show', $project1));

        $response->assertStatus(403);
    }
}
