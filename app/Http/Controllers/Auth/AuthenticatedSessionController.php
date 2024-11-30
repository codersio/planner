<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Location;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // use Illuminate\Support\Facades\Log;

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $user = Auth::user();
        $request->session()->regenerate();

        // if ($user) {
        //     $lc = new Location();
        //     $lc->user_id = $user->id;
        //     $lc->latitude = $request->latitude;
        //     $lc->longitude = $request->longitude;
        //     $lc->address = $request->address;
        //     $lc->save();
        // }
        // Logging the user type with detailed information
        Log::info('User authenticated:', ['id' => $user->id, 'type' => $user->type]);

        if ($user->type == 1) {
            return redirect()->route('dashboard');
        } elseif ($user->type == 2) {

            return redirect('dashboard');
        } else {

            return redirect()->route('defaultRoute'); // Replace 'defaultRoute' with your actual default route
        }
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
