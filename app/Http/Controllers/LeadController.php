<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(){
        return Inertia::render('lead/index');
    }

    public function create(){
        return Inertia::render('lead/create');
    }

    public function edit(){
        return Inertia::render('lead/edit');
    }
}
