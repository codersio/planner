<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Holiday;
use Illuminate\Http\Request;
use App\Models\LeaveManagement;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    public function index(Request $request)
    {

        $user = Auth::user()->name;
        $user_type = Auth::user()->id;
        // dd($request->all());
        $leave = LeaveManagement::join('users', 'users.id', '=', 'leave_management.employee_id')
            ->join('leave_types', 'leave_types.id', '=', 'leave_management.leave_type_id')
            ->select(
                'users.name',
                'leave_management.sdate',
                'leave_management.reason',
                'leave_management.remark',
                'leave_management.edate',
                'leave_management.status',
                'leave_types.type_name',
                'leave_management.created_at',
                'leave_management.id'
            )->first();
        $holiday = Holiday::all(['start_date', 'end_date']);
        // dd($holiday);
        // dd($leave);
        return Inertia::render('Test', compact('leave', 'user', 'user_type', 'holiday'));
    }
}
