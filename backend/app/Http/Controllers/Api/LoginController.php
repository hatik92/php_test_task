<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Nette\Schema\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => [
                    __('auth.failed')
                ]
            ]);
        }

        return $request->user();
    }

    public function logout()
    {
        return Auth::logout();
    }
}
