<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index() {
        $companies = Companies::all();
        return Inertia::render('companies/index', compact('companies'));
    }
    public function create() {
        return Inertia::render('companies/create');
    }
    public function edit($company) {
        return Inertia::render('companies/edit', ['company' => $company]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);
        Companies::create($request->all());
        return redirect()->route('companies.index');
    }
}
