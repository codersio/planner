<?php



namespace App\Http\Controllers;

use App\Models\ProductService;
use App\Models\Tax;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class QuotationController extends Controller
{
    protected $user_image;


    // Fetch list of clients
    public function index()
    {

        $data = DB::table('tbl_quotation')
            ->join('users', 'tbl_quotation.customer_id', '=', 'users.id')
            ->select('tbl_quotation.*', 'users.name')
            ->get();
        // dd($data);

        return Inertia::render('quotation/index', compact('data'));
    }


    // Fetch archived clients
    public function archiveclient()
    {
        $data = DB::table('tbl_user')
            ->where('role', 'client')
            ->where('is_archive', 1)
            ->get();
        return Inertia::render('quotation/archiveclient', compact('data'));
    }

    // Delete client
    public function destroy($id)
    {
        DB::table('tbl_user')->where('user_id', $id)->delete();
        session()->flash('success', 'Client Record Deleted Successfully');
        return redirect()->route('Quotation.index');
    }
    public function addarchive($id)
    {
        DB::table('tbl_user')->where('user_id', $id)->update(['is_archive' => 1]); // 1 for active status
        session()->flash('success', 'Client is now archive Successfully');
        return redirect()->route('Quotation.index');
    }

    public function edit($id)
    {
        $qt = DB::table('tbl_quotation')->where('quotation_id', $id)->first();
        $qt_acc = DB::table('quatation_account_tax')->join('taxes', 'taxes.name', '=', 'quatation_account_tax.tax_name')->where('quatation_account_tax.quation_id', $id)->select('taxes.id as tax_id', 'tax as tax_value', 'tax_name')->get()->toArray();
        $qt_his = DB::table('tbl_quotation_history')->where('quotation_id', $id)->select('item_name as product_id', 'price', 'qty as p_qty', DB::raw('qty * price as amount'))->get()->toArray();
        $taxOptions = DB::table('taxes')->first();
        $customer_dets = DB::table('users')->join('clients', 'clients.user_id', '=', 'users.id')->get();
        return Inertia::render('quotation/edit', compact('customer_dets', 'taxOptions', 'qt', 'qt_acc', 'qt_his'));
    }

    public function getproduct()
    {
        $product = ProductService::all();
        return response()->json($product, Response::HTTP_OK);
    }
    // Add a new Quotation
    public function create(Request $request)
    {
        $last_record = DB::table('tbl_quotation')->orderBy('quotation_id', 'desc')->first();
        $client_idf = 'Q' . $last_record->quotation_id . rand(11, 99) . date('mY');
        $client_idf2 = (object)[
            'value' => $client_idf,

        ];
        $taxOptions = DB::table('taxes')->get();
        $products = ProductService::all();
        // dd($taxOptions);
        $customer_dets = DB::table('clients')->join('users', 'users.id', '=', 'clients.user_id')->get();


        return Inertia::render('quotation/create', compact('client_idf2', 'customer_dets', 'taxOptions', 'products'));
    }
    public function gettaxoptions()
    {
        $product = Tax::all();
        return response()->json($product, Response::HTTP_OK);
    }
    public function getCustomer($id)
    {
        $customer_details = DB::table('clients')->join('users', 'users.id', '=', 'clients.user_id')->where('user_id', $id)->first();

        // Check if the service partner exists
        if (!$customer_details) {
            return response()->json(['message' => 'Custoemr not found'], 404);
        }

        // Return the service partner details as JSON
        return response()->json($customer_details);
    }
    public function store(Request $request)
    {
        // dd($request->all());

        $request->validate([
            'quotation_no' => 'required|string|max:255',
            'quotation_date' => 'required|date',
            'customer_name' => 'required|string|max:255',
            'customer_details' => 'required',
            'mobile_no' => 'required|string|max:15',
            'email' => 'required|email',
            'status' => 'required|in:0,1,2', // Adjust as needed for your status options
            'Billing_address' => 'required|string',
            'message' => 'nullable|string',

        ]);
        $quotationId = DB::table('tbl_quotation')->insertGetId([
            'quotation_no' => $request->quotation_no,
            'quotation_date' => $request->quotation_date,
            'customer_id' => $request->customer_details,
            'mobile' => $request->mobile_no,
            'email' => $request->email,
            'status' => $request->status,
            'subject' => '',
            'address' => $request->Billing_address,
            'message' => $request->message,
        ]);

        foreach ($request->product_details as $product) {
            DB::table('tbl_quotation_history')->insert([
                'quotation_id' => $quotationId,
                'item_name' => $product['product_id'],
                'qty' => $product['p_qty'],
                'price' => $product['price'],
                'net_amount' => $product['amount'],
                'create_date' => now(),
            ]);
        }
        if (!empty($request->tax_details)) {
            foreach ($request->tax_details as $tax) {
                DB::table('quatation_account_tax')->insert([
                    'quation_id' => $quotationId,
                    'tax_name' => $tax['tax_name'],
                    'tax' => $tax['tax_value'],
                ]);
            }
        }

        // Redirect with a success message
        return redirect()->route('Quotation.index');
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'quotation_no' => 'required',
            'quotation_date' => 'required',
            'customer_name' => 'required',
            'customer_details' => 'required',
            'mobile_no' => 'required',
            'email' => 'required|email',
            'status' => 'required', // Adjust as needed for your status options
            'Billing_address' => 'required',
            'message' => 'nullable',
            'product_details' => 'required|array',
            'product_details.*.product_id' => 'required',
            'product_details.*.p_qty' => 'required',
            'product_details.*.price' => 'required',
            'product_details.*.amount' => 'required',
            'tax_details' => 'nullable|array',
            'tax_details.*.tax_id' => 'required',
            'tax_details.*.tax_value' => 'required',
            'tax_details.*.tax_name' => 'required',
        ]);

        // Update the main quotation details
        DB::table('tbl_quotation')->where('quotation_id', $id)->update([
            'quotation_no' => $request->quotation_no,
            'quotation_date' => $request->quotation_date,
            'customer_id' => $request->customer_details,
            'mobile' => $request->mobile_no,
            'email' => $request->email,
            'status' => $request->status,
            'subject' => '', // Update as needed
            'address' => $request->Billing_address,
            'message' => $request->message,
        ]);

        // Delete old product details for this quotation
        DB::table('tbl_quotation_history')->where('quotation_id', $id)->delete();

        // Insert new product details
        foreach ($request->product_details as $product) {
            DB::table('tbl_quotation_history')->insert([
                'quotation_id' => $id,
                'item_name' => $product['product_id'],
                'qty' => $product['p_qty'],
                'price' => $product['price'],
                'net_amount' => $product['amount'],
                'create_date' => now(),
            ]);
        }

        // Delete old tax details for this quotation
        DB::table('quatation_account_tax')->where('quation_id', $id)->delete();

        // Insert new tax details if they exist
        if (!empty($request->tax_details)) {
            foreach ($request->tax_details as $tax) {
                DB::table('quatation_account_tax')->insert([
                    'quation_id' => $id,
                    'tax_name' => $tax['tax_name'],
                    'tax' => $tax['tax_value'],
                ]);
            }
        }

        // Redirect with a success message
        return redirect()->route('Quotation.index');
    }

    public function Print($id)
    {
        $user = Auth::user();

        $data = DB::table('tbl_quotation')
            ->join('users', 'tbl_quotation.customer_id', '=', 'users.id')
            ->join('clients', 'clients.user_id', '=', 'users.id')
            ->select('tbl_quotation.*', 'users.name', 'users.email', 'clients.address', 'clients.phone')
            ->where('tbl_quotation.quotation_id', $id)
            ->first();
        // dd($data);

        $products = DB::table('tbl_quotation_history')
            ->join('product_services', 'tbl_quotation_history.item_name', '=', 'product_services.id')
            ->select('tbl_quotation_history.qty', 'tbl_quotation_history.price', 'tbl_quotation_history.net_amount', 'product_services.name')
            ->where('tbl_quotation_history.quotation_id', $id)
            ->get();

        $totalAmount = $products->sum('net_amount');

        return Inertia::render('quotation/print', [
            'data' => $data,
            'user' => $user,
            'products' => $products,
            'totalAmount' => $totalAmount,
        ]);
    }
}
