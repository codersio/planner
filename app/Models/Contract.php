<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $fillable = [
        'Contractor_Name',
        'Email_Address',
        'phone_number',
        'Contractor_Type',
        'Contract_Value',
        'Start_Date',
        'End_Date',
        'Description'
    ];
}
