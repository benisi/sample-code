<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PostController::class, 'allPost'])->name('home');

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', [PostController::class, 'userPost'])->name('dashboard');
    Route::post('/posts', [PostController::class, 'storePost'])->name('storePost');
});

require __DIR__ . '/auth.php';
