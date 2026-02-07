<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_project()
    {
        $user = User::factory()->create([
            'role' => 'admin',
            'email' => 'testadmin@example.com',
        ]);

        $response = $this->actingAs($user)
            ->post('/projects', [
                'title' => 'Test Project',
                'description' => 'A test project',
                'template' => 'ip_commercialization'
            ]);

        if ($response->status() === 403) {
            echo "\n\nFAILED: 403 Forbidden\n";
            echo $response->content();
        } else {
            echo "\n\nSUCCESS: Status " . $response->status();
        }

        // Clean up
        $user->projects()->delete();
        $user->delete();

        $response->assertStatus(302); // Redirects to dashboard on success
    }
}
