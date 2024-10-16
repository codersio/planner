<?php

namespace App\Http\Controllers;

use App\Models\AccountCategory;
use App\Models\Tax;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function tax()
    {

        $tax = Tax::all();
        return Inertia::render('accounts/tax', compact('tax'));
    }



    // Show the form for creating a new tax
    // public function create()
    // {
    //     return view('taxes.create');
    // }

    // Store a newly created tax in the database
    public function taxstore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
        ]);

        Tax::create($request->all());

        return back()->with('success', 'Tax created successfully.');
    }

    // Show the form for editing an existing tax


    // Update the tax in the database
    public function taxupdate(Request $request, Tax $tax)
    {
        // dd($request->route('tax'));
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'amount' => 'required|numeric',
        // ]);

        $tax->update($request->only(['name', 'amount']));

        return back()->with('success', 'Tax updated successfully.');
    }


    // Delete a tax from the database
    public function taxdestroy(Tax $tax)
    {
        $tax->delete();

        return back()->with('success', 'Tax deleted successfully.');
    }

    public function AccountCategory()
    {
        $category = AccountCategory::all();
        return Inertia::render('accounts/category', compact('category'));
    }

    public function Accountstore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        AccountCategory::create($request->all());

        return redirect()->route('account-categories.index')
            ->with('success', 'Account Category created successfully.');
    }
}
