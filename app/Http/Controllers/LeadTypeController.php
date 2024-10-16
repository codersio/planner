<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\LeadType;
use Illuminate\Http\Request;

class LeadTypeController extends Controller
{
    // Display a listing of the lead types
    public function index()
    {
        $leadTypes = LeadType::orderBy('created_at', 'desc')->get();

        return Inertia::render('leads/leadtype', [
            'leadTypes' => $leadTypes
        ]);
    }

    // Show the form for creating a new lead type
    public function create()
    {
        return Inertia::render('LeadTypes/Create');
    }

    // Store a newly created lead type in storage
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        LeadType::create($request->all());

        return redirect()->route('leadtypes.index')->with('success', 'Lead type created successfully');
    }

    // Show the form for editing the specified lead type
    public function edit(LeadType $leadtype)
    {
        return Inertia::render('LeadTypes/Edit', [
            'leadtype' => $leadtype
        ]);
    }

    // Update the specified lead type in storage
    public function update(Request $request, LeadType $leadtype)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $leadtype->update($request->all());

        return redirect()->route('leadtypes.index')->with('success', 'Lead type updated successfully');
    }

    // Remove the specified lead type from storage
    public function destroy(LeadType $leadtype)
    {
        $leadtype->delete();

        return redirect()->route('leadtypes.index')->with('success', 'Lead type deleted successfully');
    }
}
