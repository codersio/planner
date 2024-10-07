<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RolsAndPermission;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TimesheetController;
use App\Http\Controllers\DailyStatusController;
use App\Http\Controllers\HolidayWorkController;
use App\Http\Controllers\LeaveManagementController;
use App\Http\Controllers\NotificationAllController;
use Flasher\Prime\Test\Constraint\NotificationCount;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::middleware('check_permission')->group(function () {


        Route::get('/', [AdminController::class, 'index']);
        Route::get('/employees', [EmployeeController::class, 'index'])->name('employees');
        Route::get('/employees-create', [EmployeeController::class, 'create'])->name('employees-create');
        Route::post('/employees-store', [EmployeeController::class, 'store']);
        Route::get('/employees-edit/{id}', [EmployeeController::class, 'edit'])->name('employees-edit');
        Route::post('/employees-update/{id}', [EmployeeController::class, 'update']);
        Route::get('/employees-destroy/{id}', [EmployeeController::class, 'destroy']);
        Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
        Route::get('/projects-create', [ProjectController::class, 'create']);
        Route::post('/projects-store', [ProjectController::class, 'store']);
        Route::get('/projects-edit/{id}', [ProjectController::class, 'edit']);
        Route::post('/projects-update/{id}', [ProjectController::class, 'update']);
        Route::get('/projects-delete/{id}', [ProjectController::class, 'destroy']);
        Route::get('/projects-show/{id}', [ProjectController::class, 'show']);



        Route::get('/projects-task', [ProjectController::class, 'Task']);
        Route::get('/task-create/', [ProjectController::class, 'taskCreate']);



        Route::get('/task-category/', [ProjectController::class, 'Tskcategory']);










        Route::get('/leave-type', [LeaveManagementController::class, 'leavType']);
        Route::post('/leave-store', [LeaveManagementController::class, 'leaveStore']);
        Route::post('/leave-update/{id}', [LeaveManagementController::class, 'leaveUpdate']);



        Route::get('/leave-index', [LeaveManagementController::class, 'leave']);
        Route::get('/leave-create', [LeaveManagementController::class, 'leavecreate']);



        Route::get('/leave-store-edit/{id}', [LeaveManagementController::class, 'leaveEdit']);



        Route::get('/holi-day', [TimesheetController::class, 'Holidayindex']);
        Route::post('/holi-store', [TimesheetController::class, 'Holiday']);

        Route::post('/task-update/{id}', [ProjectController::class, 'Taskupdate']);

        Route::get('/task-delete/{id}', [ProjectController::class, 'Taskdestroy']);
    });

    Route::post('/timesheets-status', [TimesheetController::class, 'Statuschange']);
    Route::get('/getProjectTasks', [DailyStatusController::class, 'getProjectTasks'])->name('getProjectTasks');
    Route::post('/leave-approve/{id}', [LeaveManagementController::class, 'leaveStatusApprove']);
    Route::post('/leave-reject/{id}', [LeaveManagementController::class, 'leaveStatusReject']);
    Route::post('/leave-store-data', [LeaveManagementController::class, 'leavestoredata']);
    Route::post('/leave-store-update/{id}', [LeaveManagementController::class, 'leaveUpdatePost']);
    Route::get('/leave-store-delete/{id}', [LeaveManagementController::class, 'leaveDeletes']);
    Route::post('/holi-update/{id}', [TimesheetController::class, 'HolidayUpdate']);
    Route::get('/holi-delete/{id}', [TimesheetController::class, 'DeleteHoliday']);
    Route::get('/holidays', [ReportController::class, 'reportView']);
    Route::get('/holidays-fetch', [TimesheetController::class, 'Holidayfetch']);
    Route::get('/task-edit/{id}', [ProjectController::class, 'Taskedit']);
    Route::get('/daily-status', [DailyStatusController::class, 'index'])->name('daily-status');
    Route::get('/timesheetemp/{week}/{id}', [EmployeeController::class, 'EmployeeIdtime']);
    Route::get('/timesheetemp-employee/{id}', [EmployeeController::class, 'fetchidwithemployee']);
    Route::post('/timesheetemp-employee-status/{id}', [EmployeeController::class, 'Statuschange']);
    Route::get('/holiday-assign/{id}', [EmployeeController::class, 'holidayAssignd']);
    Route::post('/assign-holiday-work', [HolidayWorkController::class, 'store']);
    Route::put('/update-holiday-work/{id}', [HolidayWorkController::class, 'update']);
    Route::delete('/delete-holiday-work/{id}', [HolidayWorkController::class, 'destroy']);
});
Route::post('/task-category-store/', [ProjectController::class, 'TaskcategoryStore']);

