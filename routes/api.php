<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeaponController;

Route::middleware('api')->group(function () {
    Route::post('/drivers', [WeaponController::class, 'store'])->name('weapons.store');
    Route::get('/driver/{weapon}', [WeaponController::class, 'destroy'])->name('weapons.destroy');
});
