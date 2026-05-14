<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MatheusController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'homeindex'])->name('home.index');
Route::get('/pedidos', [HomeController::class, 'pedidosindex'])->name('pedidos.index');
Route::get('/relatorios', [HomeController::class, 'relatoriosindex'])->name('relatorios.index');


Route::get('/loja', fn() => Inertia::render('Loja/LojaIndex'));
Route::get('/lojamaior', fn() => Inertia::render('Loja/LojaMaior'));

// Route::get('/login', [LoginController::class, 'redirectToAuthenticator'])->name('login');
Route::get('/logintoken/{token}/{me}', [LoginController::class, 'logintoken']);
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/produtos', [ProdutoController::class, 'poucos']);

Route::get('/produtos/todos', [ProdutoController::class, 'todos']);


Route::get('/login',[MatheusController::class, 'loginIndex'])->name('login');

Route::group(['prefix' => 'api/v1'], function(){
    include base_path('routes/api/v1/api.php');
});

