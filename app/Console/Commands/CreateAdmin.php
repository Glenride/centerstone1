<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new super admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating a new Super Admin user...');

        $name = $this->ask('Name');
        $email = $this->ask('Email Address');
        
        while (User::where('email', $email)->exists()) {
            $this->error('User with this email already exists.');
            if (!$this->confirm('Do you want to try a different email?')) {
                return;
            }
            $email = $this->ask('Email Address');
        }

        $password = $this->secret('Password');
        $confirmPassword = $this->secret('Confirm Password');

        while ($password !== $confirmPassword) {
            $this->error('Passwords do not match.');
            $password = $this->secret('Password');
            $confirmPassword = $this->secret('Confirm Password');
        }

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', Password::defaults()],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            return;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
            'role' => 'admin',
        ]);

        $this->info("Super Admin user [{$user->email}] created successfully without 403 errors!");
    }
}
