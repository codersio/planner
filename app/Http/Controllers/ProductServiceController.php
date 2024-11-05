<?php

namespace App\Http\Controllers;

use App\Models\ProductService;
use App\Models\Unit;
use App\Models\Tax;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ProductServiceController extends Controller
{

    public function index()
    {
        $products = ProductService::all();
        $unit = Unit::all();
        $tax = Tax::all();
        return Inertia::render('product/index', compact('products', 'unit', 'tax'));
    }
    // Create
    public function store(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'tax_id' => 'required|string',
            'purchase_price' => 'required|numeric',
            'unit_id' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg', // Validate image file
            'sku' => 'required|'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images'), $imageName); // Move to public/images directory
            $validatedData['image'] = 'images/' . $imageName; // Save path to database
        }

        ProductService::create($validatedData);
        return response()->json(['message' => 'Product service created successfully']);
    }

    // Edit
    public function update(Request $request, $id)
    {
        $productService = ProductService::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'tax_id' => 'required|string',
            'purchase_price' => 'required|numeric',
            'unit_id' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'sku' => 'required|string|unique:product_services,sku,' . $productService->id,
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($productService->image && File::exists(public_path($productService->image))) {
                File::delete(public_path($productService->image));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            $validatedData['image'] = 'images/' . $imageName;
        }

        $productService->update($validatedData);
        return response()->json(['message' => 'Product service updated successfully']);
    }

    // Delete
    public function destroy($id)
    {
        $productService = ProductService::findOrFail($id);

        // Delete the associated image if it exists
        if ($productService->image && File::exists(public_path($productService->image))) {
            File::delete(public_path($productService->image));
        }

        $productService->delete();
        return response()->json(['message' => 'Product service deleted successfully']);
    }
}
