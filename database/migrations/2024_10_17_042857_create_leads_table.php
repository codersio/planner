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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('subject');
            $table->string('link')->nullable();
            $table->string('socials')->nullable();
            $table->foreignId('lead_source_id')->nullable()->constrained('lead_sources')->cascadeOnDelete();
            $table->foreignId('lead_type_id')->nullable()->constrained('lead_types')->cascadeOnDelete();
            $table->foreignId('lead_stage_id')->nullable()->constrained('lead_stages')->cascadeOnDelete();
            $table->string('sources')->nullable();
            $table->string('products')->nullable();
            $table->date('follow_up')->nullable();
            $table->boolean('is_active')->nullable();
            $table->boolean('is_converted')->nullable();
            $table->text('notes')->nullable();
            $table->text('labels')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
