import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function EditWeapon({ weapon, errors }) {
    const { data, setData, put } = useForm(weapon);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        console.log(data);
        put(`/weapons/${weapon.id}`, { data: formData });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData((prevData) => ({
            ...prevData,
            applicant_image: file,
        }));
        console.log(data)
    };


    return (
        <AuthenticatedLayout>
            <div className="mx-auto my-7 max-w-lg rounded-md bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Edit Weapon</h2>
                <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
                    {Object.keys(data).map((key) => (
                        <div key={key} className="space-y-1">
                            {/* Handle date inputs */}
                            {key === 'issue_date' || key === 'expiry_date' ? (
                                <div>
                                    <input
                                        type="date"
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                        className="w-full rounded-md border p-2"
                                        required
                                    />
                                    {errors[key] && (
                                        <div className="text-sm text-red-500">
                                            {errors[key]}
                                        </div>
                                    )}
                                </div>
                            ) : key === 'applicant_image_url' ? (
                                <div>
                                    <img
                                        src={`/storage/${data[key]}`}
                                        className="h-16 w-16 rounded-md object-cover"
                                        alt="Applicant"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="text"
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                        placeholder={key.replace('_', ' ')}
                                        className="w-full rounded-md border p-2"
                                        required
                                    />
                                    {errors[key] && (
                                        <div className="text-sm text-red-500">
                                            {errors[key]}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-green-500 px-4 py-2 text-white"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
