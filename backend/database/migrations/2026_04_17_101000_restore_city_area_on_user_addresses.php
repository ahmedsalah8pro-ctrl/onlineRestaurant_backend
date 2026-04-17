<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('user_addresses')) {
            return;
        }

        Schema::table('user_addresses', function (Blueprint $table) {
            if (! Schema::hasColumn('user_addresses', 'city')) {
                $table->string('city')->nullable()->after('country');
            }

            if (! Schema::hasColumn('user_addresses', 'area')) {
                $table->string('area')->nullable()->after('city');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('user_addresses')) {
            return;
        }

        Schema::table('user_addresses', function (Blueprint $table) {
            if (Schema::hasColumn('user_addresses', 'area')) {
                $table->dropColumn('area');
            }

            if (Schema::hasColumn('user_addresses', 'city')) {
                $table->dropColumn('city');
            }
        });
    }
};