Route::get('/task-category-delete/{id}', [ProjectController::class, 'TaskcategoryDestroy']);
// Route::get('projects', [AdminController::class, 'countProject']);
Route::get('/project-task-assign', [ProjectController::class, 'Taskassign']);
Route::post('/project-task-status/{id}', [ProjectController::class, 'changestatus']);
Route::get('/reports', [ReportController::class, 'index']);
Route::get('/reports-get', [ReportController::class, 'reportView'])->name('reports-get');
Route::post('/task-store', [ProjectController::class, 'taskStore']);
Route::get('/timesheets/{week}', [TimesheetController::class, 'index']);

Route::get('/timesheets/{timesheet}', [TimesheetController::class, 'show']);
Route::put('/timesheets/{timesheet}', [TimesheetController::class, 'update']);
Route::delete('/timesheets/{timesheet}', [TimesheetController::class, 'destroy']);
Route::get('/leave-delete/{id}', [LeaveManagementController::class, 'leaveDelete']);
Route::get('/roles-permission', [RolsAndPermission::class, 'Permmissions']);
Route::post('/roles-permission-store', [RolsAndPermission::class, 'store']);
Route::get('/roles-permission-details', [RolsAndPermission::class, 'Roles']);
Route::get('/roles-permission-edit/{id}', [RolsAndPermission::class, 'edit']);
Route::post('/roles-permission-update/{id}', [RolsAndPermission::class, 'update']);
Route::get('/dashboard', [AdminController::class, 'Dashboard'])->name('dashboard');
Route::get('/unauthorized', [RolsAndPermission::class, 'unauthorized'])->name('unauthorized');
Route::get('notif', [AdminController::class, 'notif'])->name('notif');

require __DIR__ . '/auth.php';
Route::post('/timesheets-store', [TimesheetController::class, 'store']);
Route::get('/timesheets-time', [DailyStatusController::class, 'tasktime']);
// Route::get('/timesheets-time/{taskid}', [DailyStatusController::class, 'tasktime']);
Route::get('/csrf-token', function () {
    return ['csrf_token' => csrf_token()];
});
Route::get('/test', [TestController::class, 'index'])->name('test');
// Route::get('/trigger-status-submit', function () {
//     Artisan::call('status:submit');
//     return 'Status submission triggered.';
// });

Route::get('permission_create', [RolsAndPermission::class, 'permission_create']);
Route::post('readta/{id}', [AdminController::class, 'markAsRead']);
Route::get('getNotificationsWithDetails', [AdminController::class, 'getUserNotificationsWithProject']);
Route::get('/reports/export', [ReportController::class, 'export'])->name('report.export');
Route::post('updateEstimateHours/{id}', [AdminController::class, 'updateEstimateHours'])->name('updateEstimateHours');
Route::post('updateEstimateemp/{id}', [AdminController::class, 'TaskAssignUpdate'])->name('TaskAssignUpdate');
Route::post('/check-leave-days', [LeaveManagementController::class, 'checkLeaveDays']);
Route::get('/getProjectTasksEmployess/{id}', [LeaveManagementController::class, 'getProjectTasksEmployess']);
Route::get('/timesheets/{week}/{id}', [TimesheetController::class, 'employeeindex']);
Route::get('/timesheets-time/{id}', [DailyStatusController::class, 'employeetasktime']);
Route::get('/holiday-details/', [HolidayWorkController::class, 'HolidayAssign']);
Route::get('/notifications-get/', [NotificationAllController::class, 'Notification']);
Route::get('/taskstatus/', [ProjectController::class, 'TaskStatus']);
//Route::get('/task-status', [TaskStatusController::class, 'index']);
Route::post('/task-status/store', [ProjectController::class, 'taskstatusstore']);
Route::put('/task-status/update/{id}', [ProjectController::class, 'taskstatuupdate']);
Route::delete('/task-status/delete/{id}', [ProjectController::class, 'taskstatudestroy']);
Route::post('/task-category-update/{id}', [ProjectController::class, 'TaskcategoryUpdate']);
Route::get('/project-tasks/{id}/total-hours', [ProjectController::class, 'getTotalTaskHours']);



Route::post('/phonepe/initiate', [\App\Http\Controllers\PhonePeController::class, 'phonePe'])->name('phonepe.initiate');
Route::get('/phonepe/callback', [\App\Http\Controllers\PhonePeController::class, 'response'])->name('phonepe.callback');
// routes/api.php (if you're using API routes)
Route::get('/timesheets-delete/{id}', [TimesheetController::class, 'destroyTime']);
Route::get('/totalworkingtime', [AdminController::class, 'TotalTime']);
Route::get('/assign-employee', [ReportController::class, 'AssignEmployee']);
Route::get('/assign-employeeproject', [ProjectController::class, 'proassignemployess']);
Route::post('/approvetime/{id}', [EmployeeController::class, 'ApproveStatuschange']);
Route::post('/rejectapprovetime/{id}', [EmployeeController::class, 'RejectStatuschange']);
