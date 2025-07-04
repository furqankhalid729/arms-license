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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->string('cnic');
            $table->string('license_number');
            $table->string('driver_name');
            $table->string('father_name');
            $table->string('allowed_vehicles');
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('license_type')->nullable();
            $table->date('issue_date');
            $table->date('valid_from');
            $table->date('valid_to');
            $table->string('applicant_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
