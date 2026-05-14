<?php

use App\Http\Controllers\EntityController;
use App\Http\Controllers\MatheusController;
use App\Http\Controllers\PedidoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/joel', function () {
    $dados = DB::select('select * from produtos limit 10');
    return response()->json($dados, 500);
});

Route::post('/login', [MatheusController::class, 'login']);
Route::post('/logout', [MatheusController::class, 'logout']);

Route::post('/cadastro', [MatheusController::class, 'cadastro']);

Route::post('/esqueci-senha', [MatheusController::class, 'esqueciSenha']);


Route::post('/send-order', [PedidoController::class, 'sendOrder']);

Route::post('/done-order', [PedidoController::class, 'doneOrder']);

Route::post('/finish-order', [PedidoController::class, 'finishOrder']);

Route::post('/return-order', [PedidoController::class, 'returnOrder']);
