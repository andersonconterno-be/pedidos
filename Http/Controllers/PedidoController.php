<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Kreait\Firebase\Contract\Auth;
use Kreait\Firebase\Contract\Database;
use Kreait\Firebase\Exception\FirebaseException;

class PedidoController extends Controller
{
    //
    function cadastro(Request $request, Auth $auth){
        try{
            $auth->createUser([
                'email' => $request->input('login'),
                'password' => $request->input('password'),
                'displayName' => $request->input('nome')
            ]);

            return response()->json(['message' => 'Usuário criado com sucesso'], 201);
        } catch (FirebaseException $e) {
            return response()->json(['error' => $e->getMessage()], 400);

        }


    }

    function login(Request $request, Auth $auth){

        try{

            $signInResult = $auth->signInWithEmailAndPassword($request->input('login'),$request->input('password'));
            $idToken = $signInResult->idToken();
            Session::put('token', $idToken);

            return response()->json(['message' => 'Login realizado com sucesso', 'token' => $idToken], 200);

        }catch (FirebaseException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

    }

    function logout(Request $request){
        dd('logout');
    }

    function loginIndex() {

        if(Session::has('token')) {
            return Redirect::route('home.index');
        }

        return Inertia::render('Login/LoginIndex');
    }

    function esqueciSenha(Request $request, Auth $auth){
        try {

            $auth->sendPasswordResetLink($request->input('login'));

        } catch (FirebaseException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    function sendOrder (Request $request, Database $database){

        $nome = $request->input('nome');
        $sabores = $request->input('sabores');
        $dados = [
            'nome' => $nome,
            'sabores' => $sabores,
            'timestamp' => now()->toDateTimeString(),
            'status' => 'recebido'
        ];

        $database->getReference('pedidos')->push($dados);

        return response()->json(['message' => 'Pedido enviado com sucesso'], 200);
    }

    function doneOrder(Request $request, Database $database){
        $id = $request->input('firebaseKey');
        $database->getReference('pedidos/' . $id)->update(['status' => 'pronto']);
        return response()->json(['message' => 'Pedido marcado como pronto'], 200);
    }

    function finishOrder(Request $request, Database $database){
        $id = $request->input('firebaseKey');
        $database->getReference('pedidos/' . $id)->update(['status' => 'entregue']);
        return response()->json(['message' => 'Pedido marcado como entregue'], 200);
    }

    function returnOrder(Request $request, Database $database){
        $id = $request->input('firebaseKey');
        $database->getReference('pedidos/' . $id)->update(['status' => 'recebido']);
        return response()->json(['message' => 'Pedido marcado como recebido'], 200);
    }
}
