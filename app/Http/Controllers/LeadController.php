<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    // List all leads
    public function index()
    {
        $leads = Lead::all();
        return Inertia::render('Leads/Index', [
            'leads' => $leads,
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('Leads/Create');
    }

    // Store new lead
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            // add other validation rules as needed
        ]);

        Lead::create($request->all());

        return redirect()->route('leads.index');
    }

    // Show edit form
    public function edit(Lead $lead)
    {
        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
        ]);
    }

    // Update existing lead
    public function update(Request $request, Lead $lead)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            // add other validation rules as needed
        ]);

        $lead->update($request->all());

        return redirect()->route('leads.index');
    }

    // Delete a lead
    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()->route('leads.index');
    }
}
