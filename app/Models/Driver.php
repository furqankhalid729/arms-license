<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $fillable = [
        'cnic',
        'license_number',
        'driver_name',
        'father_name',
        'allowed_vehicles',
        'state',
        'city',
        'license_type',
        'issue_date',
        'valid_from',
        'valid_to',
        'applicant_image'
    ];
}
