<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesignatonController extends Controller
{
    public function index()
    {
        $designations = Designation::all();
        return Inertia::render('employee/designation', [
            'designations' => $designations,
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('Designations/Create');
    }

    // Store new designation
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:designations,name',
        ]);

        Designation::create($request->all());
        return back()->with('success', 'Designation created successfully.');
    }

    // Show edit form
    public function edit(Designation $designation)
    {
        return Inertia::render('Designations/Edit', [
            'designation' => $designation,
        ]);
    }

    // Update designation
    public function update(Request $request, Designation $designation)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:designations,name,' . $designation->id,
        ]);

        $designation->update($request->all());
        return back()->with('success', 'Designation updated successfully.');
    }

    // Delete designation
    public function destroy(Designation $designation)
    {
        $designation->delete();
        return redirect()->route('designations.index')->with('success', 'Designation deleted successfully.');
    }
}
