<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, update any existing null values to prevent constraint violations if we were making it non-nullable (though we are just setting default)
        DB::table('phases')->whereNull('duration')->update(['duration' => '24 hours']);

        Schema::table('phases', function (Blueprint $table) {
            $table->string('duration')->default('24 hours')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('phases', function (Blueprint $table) {
            $table->string('duration')->nullable()->default(null)->change();
        });
    }
};
