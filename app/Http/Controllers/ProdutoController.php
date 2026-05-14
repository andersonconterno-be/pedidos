<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProdutoController extends Controller
{
    public function poucos(Request $request): JsonResponse
    {
        $query = DB::table('produtos');

        return response()->json($query->orderBy('nome')->limit(10)->get());
    }

    public function todos(Request $request): JsonResponse
    {
        $query = DB::table('produtos');

        if ($request->filled('q')) {
            $query->where('nome', 'like', '%' . $request->q . '%');
        }

        return response()->json($query->orderBy('nome')->get());
    }
}
