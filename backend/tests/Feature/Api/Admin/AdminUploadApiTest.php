<?php

namespace Tests\Feature\Api\Admin;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminUploadApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_upload_media_to_uploads_disk(): void
    {
        $this->seed(DatabaseSeeder::class);

        Storage::fake('uploads');
        Sanctum::actingAs(User::query()->findOrFail(1));

        $response = $this->post('/api/v1/admin/uploads', [
            'file' => UploadedFile::fake()->image('pizza.png', 800, 600),
            'directory' => 'products',
        ], [
            'Accept' => 'application/json',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.disk', 'uploads');

        $path = $response->json('data.path');

        $this->assertIsString($path);
        Storage::disk('uploads')->assertExists($path);
    }

    public function test_upload_endpoint_rejects_unsupported_files_and_forbids_regular_customers(): void
    {
        $this->seed(DatabaseSeeder::class);

        Storage::fake('uploads');

        $customer = User::query()->where('username', 'democustomer')->firstOrFail();
        Sanctum::actingAs($customer);

        $this->post('/api/v1/admin/uploads', [
            'file' => UploadedFile::fake()->image('customer.png', 200, 200),
            'directory' => 'products',
        ], [
            'Accept' => 'application/json',
        ])->assertForbidden();

        Sanctum::actingAs(User::query()->findOrFail(1));

        $this->post('/api/v1/admin/uploads', [
            'file' => UploadedFile::fake()->create('shell.php', 5, 'application/x-php'),
            'directory' => 'products',
        ], [
            'Accept' => 'application/json',
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['file']);
    }
}
