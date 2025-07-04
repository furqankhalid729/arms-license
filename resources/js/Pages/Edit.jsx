import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function EditDriverLicense({ driver, errors }) {
    console.log(driver);
    const { data, setData, put, progress } = useForm({
        driver_name: driver.driver_name || '',
        father_name: driver.father_name || '',
        cnic: driver.cnic || '',
        license_number: driver.license_number || '',
        allowed_vehicles: driver.allowed_vehicles || '',
        state: driver.state || '',
        city: driver.city || '',
        license_type: driver.license_type || 'International',
        issue_date: driver.issue_date || '',
        valid_from: driver.valid_from || '',
        valid_to: driver.valid_to || '',
        applicant_image: null, // only used for updates
    });

    const [preview, setPreview] = useState(
        driver.applicant_image_url
            ? `/storage/${driver.applicant_image_url}`
            : null,
    );

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
            const response = await axios.post(
                `/driver/${driver.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            console.log('Success:', response.data);
            router.visit('/dashboard');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            // Optional: show error or validation feedback
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Driver License Record
                </h2>
            }
        >
            <div className="mx-auto my-5 max-w-lg rounded-md bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold">
                    Edit License Info
                </h2>
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
                        className="w-full rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
