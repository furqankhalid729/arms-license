<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeaponController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});
Route::get('/search-cnic', function () {
    return Inertia::render('Home');
});
Route::post('/search-cnic', [WeaponController::class, 'searchCNIC'])->name('cnic');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [WeaponController::class, 'index'])->name('dashboard');
    Route::get('/weapons/create', [WeaponController::class, 'create'])->name('weapons.create');
    Route::get('/weapons/{weapon}/edit', [WeaponController::class, 'edit'])->name('weapons.edit');
    Route::put('/weapons/{weapon}', [WeaponController::class, 'update'])->name('weapons.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
