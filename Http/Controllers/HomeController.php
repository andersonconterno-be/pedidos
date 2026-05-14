<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function homeindex()
    {
        if(!Session::has('token')) {

            return Redirect::route('login');
        }
        return Inertia::render('Home/HomeIndex');
    }
}
