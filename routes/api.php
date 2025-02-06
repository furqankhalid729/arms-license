<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeaponController;

Route::middleware('api')->group(function () {
    Route::post('/weapons', [WeaponController::class, 'store'])->name('weapons.store');
    Route::get('/weapons/{weapon}', [WeaponController::class, 'destroy'])->name('weapons.destroy');
    Route::post('/search-cnic', [WeaponController::class, 'searchCNIC'])->name('cnic');
});
