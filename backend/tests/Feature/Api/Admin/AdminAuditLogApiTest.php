<?php

namespace Tests\Feature\Api\Admin;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminAuditLogApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_view_audit_logs_for_settings_import_reset_and_upload_actions(): void
    {
        $this->seed(DatabaseSeeder::class);
        Storage::fake('uploads');
        Sanctum::actingAs(User::query()->findOrFail(1));

        $this->patchJson('/api/v1/admin/settings/features', [
            'values' => [
                'gift_cards_enabled' => false,
                'email_notifications_enabled' => true,
            ],
        ])->assertOk();

        $this->post('/api/v1/admin/uploads', [
            'file' => UploadedFile::fake()->image('audit.png'),
            'directory' => 'audits',
        ], [
            'Accept' => 'application/json',
        ])->assertCreated();

        $this->postJson('/api/v1/admin/settings/import', [
            'groups' => [
                'general' => [
                    'site_name' => 'Audit Restaurant',
                ],
            ],
        ])->assertOk();

        $this->postJson('/api/v1/admin/settings/branding/reset')
            ->assertOk();

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'settings.group.updated',
            'actor_id' => 1,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'upload.created',
            'actor_id' => 1,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'settings.import.completed',
            'actor_id' => 1,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'settings.group.reset',
            'actor_id' => 1,
        ]);

        $this->getJson('/api/v1/admin/audit-logs')
            ->assertOk()
            ->assertJsonPath('data.0.actor.id', 1);
    }
}
