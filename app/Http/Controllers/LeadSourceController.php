<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\LeadSource;
use Illuminate\Http\Request;

class LeadSourceController extends Controller
{
    public function index()
    {
        $sources = LeadSource::orderBy('created_at', 'desc')->get();

        return Inertia::render('leads/source', [
            'sources' => $sources
        ]);
    }

    // Store a newly created source in storage
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        LeadSource::create($request->all());

        return redirect()->route('sources.index')->with('success', 'Source created successfully');
    }

    // Update the specified source in storage
    public function update(Request $request, LeadSource $source)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $source->update($request->all());

        return redirect()->route('sources.index')->with('success', 'Source updated successfully');
    }

    // Remove the specified source from storage
    public function destroy(LeadSource $source)
    {
        $source->delete();

        return redirect()->route('sources.index')->with('success', 'Source deleted successfully');
    }
}
