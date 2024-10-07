<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Employee;
use App\Models\Holiday;
use App\Models\holidayAssign;
use App\Models\Timesheet;
use Illuminate\Http\Request;
use App\Models\LeaveManagement;
use App\Notifications\TimesheetUnlockedNotification;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index()
    {
        $user = Auth::user()->name;
        // $employee = User::with('employees')->where('type', 2)->get();
        $employee = User::with(['employees', 'roles'])->where('type', 2)->get();
        // dd($employee);
        $user = Auth::user()->name;
        // $user_type = Auth::user()->id;
        $userss = Auth::user();
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $notif = Auth::user()->notifications;
        return Inertia::render('employee/Employee', compact('user', 'employee', 'user', 'user_type', 'notif'));
    }

    public function create()
    {
        $user = Auth::user()->name;
        $userss = Auth::user();
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $roles = Role::all();
        $notif = Auth::user()->notifications;
        return Inertia::render('employee/create', compact('user', 'user_type', 'roles', 'notif'));
    }

    public function store(Request $request)
    {
        // Define validation rules
        $validatedData = $request->validate([

            'email' => 'required|email|unique:users,email', // Ensure the email is valid and unique in the 'users' table


            'phone' => 'nullable|string|max:10', // Optional field; adjust validation as needed

            'joinning_date' => 'required|date', // Ensure the date is valid
        ]);

        // Create and save the new user
        $user = new User();
        $user->name = $request['name'];
        $user->email = $validatedData['email'];
        $user->type = 2;
        $user->password = bcrypt($request['password']);
        $user->save();

        // Assign the role to the user
        $user->assignRole($request['roleemployee']);

        // Create and save the employee record
        $employee = new Employee();
        $employee->user_id = $user->id;
        $employee->phone = $validatedData['phone'];
        $employee->address = $request['address'];
        $employee->joinning_date = $validatedData['joinning_date'];
        $employee->save();

        // Redirect with a success message
        return redirect()->route('employees')->with('success', 'Employee created successfully.');
    }

    public function edit($id)
    {
        $employee = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('employees.phone', 'employees.address', 'employees.joinning_date', 'users.name', 'users.email', 'users.id', 'users.password')->where('users.id', $id)->first();
        $userss = Auth::user();
        $user = Auth::user()->name;
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $roles = Role::all();
        $employeeRole = $employee->roles()->pluck('name')->first();
        $notif = Auth::user()->notifications;
        return Inertia::render('employee/edit', compact('employee', 'user_type', 'roles', 'employeeRole', 'user', 'notif'));
    }
    public function update(Request $request, $id)
    {
        // dd($id);
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        $employee = Employee::where('user_id', $id)->first();
        $employee->phone = $request->phone;
        $employee->address = $request->address;
        $employee->joinning_date = $request->joinning_date;
        $employee->save();
        if ($request->roleemployee) {
            $user->syncRoles($request->roleemployee);
        }
        return redirect()->route('employees')->with('success', 'Employee updated successfully.');
    }

    public function destroy($id)
    {
        // dd($id);
        $user = User::find($id);
        if (!$user) {
            return redirect()->route('employees')->with('error', 'User not found.');
        }

        // Delete the associated employee(s)
        $employee = Employee::where('user_id', $id)->first();
        if ($employee) {
            $employee->delete();
        }

        // Delete the user
        $user->delete();
        return redirect()->route('employees')->with('success', 'Employee deleted successfully.');
    }

    public function EmployeeIdtime($week, $id)
    {
        // Parse the start date of the week
        $startDate = Carbon::parse($week)->startOfWeek();
        $endDate = Carbon::parse($week)->endOfWeek();

        // Fetch timesheets for the employee in the given date range
        $timesheets = Timesheet::with(['project', 'tasks'])
            ->where('user_id', $id)
            ->whereBetween('date', [$startDate, $endDate])
            ->get();

        // Group timesheets by project_id and task_id
        $groupedTimesheets = $timesheets->groupBy(function ($item) {
            return $item->project_id . '.' . $item->task_id;
        });

        // Format the grouped timesheets
        $result = $groupedTimesheets->map(function ($taskGroup, $projectIdTaskId) {
            $ids = explode('.', $projectIdTaskId);
            if (count($ids) !== 2) {
                \Log::error('Invalid key format', ['key' => $projectIdTaskId]);
                return null;
            }

            list($project_id, $task_id) = $ids;

            // Create entries array where keys are dates and values are time numbers
            $entries = $taskGroup->mapWithKeys(function ($item) {
                return [$item->date => $item->time_number];
            });
            $status = $taskGroup->first()->status;
            return [
                'project_id' => (int) $project_id,
                'task_id' => (int) $task_id,
                'entries' => $entries,
                'status' => $status
            ];
        })->filter()->values();

        // Return the result as JSON
        return response()->json($result);
    }

    public function fetchidwithemployee($id)
    {
        $employee = User::where('id', $id)->first();
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
        $user = Auth::user()->name;
        $userss = Auth::user();
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $notif = Auth::user()->notifications;
        return Inertia::render('dailystatus/employeetime', compact('employee', 'leave', 'user', 'user_type', 'notif'));
    }

    public function Statuschange(Request $request, $id)
    {
        $timesheets = $request->input('timesheets', []);

        foreach ($timesheets as $timesheetData) {
            $project_id = $timesheetData['project_id'] ?? null;
            $task_id = $timesheetData['task_id'] ?? null;
            $user_id = $id;

            if (!$project_id || !$task_id) {
                \Log::warning('Missing project_id or task_id', $timesheetData);
                continue;
            }

            foreach ($timesheetData as $key => $value) {
                if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $key)) {
                    $date = $key;
                    $time_number = $value;

                    \Log::info('Processing timesheet', [
                        'user_id' => $user_id,
                        'project_id' => $project_id,
                        'task_id' => $task_id,
                        'date' => $date,
                        'time_number' => $time_number,
                    ]);

                    // Retrieve the existing timesheet for the given project, task, and date
                    $existingTimesheet = Timesheet::where('project_id', $project_id)
                        ->where('task_id', $task_id)
                        ->where('date', $date)
                        ->where('user_id', $user_id)
                        ->first();

                    if ($existingTimesheet) {
                        // Update the existing timesheet
                        $existingTimesheet->update([
                            'time_number' => $time_number,
                            'status' => '0', // Unlocked
                            'is_approved' => '3',
                        ]);

                        // Send notification to the user about the timesheet unlock
                        $user = User::find($user_id); // Assuming you want to notify the user
                        $userName = Auth::user()->name; // Get the name of the user who made the changes
                        $user->notify(new TimesheetUnlockedNotification($existingTimesheet, $userName));
                    } else {
                        // Create a new timesheet entry
                        $newTimesheet = Timesheet::create([
                            'project_id' => $project_id,
                            'task_id' => $task_id,
                            'date' => $date,
                            'time_number' => $time_number,
                            'user_id' => $user_id,
                            'status' => '1', // Assuming status is needed
                            'is_approved' => '3', // Assuming status is needed
                        ]);
                    }
                }
            }
        }

        return back();
    }




    public function ApproveStatuschange(Request $request, $id)
    {
        // Log the incoming request data
        // dd($request->all());



        $timesheets = $request->input('timesheets', []);

        foreach ($timesheets as $timesheetData) {
            $project_id = $timesheetData['project_id'] ?? null;
            $task_id = $timesheetData['task_id'] ?? null;
            $user_id = $id;

            if (!$project_id || !$task_id) {
                \Log::warning('Missing project_id or task_id', $timesheetData);
                continue;
            }

            foreach ($timesheetData as $key => $value) {
                if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $key)) {
                    $date = $key;
                    $time_number = $value;

                    \Log::info('Processing timesheet', [
                        'user_id' => $user_id,
                        'project_id' => $project_id,
                        'task_id' => $task_id,
                        'date' => $date,
                        'time_number' => $time_number,
                    ]);

                    // Retrieve the existing timesheet for the given project, task, and date
                    $existingTimesheet = Timesheet::where('project_id', $project_id)
                        ->where('task_id', $task_id)
                        ->where('date', $date)
                        ->where('user_id', $user_id)
                        ->first();

                    if ($existingTimesheet) {
                        // Update the existing timesheet
                        $existingTimesheet->update([
                            'time_number' => $time_number,
                            'is_approved' => '1',
                        ]);
                    } else {
                        // Create a new timesheet entry
                        Timesheet::create([
                            'project_id' => $project_id,
                            'task_id' => $task_id,
                            'date' => $date,
                            'time_number' => $time_number,
                            'user_id' => $user_id,
                            'is_approved' => '1', // Assuming status is needed, you can adjust accordingly
                        ]);
                    }
                }
            }
        }

        return back();
    }


    public function RejectStatuschange(Request $request, $id)
    {
        // Log the incoming request data
        // dd($request->all());



        $timesheets = $request->input('timesheets', []);

        foreach ($timesheets as $timesheetData) {
            $project_id = $timesheetData['project_id'] ?? null;
            $task_id = $timesheetData['task_id'] ?? null;
            $user_id = $id;

            if (!$project_id || !$task_id) {
                \Log::warning('Missing project_id or task_id', $timesheetData);
                continue;
            }

            foreach ($timesheetData as $key => $value) {
                if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $key)) {
                    $date = $key;
                    $time_number = $value;

                    \Log::info('Processing timesheet', [
                        'user_id' => $user_id,
                        'project_id' => $project_id,
                        'task_id' => $task_id,
                        'date' => $date,
                        'time_number' => $time_number,
                    ]);

                    // Retrieve the existing timesheet for the given project, task, and date
                    $existingTimesheet = Timesheet::where('project_id', $project_id)
                        ->where('task_id', $task_id)
                        ->where('date', $date)
                        ->where('user_id', $user_id)
                        ->first();

                    if ($existingTimesheet) {
                        // Update the existing timesheet
                        $existingTimesheet->update([
                            'time_number' => $time_number,
                            'is_approved' => '0',
                        ]);
                    } else {
                        // Create a new timesheet entry
                        Timesheet::create([
                            'project_id' => $project_id,
                            'task_id' => $task_id,
                            'date' => $date,
                            'time_number' => $time_number,
                            'user_id' => $user_id,
                            'is_approved' => '0', // Assuming status is needed, you can adjust accordingly
                        ]);
                    }
                }
            }
        }

        return back();
    }



    public function holidayAssignd($id)
    {
        $empl = User::join('employees', 'employees.user_id', '=', 'users.id')->select('users.id', 'users.name')->where('users.id', $id)->first();
        $user = Auth::user()->name;
        $userss = Auth::user();
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $notif = Auth::user()->notifications;

        $holidays = Holiday::all();
        $assignments = holidayAssign::join('users', 'users.id', '=', 'holiday_assigns.employee_id')
            ->join('holidays', 'holidays.id', '=', 'holiday_assigns.holiday_id')

            ->select('users.name', 'holiday_assigns.id', 'holidays.name as title')->where('holiday_assigns.employee_id', $id)->get();
        return Inertia::render('holiday/assignEmployee', compact('empl', 'userss', 'notif', 'user', 'holidays', 'assignments', 'user_type'));
    }


    public function EmployeeAssignallocate() {}
}
