<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobListingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
    Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');
    Route::delete('/companies/{company}', [CompanyController::class, 'destroy'])->name('companies.destroy');
    Route::get('/companies/create', [CompanyController::class, 'create'])->name('companies.create');
    Route::get('/companies/{company}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
    Route::put('/companies/{company}', [CompanyController::class, 'update'])->name('companies.update');
    Route::get('/companies/{company}', [CompanyController::class, 'details'])->name('companies.details');

    // Job Listings Routes
    Route::get('/companies/{company}/jobs/create', [JobListingsController::class, 'create'])->name('jobs.create');
    Route::post('/companies/{company}/jobs', [JobListingsController::class, 'store'])->name('jobs.store');
    Route::delete('/jobs/{job}', [JobListingsController::class, 'destroy'])->name('jobs.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
