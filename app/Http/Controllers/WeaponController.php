<?php

namespace App\Http\Controllers;

use App\Models\Weapon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;
use App\Models\Driver;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class WeaponController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $weapons = Driver::when($search, function ($query, $search) {
            return $query->where('driver_name', 'like', "%{$search}%")
                ->orWhere('cnic', 'like', "%{$search}%");
        })->get();

        Log::info('Searching for weapons with search query: ' . $search);

        return inertia('Dashboard', [
            'weapons' => $weapons,
            'searchQuery' => $search
        ]);
    }

    public function create()
    {
        return Inertia::render('Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'driver_name'       => 'required|string|max:255',
            'father_name'       => 'required|string|max:255',
            'cnic'              => 'required|string',
            'license_number'    => 'required|string|max:255',
            'allowed_vehicles'  => 'required|string|max:255',
            'state'             => 'required|string|max:255',
            'city'              => 'required|string|max:255',
            'license_type'      => 'nullable|string|max:255',
            'issue_date'        => 'required|date',
            'valid_from'        => 'required|date',
            'valid_to'          => 'required|date|after_or_equal:valid_from',
            'applicant_image'   => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        Log::info('Storing driver license record: ' . json_encode($validated));
        // Upload image
        if ($request->hasFile('applicant_image')) {
            $image = $request->file('applicant_image');
            Log::info('Image file received: ' . $image->getClientOriginalName());
            $filename = 'applicants/' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public', $filename);
            $validated['applicant_image'] = $filename;
        } else {
            $validated['applicant_image'] = "test";
        }

        Driver::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Driver license record created successfully!',
            'redirect' => route('dashboard') // optional
        ]);
    }

    public function edit($id)
    {
        $driver = Driver::findOrFail($id);
        return Inertia::render('Edit', ['driver' => $driver]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'driver_name'       => 'required|string|max:255',
            'father_name'       => 'required|string|max:255',
            'cnic'              => 'required|string',
            'license_number'    => 'required|string|max:255',
            'allowed_vehicles'  => 'required|string|max:255',
            'state'             => 'required|string|max:255',
            'city'              => 'required|string|max:255',
            'license_type'      => 'nullable|string|max:255',
            'issue_date'        => 'required|date',
            'valid_from'        => 'required|date',
            'valid_to'          => 'required|date|after_or_equal:valid_from',
        ]);

        Log::info('Updating driver license record: ' . json_encode($validated));
        $driver = Driver::findOrFail($id);
        // Handle image upload if new file is submitted
        if ($request->hasFile('applicant_image')) {
            $image = $request->file('applicant_image');
            $filename = 'applicants/' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public', $filename);
            $validated['applicant_image'] = $filename;

            // Optional: delete old image if exists
            if ($driver->applicant_image && Storage::exists('public/' . $driver->applicant_image)) {
                Storage::delete('public/' . $driver->applicant_image);
            }
        }

        $driver->update($validated);
        return Redirect::route('dashboard')->with('success', 'Driver license record updated successfully!');
    }

    public function destroy($id)
    {
        $weapon = Driver::findOrFail($id);
        $weapon->delete();
        return redirect()->back()->with('success', 'Installer was successfully deleted');
    }

    public function searchCNIC(Request $request)
    {
        $request->validate([
            'cnic' => 'required|string',
        ]);
        Log::info('Searching for weapons with CNIC: ' . $request->cnic);
        $weapons = Driver::where('license_number', $request->cnic)->get();

        return Inertia::render('Home', [
            'cnic' => $request->cnic,
            'weapons' => $weapons->isEmpty() ? [] : $weapons,
        ]);
    }
}
