import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import Notyf styles
const notyf = new Notyf();
const Create = ({user,user_type,roles,notif}) => {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        joinning_date: '',
        roleemployee:''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/employees-store', {
            onSuccess: () => {
               notyf.success('Employee created successfully');
            },
            onError: (errors) => {
                // Check if 'errors' is an object and has entries
                if (typeof errors === 'object' && errors !== null) {
                    Object.entries(errors).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            // If value is an array (e.g., validation messages)
                            value.forEach(message => notyf.error(message));
                        } else {
                            // Single error message
                            notyf.error(value);
                        }
                    });
                } else {
                    // Handle unexpected error format
                    notyf.error('An unexpected error occurred.');
                }
            }
        });
    };
    return (
        <div className='w-[85.2%] ml-[11.5rem]'>
            <Header user={user} notif={notif}/>
            <Nav user_type={user_type}/>
            <div className='p-3 table-section'>
                <div className='flex justify-end '>
                    <div className='flex'>
                        <div className='grid p-2 mt-2 text-white bg-blue-800 rounded-lg place-items-center'>
                            <Link href='employees'>  <IoIosArrowRoundBack className='text-[1rem] ' /></Link>
                        </div>
                        {/* <a>
                        Add Employee
                    </a> */}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="email">Name</label>
                        <input id="name" className='w-full rounded-lg' name="name" type="text" value={data.name} onChange={handleChange} required />
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className='w-full rounded-lg' id="email" name='email' type="email" value={data.email} onChange={handleChange} required />
                        {errors.email && <div>{errors.email}</div>}

                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='w-full rounded-lg' id="password" name='password' type="password" value={data.password} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input className='w-full rounded-lg' id="phone" name='phone' type="text" value={data.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input className='w-full rounded-lg' id="address" name='address' type="text" value={data.address} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="joinning_date">Joining Date</label>
                        <input className='w-full rounded-lg' id="joinning_date" name='joinning_date' type="date" value={data.joinning_date} onChange={handleChange} required />
                    </div>

                    <div>
                        <label htmlFor="joinning_date"> Roles</label>
                       <select  className='w-full rounded-lg' name="roleemployee" id="" value={data.roleemployee} onChange={handleChange}>
                        <option value="">Select Roles</option>
                        {
                            roles.map(r=>(
                                <option value={r.name}>{r.name}</option>
                            ))
                        }
                       </select>
                    </div>
                    <br />
                    <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create;
