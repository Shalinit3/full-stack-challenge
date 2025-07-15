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
        Schema::table('job_listings', function (Blueprint $table) {
            $table->string('title');
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->text('description');
            $table->string('contactEmail');
            $table->string('contactPhone');
            $table->string('contactFormUrl')->nullable();
            $table->foreign('company_id')
              ->references('id')->on('companies')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_listings', function (Blueprint $table) {
        $table->dropForeign(['company_id']);
        $table->foreign('company_id')
              ->references('id')->on('companies')
              ->onDelete('restrict');
        $table->dropColumn('title');
        $table->dropColumn('description');
        $table->dropColumn('contactEmail');
        $table->dropColumn('contactPhone');
        $table->dropColumn('contactFormUrl');
        });
    }
};
