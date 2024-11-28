import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import Notyf styles
import axios from 'axios';
import { useState } from 'react';
const notyf = new Notyf();
export default function Login({ status, canResetPassword, mapApiKey }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route('login'), {
    //         onFinish: () => reset('password'),
    //     });
    // };
    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                notyf.success('Login successful!'); // Display success message
            },
            onError: () => {
                notyf.error('Login failed. Please check your credentials.'); // Display error message if needed
            },
            onFinish: () => reset('password'),
        });
    };

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        address: "",
    });
    const [error, setError] = useState("");

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    setLocation({
                        latitude,
                        longitude,
                        address: "Loading address...",
                    });

                    // Reverse geocoding
                    const geocoder = new window.google.maps.Geocoder();

                    const latLng = { lat: latitude, lng: longitude };

                    geocoder.geocode({ location: latLng }, (results, status) => {
                        if (status === "OK") {
                            if (results[0]) {
                                setLocation({
                                    latitude,
                                    longitude,
                                    address: results[0].formatted_address,
                                });
                                console.log(latitude,
                                    longitude,results[0].formatted_address)
                            } else {
                                console.log("No results found for this location.");
                            }
                        } else {
                            console.log("Geocoder failed: " + status);
                        }
                    });
                },
                (err) => {
                    console.log("Error getting location: " + err.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    // getLocation()

    return (
        <GuestLayout>
            <Head title="Log in" />
            <button onClick={(e) => getCurrentLocation()} className='bg-red-500 text-white text-sm px-3 py-3 rounded'>Get Location</button>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
