<?php

namespace App\Console\Commands;

use Database\Seeders\AdminUserSeeder;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('seed:admin')]
#[Description('Create or update the admin user')]
class SeedAdmin extends Command
{
    public function handle(): int
    {
        $this->call(AdminUserSeeder::class);

        $this->info('Admin user seeded successfully.');

        return self::SUCCESS;
    }
}
