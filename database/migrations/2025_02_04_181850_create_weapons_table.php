<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weapons', function (Blueprint $table) {
            $table->id();
            $table->string('applicant_name');
            $table->string('father_name');
            $table->string('license_no')->unique();
            $table->string('weapon_type');
            $table->string('caliber')->nullable();
            $table->string('weapon_no')->nullable();
            $table->string('cartridges')->nullable();
            $table->string('status');
            $table->date('issue_date');
            $table->date('expiry_date');
            $table->string('applicant_image_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weapons');
    }
};
