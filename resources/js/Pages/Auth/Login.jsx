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
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        // latitude: null,
        // longitude: null,
        // address: '',
        remember: false,
    });
    
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latt = position.coords.latitude;
                        const long = position.coords.longitude;
    
                        setData((prev) => ({
                            ...prev,
                            latitude: latt,
                            longitude: long,
                        }));
    
                        const geocoder = new window.google.maps.Geocoder();
                        const latLng = { lat: latt, lng: long };
    
                        geocoder.geocode({ location: latLng }, (results, status) => {
                            if (status === 'OK' && results[0]) {
                                setData((prev) => ({
                                    ...prev,
                                    address: results[0].formatted_address,
                                }));
                                resolve(); // Location and address fetched successfully
                            } else {
                                console.log('Geocoder failed or no results found');
                                reject(new Error('Geocoder failed or no results found'));
                            }
                        });
                    },
                    (error) => {
                        console.error('Error getting location: ', error);
                        reject(error);
                    },
                    {
                        enableHighAccuracy: true, // This ensures the most accurate position
                        timeout: 5000, // Set a timeout (5 seconds in this example)
                        maximumAge: 0, // No cached location
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                reject(new Error('Geolocation not supported'));
            }
        });
    };
    
    const submit = (e) => {
        e.preventDefault();
    
        // try {
        //     // Wait for location to be fetched
        //     await getCurrentLocation();
    
        //     // Submit the form if location data is loaded
        //     if (data.latitude && data.longitude && data.address) {
                post('/login', {
                    onSuccess: () => {
                        notyf.success('Login successful!'); // Display success message
                    },
                    onError: () => {
                        notyf.error('Login failed. Please check your credentials.'); // Display error message if needed
                    },
                    onFinish: () => reset('password'),
                });
        //     } else {
        //         notyf.error('Location data not available. Please try again.');
        //     }
        // } catch (error) {
        //     console.error('Error during location fetch:', error);
        //     notyf.error('Failed to retrieve location. Please enable location services.');
        // }
    };   

    // getLocation()

    return (
        <GuestLayout>
            <br/>Current Loction<br/><br/>{data.latitude}\{data.longitude}\{data.address}<br/><br/>
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
