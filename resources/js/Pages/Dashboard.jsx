import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Dashboard({ weapons, searchQuery }) {
    console.log(weapons)
    const { data, setData, get } = useForm({
        search: searchQuery || '', // Preserve search query if available
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('dashboard', { search: data.search })); // Fetch filtered data
    };

    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this record?')) return;

        router.get(`api/driver/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setWeapons(weapons.filter((weapon) => weapon.id !== id));
            },
            onError: (errors) => {
                alert(errors.message || 'Failed to delete weapon record.');
            },
        });
    };

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
                {/* Search Form & Add Button */}
                <div className="flex items-center justify-between">
                    <form onSubmit={handleSearch} className="flex space-x-2">
                        <input
                            type="text"
                            name="search"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            placeholder="Search Drivers..."
                            className="w-72 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Search
                        </button>
                    </form>

                    <Link
                        href={route('weapons.create')}
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Driver
                    </Link>
                </div>

                {/* Weapons Table */}
                {weapons.length === 0 ? (
                    <p className="mt-4 text-center text-gray-500">
                        No Driver records found.
                    </p>
                ) : (
                    <table className="mt-4 w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Applicant Name</th>
                                <th className="border p-2">CNIC</th>
                                <th className="border p-2">License Number</th>
                                <th className="border p-2">Allowed Vechicles</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weapons.map((weapon) => (
                                <tr key={weapon.id} className="text-center">
                                    <td className="border p-2">
                                        {weapon.driver_name}
                                    </td>
                                    <td className="border p-2">
                                        {weapon.cnic}
                                    </td>
                                    <td className="border p-2">
                                        {weapon.license_number}
                                    </td>
                                    <td className="border p-2">
                                        {weapon.allowed_vehicles}
                                    </td>
                                    <td className="space-x-2 border p-2">
                                        <Link
                                            href={`/driver/${weapon.id}/edit`}
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
