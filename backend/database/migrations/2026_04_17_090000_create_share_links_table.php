<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('share_links', function (Blueprint $table): void {
            $table->id();
            $table->string('resource_type', 40);
            $table->unsignedBigInteger('resource_id')->nullable();
            $table->string('code', 32)->unique();
            $table->string('slug_hint', 160)->nullable();
            $table->string('destination_path', 2048);
            $table->json('destination_query')->nullable();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('image_url', 2048)->nullable();
            $table->json('payload')->nullable();
            $table->foreignId('created_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('creator_ip_hash', 128)->nullable();
            $table->string('creator_user_agent', 1024)->nullable();
            $table->unsignedInteger('visits_count')->default(0);
            $table->timestamp('last_visited_at')->nullable();
            $table->string('last_visitor_ip_hash', 128)->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index(['resource_type', 'resource_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('share_links');
    }
};
