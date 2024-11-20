<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function index(){
        return Inertia::render('Contract/index');
    }

    public function create(){
        return Inertia::render('Contract/create');
    }

    public function edit(){
        return Inertia::render('Contract/edit');
    }
}