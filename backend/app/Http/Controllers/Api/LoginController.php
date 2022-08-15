<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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

        return Auth::user();
    }

    /**
     * @throws ValidationException
     */
    public function loginStudent(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);
//        echo !Auth::guard('student')->attempt($credentials);
        if (!Auth::guard('student')->attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => [
                    __('auth.failed')
                ]
            ]);
        }
        return Auth::guard('student')->user();
    }

    public function loginAdmin(Request $request)
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

        if (!Auth::user()->admin) {
            Auth::logout();
            return response()
                ->json(['message' => 'Is not admin!'])
                ->withCallback($request->input('callback'));
            return 'Is not admin!';
        }

        return Auth::user();
    }

    public function logout()
    {
        return Auth::logout();
    }
}
