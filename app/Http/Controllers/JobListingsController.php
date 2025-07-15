<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use App\Models\JobListings;
use Illuminate\Http\Request;

class JobListingsController extends Controller
{
    public function create(Companies $company)
    {
        // You may pass company info to the view (or Inertia component)
        return inertia('jobs/create', [
            'companyName' => $company->name,
            'companyId' => $company->id,
        ]);
    }
    public function store(Request $request, Companies $company)
    {
        
        // Validate incoming data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'contactEmail' => 'required|email',
            'contactPhone' => 'required|string|max:20',
            'contactFormUrl' => 'required|url',
        ]);

        // Create job linked to the company
        $job = $company->jobListings()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'contactEmail' => $validated['contactEmail'],
            'contactPhone' => $validated['contactPhone'],
            'contactFormUrl' => $validated['contactFormUrl'],
        ]);

        // Redirect or respond as needed
        return redirect()->route('companies.details', $company->id)->with('message', 'Job listing created successfully!');
    }

    public function destroy($jobId)
    {
        $job = JobListings::findOrFail($jobId);
        $job->delete();

        return redirect()->back()->with('message', 'Job listing deleted successfully.');
    }

}
