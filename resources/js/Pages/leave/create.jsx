import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useForm } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import Notyf styles
const notyf = new Notyf();
const Create = ({ empdataloyee, type, user, user_type, notif }) => {
    const { data, setData, post, errors } = useForm({
        employee_id: '',
        leave_type_id: '',
        sdate: '',
        edate: '',
        reason: '',
        remark: '',
        hours: '',
        status: 0,
        checkbox_checked: false, // Use boolean for checkbox
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setData(name, checked);
        } else {
            setData(name, value);
        }
    };

  const handleSubmit = (e) => {
        e.preventDefault();

        post('/leave-store-data', {
            onSuccess: () => {
                notyf.success('Leave created successfully');
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
            },
            data: {
                ...data,
                checkbox_checked: data.checkbox_checked ? 'on' : '', // Include checkbox state in the request
            },
        });
    };

    return (
        <div className='w-[85.2%] absolute right-0 overflow-hidden'>
         <Header user={user} notif={notif}/>
            <Nav user_type={user_type} />
            <div className='p-3 table-section'>
                <div className='flex justify-end'>
                    <div className='flex'>
                        <div className='grid p-2 mt-2 text-white bg-blue-800 rounded-lg place-items-center'>
                            <Link href='/leave-index'>
                                <IoIosArrowRoundBack className='text-[1rem]' />
                            </Link>
                        </div>
                    </div>
                </div>
                {/* {errors.message && (
                    <div className="alert alert-danger">
                        {errors.message}
                    </div>
                )} */}
                <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="leave_type_id">Leave Type</label>
                        <select
                            name="leave_type_id"
                            id="leave_type_id"
                            className='w-full rounded-lg'
                            value={data.leave_type_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select leave Type</option>
                            {type.map(tp => (
                                <option key={tp.id} value={tp.id}>{tp.type_name}-{tp.days}days</option>
                            ))}
                        </select>
                        {errors.leave_type_id && <div>{errors.leave_type_id}</div>}
                    </div>
                    <div>
                        <label htmlFor="sdate">Start Date</label>
                        <input
                            className='w-full rounded-lg'
                            id="sdate"
                            name='sdate'
                            type="date"
                            value={data.sdate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="edate">End Date</label>
                        <input
                            className='w-full rounded-lg'
                            id="edate"
                            name='edate'
                            type="date"
                            value={data.edate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reason">Leave Reason</label>
                        <textarea
                            className='w-full rounded-lg'
                            name='reason'
                            value={data.reason}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="remark">Remarks</label>
                        <textarea
                            className='w-full rounded-lg'
                            name='remark'
                            value={data.remark}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {/* <label>
                            <input
                                type="checkbox"
                                name='checkbox_checked'
                                checked={data.checkbox_checked}
                                onChange={handleChange}
                            />
                            I confirm that I understand the leave request exceeds the allowed limit.
                        </label> */}
                    </div>
                    <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
