<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use App\Models\User;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function redirectToAuthenticator(Request $request)
    {
        $baseURL = $request->getSchemeAndHttpHost();
        $urlPrimaria = env('URL_LOGIN') . '/login/' . env('TOKEN_SYS'). '/';
        return redirect()->to( $urlPrimaria . base64_encode($baseURL . '/logintoken/') );
    }

    public function logintoken($token, $me)
    {
        try {

            $client = new Client();

            $response = $client->request('GET', base64_decode($me), [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ],
            ]);

            $statusCode = $response->getStatusCode();
            $responseData = $response->getBody()->getContents();

            $userData = json_decode($responseData, true);

            Auth::login(User::where('erpusb_usuario_id', $userData['UsersId'])->first());

            return redirect('/home');
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function logout()
    {
        Session::flush();
        return redirect('/login');
    }
}
