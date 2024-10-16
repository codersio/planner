<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\LeadStage;
use Illuminate\Http\Request;

class LeadStageController extends Controller
{
    public function index()
    {
        $leadStages = LeadStage::all();

        return Inertia::render('leads/leadstage', [
            'leadStages' => $leadStages
        ]);
    }

    // Store a newly created lead stage in storage
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        LeadStage::create($request->all());

        return redirect()->route('leadstages.index')->with('success', 'Lead stage created successfully');
    }

    // Update the specified lead stage in storage
    public function update(Request $request, LeadStage $leadStage)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $leadStage->update($request->all());

        return redirect()->route('leadstages.index')->with('success', 'Lead stage updated successfully');
    }

    // Remove the specified lead stage from storage
    public function destroy(LeadStage $leadStage)
    {
        $leadStage->delete();

        return redirect()->route('leadstages.index')->with('success', 'Lead stage deleted successfully');
    }
}
