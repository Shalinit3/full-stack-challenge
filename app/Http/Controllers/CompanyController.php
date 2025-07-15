<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index() {
        return Inertia::render('companies/index');
    }
    public function create() {
        return Inertia::render('companies/create');
    }
    public function edit($company) {
        return Inertia::render('companies/edit', ['company' => $company]);
    }
}
