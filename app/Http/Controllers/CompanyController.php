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
    public function edit(Companies $company) {
        return Inertia::render('companies/edit', compact('company'));
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
        return redirect()->route('companies.index')->with('message', 'Company created successfully.');
    }

    public function update(Request $request, Companies $company) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);
        $company->update($request->all());
        return redirect()->route('companies.index')->with('message', 'Company updated successfully.');
    }

    public function destroy(Companies $company) {
        $company->delete();
        return redirect()->route('companies.index')->with('message', 'Company deleted successfully.');
    }
}
