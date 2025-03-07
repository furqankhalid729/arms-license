import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import dastak from '../Assets/dastak.jpeg';
import dtu from '../Assets/dtu.jpeg';
import logo from '../Assets/logo.png';

export default function Home() {
    const { data, setData, post, processing, errors, reset } = useForm({
        cnic: '',
    });

    const [weapons, setWeapons] = useState([]);
    const [showResult, setShowResult] = useState(false);

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

        post('/search-cnic', {
            onSuccess: (response) => {
                setWeapons(response.props.weapons || []);
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
            <div className="m-auto max-w-[500px] py-10">
                <div className="flex items-center justify-between">
                    <img src={logo} className="w-28" />
                    <img src={dastak} className="w-28" />
                </div>
                <h2 className="my-4 text-center text-base font-semibold sm:text-xl md:text-2xl">
                    ARMS LICENSE VERIFICATION
                </h2>
                <div className="min-h-[61vh]">
                    <div className="space-y-4 rounded-md bg-white p-6 shadow-lg">
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
                                    className={`w-[92px] rounded-md py-2 text-white transition ${
                                        processing
                                            ? 'cursor-not-allowed bg-gray-400'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                >
                                    {processing ? 'Searching...' : 'Search'}
                                </button>
                            </form>

                            {showResult &&
                                (weapons.length > 0 ? (
                                    weapons.map((weapon, index) => (
                                        <table
                                            key={weapon.id || index}
                                            className="my-3 flex w-full flex-col items-center justify-center space-y-2 rounded-lg border p-4 text-xs"
                                        >
                                            <tbody className="flex w-full flex-col items-center justify-center space-y-2 text-xs">
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Applicant Image :
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={`/storage/${weapon.applicant_image_url}`}
                                                            alt="Applicant"
                                                            className="h-20 w-20 object-center"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Applicant Name :
                                                    </td>
                                                    <td>
                                                        {weapon.applicant_name}
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Father / Husband Name:
                                                    </td>
                                                    <td>
                                                        {weapon.father_name}
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        License No. :
                                                    </td>
                                                    <td>{weapon.license_no}</td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Weapon Type :
                                                    </td>
                                                    <td>
                                                        {weapon.weapon_type}
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Caliber :
                                                    </td>
                                                    <td>
                                                        {weapon.caliber ||
                                                            '--------'}
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Weapon No. :
                                                    </td>
                                                    <td>
                                                        {weapon.weapon_no ||
                                                            '--------'}
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Cartridges :
                                                    </td>
                                                    <td>
                                                        {weapon.cartridges ||
                                                            '--------'}
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Status :
                                                    </td>
                                                    <td>{weapon.status}</td>
                                                </tr>
                                                <tr className="flex w-full items-center border-b border-gray-300 pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Issue Date :
                                                    </td>
                                                    <td>
                                                        {new Date(
                                                            weapon.issue_date,
                                                        ).toLocaleDateString(
                                                            'en-GB',
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr className="flex w-full items-center pb-1">
                                                    <td className="w-28 font-semibold">
                                                        Expiry Date :
                                                    </td>
                                                    <td>
                                                        {new Date(
                                                            weapon.expiry_date,
                                                        ).toLocaleDateString(
                                                            'en-GB',
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))
                                ) : (
                                    <p className="text-gray-600">
                                        No weapons found.
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="my-2 flex justify-end">
                    <img src={dtu} className="w-28" />
                </div>
            </div>
        </>
    );
}
