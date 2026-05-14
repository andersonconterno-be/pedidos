<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Kreait\Firebase\Contract\Auth;
use Kreait\Firebase\Contract\Database;
use Kreait\Firebase\Exception\FirebaseException;

class MatheusController extends Controller
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

    function sendMessage(Request $request, Database $database){

        $message = $request->input('message');
        $dados = [
            'message' => $message,
            'timestamp' => now()->toDateTimeString(),
            'img' => 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png'
        ];

        $database->getReference('chat')->push($dados);

        return response()->json(['message' => 'Mensagem enviada com sucesso'], 200);
    }
}
