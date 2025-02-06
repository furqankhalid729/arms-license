import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Dashboard({ weapons }) {
    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this record?')) return;

        router.get(`/api/weapons/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setWeapons(weapons.filter((weapon) => weapon.id !== id));
            },
            onError: (errors) => {
                alert(errors.message || 'Failed to delete weapon record.');
            },
        });
    };
    console.log(weapons);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="mx-auto my-10 max-w-7xl space-y-4 rounded-md bg-white p-6 shadow-lg">
                <div className="flex justify-end">
                    <Link
                        href={route('weapons.create')}
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Weapon
                    </Link>
                </div>
                {weapons.length === 0 ? (
                    <p className="mt-4 text-center text-gray-500">
                        No weapon records found.
                    </p>
                ) : (
                    <table className="mt-4 w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Applicant Name</th>
                                <th className="border p-2">CNIC</th>
                                <th className="border p-2">License No</th>
                                <th className="border p-2">Weapon Type</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weapons.map((weapon) => (
                                <tr key={weapon.id} className="text-center">
                                    <td className="border p-2">
                                        <img
                                            src={`/storage/${weapon.applicant_image_url}`}
                                            className="h-16 w-16 rounded-md object-cover"
                                            alt="Applicant"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        {weapon.applicant_name}
                                    </td>
                                    <td className="border p-2">
                                        {weapon.cnic}
                                    </td>
                                    <td className="border p-2">
                                        {weapon.license_no}
                                    </td>
                                    <td className="border p-2">
                                        {weapon.weapon_type}
                                    </td>
                                    <td className="space-x-2 border p-2">
                                        <Link
                                            href={`/weapons/${weapon.id}/edit`}
                                            className="rounded-md bg-yellow-500 px-3 py-1 text-white"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(weapon.id)
                                            }
                                            className="rounded-md bg-red-500 px-3 py-1 text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
