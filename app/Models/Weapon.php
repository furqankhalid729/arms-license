<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weapon extends Model {
    use HasFactory;

    protected $fillable = [
        'applicant_name', 'father_name', 'license_no', 'weapon_type',
        'caliber', 'weapon_no', 'cartridges', 'status',
        'issue_date', 'expiry_date', 'applicant_image_url','cnic'
    ];
}
