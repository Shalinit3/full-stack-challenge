<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'description',
    ];
    
    public function jobListings()
    {
        return $this->hasMany(JobListings::class, 'company_id');
    }
    
}
