<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::firstOrCreate([
            'email' => config('admin.email')
        ], [
            'name' => 'admin',
            'email' => config('admin.email'),
            'password' => config('admin.password')
        ]);
    }
}
