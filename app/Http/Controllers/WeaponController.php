<?php

namespace App\Http\Controllers;

use App\Models\Weapon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;

class WeaponController extends Controller
{
    public function index()
    {
        $weapons = Weapon::all();
        return Inertia::render('Dashboard', ['weapons' => $weapons]);
    }

    public function create()
    {
        return Inertia::render('Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_name' => 'required|string',
            'father_name' => 'required|string',
            'cnic' => 'required | string',
            'license_no' => 'required|string|unique:weapons',
            'weapon_type' => 'required|string',
            'caliber' => 'nullable|string',
            'weapon_no' => 'nullable|string',
            'cartridges' => 'nullable|string',
            'status' => 'required|string',
            'issue_date' => 'required|date',
            'expiry_date' => 'required|date',
            'applicant_image' => 'nullable|image',
        ]);

        $imagePath = $request->file('applicant_image')->store('applicant_images', 'public');

        Weapon::create([
            'applicant_name' => $request->applicant_name,
            'father_name' => $request->father_name,
            'cnic' => $request->cnic,
            'license_no' => $request->license_no,
            'weapon_type' => $request->weapon_type,
            'status' => $request->status,
            'caliber' => $request->caliber,
            'cartridges' => $request->cartridges,
            'weapon_no' => $request->weapon_no,
            'issue_date' => $request->issue_date,
            'expiry_date' => $request->expiry_date,
            'applicant_image_url' => $imagePath,
        ]);

        return redirect()->route('dashboard')->with('success', 'Weapon added successfully');
    }

    public function edit(Weapon $weapon)
    {
        $weapon->makeHidden(['created_at', 'updated_at']);
        return Inertia::render('Edit', ['weapon' => $weapon]);
    }

    public function update(Request $request, Weapon $weapon)
    {
        $request->validate([
            'applicant_name' => 'required|string',
            'father_name' => 'required|string',
            'license_no' => 'required|string',
            'weapon_type' => 'required|string',
            'caliber' => 'nullable|string',
            'weapon_no' => 'nullable|string',
            'cartridges' => 'nullable|string',
            'status' => 'required|string',
            'issue_date' => 'required|date',
            'expiry_date' => 'required|date',
            'applicant_image' => 'nullable|image',
        ]);

        $weapon->update($request->all());
        return Redirect::route('dashboard')->with('success', 'Weapon record updated successfully');
    }

    public function destroy($id)
    {
        $weapon = Weapon::findOrFail($id);
        $weapon->delete();
        return redirect()->back()->with('success', 'Installer was successfully deleted');
    }

    public function searchCNIC(Request $request)
    {
        $request->validate([
            'cnic' => 'required|string',
        ]);

        $weapons = Weapon::where('cnic', $request->cnic)->get();
        return response()->json([
            'success' => true,
            'message' => 'Weapons retrieved successfully.',
            'data' => $weapons,
        ], 200);
    }
}
