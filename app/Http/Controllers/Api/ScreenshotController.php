<?php

namespace App\Http\Controllers\Api;

use App\Models\Screenshot;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ScreenshotController extends Controller
{
    public function index()
    {
        $all = Screenshot::where('user_id', JWTAuth::parseToken()->authenticate()->id)->get();
        $all = $all->map(function($a){
            $a->path = Storage::disk('public')->url($a->path);
            return $a;
        });
        return response()->json($all);
    }

    public function store(Request $request)
    {
        $file = $request->file('image');
        $path = $file->storeAs('uploads', $file->getClientOriginalName(), 'public');
        Screenshot::create([
            'user_id' => JWTAuth::parseToken()->authenticate()->id,
            'path' => $path
        ]);
        return response()->json(["message" => "Screenshot uploaded successfully!"]);
    }
}
