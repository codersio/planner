<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DealController extends Controller
{
    public function index(){
        return Inertia::render('deals/index');
    }

    public function create(){
        return Inertia::render('deals/create');
    }

    public function edit(){
        return Inertia::render('deals/edit');
    }
}
