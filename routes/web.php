<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ConfirmationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('confirmations.index');
});

Route::get('/confirmar', [ConfirmationController::class, 'index'])->name('confirmations.index');
Route::post('/confirmar', [ConfirmationController::class, 'store'])->name('confirmations.store');
Route::get('/confirmar/sucesso', [ConfirmationController::class, 'success'])->name('confirmations.success');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
