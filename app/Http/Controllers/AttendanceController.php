<?php

namespace App\Http\Controllers;

use App\Models\Attendace;
use App\Models\Attendance;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $user = \Auth::user()->name;
        $userss = \Auth::user();
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $notif = \Auth::user()->notifications;
        return Inertia::render('attendance/index', compact('user', 'userss', 'user_type'));
    }

    public function create()
    {
        $employees = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('users.name', 'users.id')->get();
        return Inertia::render('attendance/create', [
            'employees' => $employees,
        ]);
    }

    // Store a new attendance record
    public function store(Request $request)
    {
        // dd($request->all());
        // $request->validate([
        //     'employee_id' => 'required|exists:employees,id',
        //     'date' => 'required|date',
        //     'in_time' => 'nullable|date_format:H:i',
        //     'out_time' => 'nullable|date_format:H:i|after:in_time',
        // ]);

        Attendance::create($request->all());



        return redirect()->route('attendances.index')->with('success', 'Attendance recorded successfully.');
    }

    // Show the form to edit an existing attendance record
    public function edit(Attendance $attendance)
    {
        $employees = Employee::all();
        return Inertia::render('Attendances/Edit', [
            'attendance' => $attendance,
            'employees' => $employees,
        ]);
    }

    // Update an existing attendance record
    public function update(Request $request, Attendance $attendance)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date',
            'in_time' => 'nullable|date_format:H:i',
            'out_time' => 'nullable|date_format:H:i|after:in_time',
        ]);

        $attendance->update($request->all());

        return redirect()->route('attendances.index')->with('success', 'Attendance updated successfully.');
    }

    // Delete an attendance record
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();
        return redirect()->route('attendances.index')->with('success', 'Attendance deleted successfully.');
    }
}
