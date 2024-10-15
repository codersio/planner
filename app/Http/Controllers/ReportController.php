<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Branch;
use App\Models\Payslip;
use App\Models\Project;
use App\Models\Employee;
use App\Models\Timesheet;
use App\Models\Department;
use App\Exports\ExcelExport;
use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // Get query parameters
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        $projectTitle = $request->query('projectTitle');
        $employeeName = $request->query('employeeName');
        $taskName = $request->query('taskName'); // Get task name from query parameters
        // Set default date range to today if not provided
        if (!$startDate || !$endDate) {
            $startDate = now()->startOfDay()->toDateString(); // Start of today
            $endDate = now()->endOfDay()->toDateString(); // End of today
        }

        // Build the query
        $query = Timesheet::join('users', 'users.id', '=', 'timesheets.user_id')
            ->join('projects', 'projects.id', '=', 'timesheets.project_id')
            ->join('tasks', 'tasks.id', '=', 'timesheets.task_id')
            ->join('task_assigns', 'tasks.id', '=', 'task_assigns.task_id')
            ->select(
                'tasks.task_name',
                'projects.title',
                'timesheets.date',
                'timesheets.time_number',
                'timesheets.description',
                'users.name',
                'task_assigns.employee_hours'
            )
            ->whereBetween('timesheets.date', [$startDate, $endDate]);

        // Apply project title filter if provided
        if ($projectTitle) {
            $query->where('projects.title', 'like', '%' . $projectTitle . '%');
        }

        // Apply employee name filter if provided
        if ($employeeName) {
            $query->where('users.name', 'like', '%' . $employeeName . '%');
        }
        if ($taskName) {
            $query->where('tasks.task_name', 'like', '%' . $taskName . '%');
        }
        // Execute the query and get the results
        $timesheets = $query->distinct()->get();

        // Return the results as JSON
        return response()->json($timesheets);
    }

    public function reportView()
    {
        $user = Auth::user()->name;
        $userss = Auth::user();
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $usrrr = Auth::user()->id;
        $employee = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('users.name')->get();
        $project = Project::all();
        $notif = Auth::user()->notifications;
        $tasks = Task::select('task_name')
            ->groupBy('task_name')
            ->get();
        //dd($tasks);
        return Inertia::render('reports/index', compact('employee', 'project', 'user', 'user_type', 'usrrr', 'notif', 'tasks'));
    }
    public function export(Request $request)
    {
        $sheets = new ExcelExport(json_decode($request->timesheets));
        return Excel::download($sheets, 'report.xlsx');
    }

    public function AssignEmployee()
    {
        $user = Auth::user()->name;
        $userss = Auth::user();
        if ($userss) {
            // Ensure permissions are assigned and fetched correctly
            $user_type = $userss->getAllPermissions()->pluck('name')->toArray();
            // dd($permissions);
        }
        $usrrr = Auth::user()->id;
        $employee = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('users.name')->get();
        $project = Project::all();
        $notif = Auth::user()->notifications;
        $tasks = Task::select('task_name')
            ->groupBy('task_name')
            ->get();
        return Inertia::render('reports/employeehours', compact('project', 'user', 'user_type', 'usrrr', 'employee', 'tasks', 'notif'));
    }

    public function payroll(Request $request)
    {
        $employees = Salary::join('employees','employees.id','=','salaries.employee_id')->join('users','users.id','=','employees.user_id')->get();
        dd($employees);

        // if (Auth::user()->can('manage report')) {
            // $branch = Branch::all();
            // $department = Department::all();
            // $employees = Employee::join('users','users.id','=','employees.user_id')->select('users.id', 'users.name');
            // if (!empty($request->employee_id) && $request->employee_id[0] != 0) {
            //     $employees->where('id', $request->employee_id);
            // }
            // $employees = $employees->where('created_by', Auth::user()->creatorId());

            // $data['branch'] = __('All');
            // $data['department'] = __('All');
            // $filterYear['branch'] = __('All');
            // $filterYear['department'] = __('All');
            // $filterYear['type'] = __('Monthly');
            // $filterYear['dateYearRange'] = '';

            // $payslips = Payslip::join('users', 'payslips.user_id', '=', 'users.id')->select('payslips.*', 'users.name');

            // if ($request->type == 'monthly' && !empty($request->month)) {

            //     $payslips->where('salary_month', $request->month);

            //     $filterYear['dateYearRange'] = date('M-Y', strtotime($request->month));
            //     $filterYear['type'] = __('Monthly');
            // } elseif (!isset($request->type)) {
            //     $month = date('Y-m');

            //     $payslips->where('salary_month', $month);

            //     $filterYear['dateYearRange'] = date('M-Y', strtotime($month));
            //     $filterYear['type'] = __('Monthly');
            // }

            // if ($request->type == 'yearly' && !empty($request->year)) {
            //     $startMonth = $request->year . '-01';
            //     $endMonth = $request->year . '-12';
            //     $payslips->where('salary_month', '>=', $startMonth)->where('salary_month', '<=', $endMonth);

            //     $filterYear['dateYearRange'] = $request->year;
            //     $filterYear['type'] = __('Yearly');
            // }

            // if (!empty($request->branch)) {
            //     $payslips->where('employees.branch_id', $request->branch);

            //     $filterYear['branch'] = !empty(Branch::find($request->branch)) ? Branch::find($request->branch)->name : '';
            // }

            // if (!empty($request->department)) {

            //     $payslips->where('employees.department_id', $request->department);

            //     $filterYear['department'] = !empty(Department::find($request->department)) ? Department::find($request->department)->name : '';
            // }

            // $employee = $employees->get()->pluck('name', 'id')->toArray();

            // $payslips = $payslips->whereIn('users.name', $employee)->get();

            // $totalBasicSalary = $totalNetSalary = $totalAllowance = $totalCommision = $totalLoan = $totalSaturationDeduction = $totalOtherPayment = $totalOverTime = 0;

            // foreach ($payslips as $payslip) {
            //     $totalBasicSalary += $payslip->basic_salary;
            //     $totalNetSalary += $payslip->net_payble;

            //     $allowances = json_decode($payslip->allowance);
            //     foreach ($allowances as $allowance) {
            //         $totalAllowance += $allowance->amount;
            //     }

            //     $commisions = json_decode($payslip->commission);
            //     foreach ($commisions as $commision) {
            //         $totalCommision += $commision->amount;
            //     }

            //     $loans = json_decode($payslip->loan);
            //     foreach ($loans as $loan) {
            //         $totalLoan += $loan->amount;
            //     }

            //     $saturationDeductions = json_decode($payslip->saturation_deduction);
            //     foreach ($saturationDeductions as $saturationDeduction) {
            //         $totalSaturationDeduction += $saturationDeduction->amount;
            //     }

            //     $otherPayments = json_decode($payslip->other_payment);
            //     foreach ($otherPayments as $otherPayment) {
            //         $totalOtherPayment += $otherPayment->amount;
            //     }

            //     $overtimes = json_decode($payslip->overtime);
            //     foreach ($overtimes as $overtime) {
            //         $days = $overtime->number_of_days;
            //         $hours = $overtime->hours;
            //         $rate = $overtime->rate;

            //         $totalOverTime += ($rate * $hours) * $days;
            //     }
            // }

            // $filterData['totalBasicSalary'] = $totalBasicSalary;
            // $filterData['totalNetSalary'] = $totalNetSalary;
            // $filterData['totalAllowance'] = $totalAllowance;
            // $filterData['totalCommision'] = $totalCommision;
            // $filterData['totalLoan'] = $totalLoan;
            // $filterData['totalSaturationDeduction'] = $totalSaturationDeduction;
            // $filterData['totalOtherPayment'] = $totalOtherPayment;
            // $filterData['totalOverTime'] = $totalOverTime;

            // $starting_year = date('Y', strtotime('-5 year'));
            // $ending_year = date('Y', strtotime('+5 year'));

            // $filterYear['starting_year'] = $starting_year;
            // $filterYear['ending_year'] = $ending_year;

            // return view('report\payroll', compact('payslips', 'filterData', 'branch', 'department', 'filterYear'));
            return Inertia::render('reports/payroll');
        // } else {
        //     return redirect()->back()->with('error', __('Permission denied.'));
        // }
    }
}
