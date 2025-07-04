import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import logo from '../Assets/dlims.jpg';

export default function Home() {
    const { props } = usePage();
    console.log('Page props:', props);
    const initialCnic = props?.cnic || '';
    const { data, setData, get, processing, errors, reset } = useForm({
        cnic: initialCnic,
    });

    const [weapons, setWeapons] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (props.weapons) {
            setWeapons(props.weapons);
            setShowResult(true);
        }
    }, [props.weapons]);

    const formatCNIC = (value) => {
        let cnicValue = value.replace(/\D/g, '');
        if (cnicValue.length > 13) {
            cnicValue = cnicValue.slice(0, 13);
        }
        let formattedCNIC = cnicValue;
        if (cnicValue.length > 5) {
            formattedCNIC = `${cnicValue.slice(0, 5)}-${cnicValue.slice(5)}`;
        }
        if (cnicValue.length > 12) {
            formattedCNIC = `${cnicValue.slice(0, 5)}-${cnicValue.slice(5, 12)}-${cnicValue.slice(12)}`;
        }
        return formattedCNIC;
    };

    const handleChange = (e) => {
        setData('cnic', formatCNIC(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        get('/search-cnic', {
            onSuccess: (response) => {
                console.log('Search response:', response.props.weapons);
                setShowResult(true);
                setWeapons(response.props.weapons);
                setShowResult(true);
            },
            onError: (error) => {
                console.error(error);
            },
        });
    };

    return (
        <>
            <Head title="Home" />
            <div className="m-auto max-w-[500px]">
                <div className="items-left flex h-[270px] flex-col justify-around">
                    <img src={logo} className="w-[200px] px-[20px]" />
                    <h2 className="my-4 border bg-[#97edff] p-5 text-[30px] font-semibold">
                        City Traffic Police
                    </h2>
                </div>
                <div className="min-h-[61vh]">
                    <div className="m-6 space-y-4 rounded-md bg-white p-6 shadow-lg">
                        <h3 className="text-center text-xs font-semibold sm:text-base">
                            Search By CNIC with dashes
                        </h3>
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 text-center"
                            >
                                <input
                                    type="text"
                                    placeholder="Enter CNIC (e.g., 12345-6789012-3)"
                                    value={data.cnic}
                                    maxLength={15}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    autoComplete="on"
                                />
                                {errors.cnic && (
                                    <p className="text-xs text-red-500">
                                        {errors.cnic}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-[92px] rounded-md py-2 text-white transition ${processing
                                            ? 'cursor-not-allowed bg-gray-400'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                >
                                    {processing ? 'Searching...' : 'Search'}
                                </button>
                            </form>

                            {showResult &&
                                (weapons.length > 0 ? (
                                    weapons.map((driver, index) => (
                                        <div
                                            key={index}
                                            className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 text-sm text-gray-800 shadow-lg"
                                        >
                                            {/* Applicant Image */}
                                            <div className="flex justify-center">
                                                <img
                                                    src={`/storage/public/${driver.applicant_image}`}
                                                    alt="Applicant"
                                                    className="h-32 w-32 rounded-full border object-cover"
                                                />
                                            </div>

                                            {/* Title */}
                                            <h2 className="border-b pb-2 text-center text-lg font-semibold">
                                                Driver Information
                                            </h2>

                                            {/* Info List */}
                                            <div className="space-y-2">
                                                <p>
                                                    <span className="font-semibold">
                                                        CNIC:
                                                    </span>{' '}
                                                    {driver.cnic}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        License Number:
                                                    </span>{' '}
                                                    {driver.license_number}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Driver Name:
                                                    </span>{' '}
                                                    {driver.driver_name}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Father/Husband Name:
                                                    </span>{' '}
                                                    {driver.father_name}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Allowed Vehicles:
                                                    </span>{' '}
                                                    {driver.allowed_vehicles}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        State:
                                                    </span>{' '}
                                                    {driver.state}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        City:
                                                    </span>{' '}
                                                    {driver.city}
                                                </p>
                                            </div>

                                            {/* License Duration */}
                                            <h3 className="border-t pt-3 text-center font-semibold text-gray-600">
                                                License Duration {index === 2 && '(International)'}
                                            </h3>
                                            <div className="space-y-1">
                                                <p>
                                                    <span className="font-semibold">
                                                        Issue Date:
                                                    </span>{' '}
                                                    {new Date(
                                                        driver.issue_date,
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                    )}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Valid From:
                                                    </span>{' '}
                                                    {new Date(
                                                        driver.valid_from,
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                    )}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Valid To:
                                                    </span>{' '}
                                                    {new Date(
                                                        driver.valid_to,
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">
                                        No weapons found.
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <footer className="bg-gray-900 px-6 py-6 text-center text-white">
                    <div className="mx-auto max-w-3xl text-sm leading-relaxed">
                        <p>
                            Driving License Issuance Management System (DLIMS)
                            automates the processes for driving license
                            issuance, renewal and upgrades. This system provides
                            quick processing service to the public and up to
                            date details to the authorities by using state of
                            the art technology and equipment.
                        </p>
                        <p className="mt-4 text-xs text-gray-400">
                            Copyright © 2024 -
                            <a
                                href="https://dlim-ctp.com"
                                className="underline hover:text-white"
                            >
                                https://dlim-ctp.com
                            </a>{' '}
                            - All rights reserved
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
