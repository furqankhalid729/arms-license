import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateWeapon() {
    const { data, setData, post, progress } = useForm({
        applicant_name: '',
        father_name: '',
        cnic:'',
        license_no: '',
        weapon_type: '',
        caliber: '',
        weapon_no: '',
        cartridges: '',
        status: '',
        issue_date: '',
        expiry_date: '',
        applicant_image: null,
    });

    const [preview, setPreview] = useState(null);

    // Access the errors from the Inertia page object
    const { errors } = usePage().props;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('applicant_image', file);
        setPreview(URL.createObjectURL(file)); // Show image preview
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        post('/api/weapons', {
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Weapon
                </h2>
            }
        >
            <div className="mx-auto my-5 max-w-lg rounded-md bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Add New Weapon</h2>
                <form
                    onSubmit={submit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    {Object.keys(data).map((key) =>
                        key !== 'applicant_image' ? (
                            key === 'issue_date' || key === 'expiry_date' ? (
                                <div key={key}>
                                    <input
                                        type="date"
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                        className="w-full rounded-md border p-2"
                                        required
                                    />
                                    {errors[key] && (
                                        <div className="text-red-500 text-sm">{errors[key]}</div>
                                    )}
                                </div>
                            ) : (
                                <div key={key}>
                                    <input
                                        type="text"
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                        placeholder={key.replace('_', ' ')}
                                        className="w-full rounded-md border p-2"
                                        required
                                    />
                                    {errors[key] && (
                                        <div className="text-red-500 text-sm">{errors[key]}</div>
                                    )}
                                </div>
                            )
                        ) : (
                            <div key={key} className="space-y-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-md border p-2"
                                    required
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-20 w-20 rounded-md object-cover"
                                    />
                                )}
                                {errors[key] && (
                                    <div className="text-red-500 text-sm">{errors[key]}</div>
                                )}
                            </div>
                        )
                    )}
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
