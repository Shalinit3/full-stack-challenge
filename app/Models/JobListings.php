<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobListings extends Model
{
    protected $fillable = [
        'title',
        'description',
        'contactEmail',
        'contactPhone',
        'contactFormUrl',
    ];
}
