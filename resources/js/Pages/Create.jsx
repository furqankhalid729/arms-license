import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function CreateDriverLicense() {
    const { data, setData, post, progress } = useForm({
        driver_name: '',
        father_name: '',
        cnic: '',
        license_number: '',
        allowed_vehicles: '',
        state: '',
        city: '',
        license_type: 'International', // default
        issue_date: '',
        valid_from: '',
        valid_to: '',
        applicant_image: null,
    });

    const [preview, setPreview] = useState(null);
    const { errors } = usePage().props;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('applicant_image', file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post('/api/drivers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Success:', response.data);
            if (response.data.status === 'success') {
                router.visit('/dashboard');
            };

        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            // Optional: set backend validation errors here
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Driver License Record
                </h2>
            }
        >
            <div className="mx-auto my-5 max-w-lg rounded-md bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Add License Info</h2>
                <form
                    onSubmit={submit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    {Object.entries(data).map(([key, value]) => {
                        if (key === 'applicant_image') {
                            return (
                                <div key={key} className="space-y-2">
                                    <label className="mb-1 block text-sm font-medium capitalize">
                                        Applicant Image
                                    </label>
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
                                        <div className="text-sm text-red-500">
                                            {errors[key]}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        const isDateField = [
                            'issue_date',
                            'valid_from',
                            'valid_to',
                        ].includes(key);
                        return (
                            <div key={key}>
                                <label className="mb-1 block text-sm font-medium capitalize">
                                    {key.replace(/_/g, ' ')}
                                </label>
                                <input
                                    type={isDateField ? 'date' : 'text'}
                                    value={value}
                                    onChange={(e) =>
                                        setData(key, e.target.value)
                                    }
                                    placeholder={key.replace(/_/g, ' ')}
                                    className="w-full rounded-md border p-2"
                                    required
                                />
                                {errors[key] && (
                                    <div className="text-sm text-red-500">
                                        {errors[key]}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {progress && (
                        <progress
                            value={progress.percentage}
                            max="100"
                            className="w-full"
                        >
                            {progress.percentage}%
                        </progress>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
