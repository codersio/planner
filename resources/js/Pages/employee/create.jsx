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

const Create = ({ user, user_type, roles, notif }) => {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        dob: '',
        gender: '',
        joinning_date: '',
        branch_id: '',
        department_id: '',
        designation_id: '',
        company_doj: '',
        account_holder_name: '',
        account_number: '',
        bank_name: '',
        bank_identifier_code: '',
        branch_location: '',
        tax_payer_id: '',
        roleemployee: ''
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
                if (typeof errors === 'object' && errors !== null) {
                    Object.entries(errors).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            value.forEach(message => notyf.error(message));
                        } else {
                            notyf.error(value);
                        }
                    });
                } else {
                    notyf.error('An unexpected error occurred.');
                }
            }
        });
    };

    return (
            <div className='w-[85.2%] ml-[11.5rem]'>
  <Header user={user} notif={notif} />
  <Nav user_type={user_type} />
  <div className='p-3 table-section'>
    <div className='flex justify-end'>
      <div className='flex'>
        <div className='grid p-2 mt-2 text-white bg-blue-800 rounded-lg place-items-center'>
          <Link href='employees'><IoIosArrowRoundBack className='text-[1rem]' /></Link>
        </div>
      </div>
    </div>
    <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>

      {/* Personal Details Section */}
      <div className='col-span-2'>
        <h2 className='mb-4 text-xl font-bold'>Personal Details</h2>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" className='w-full rounded-lg' name="name" type="text" value={data.name} onChange={handleChange} required />
        {errors.name && <div>{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" className='w-full rounded-lg' name="email" type="email" value={data.email} onChange={handleChange} required />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" className='w-full rounded-lg' name="password" type="password" value={data.password} onChange={handleChange} required />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" className='w-full rounded-lg' name="phone" type="text" value={data.phone} onChange={handleChange} required />
        {errors.phone && <div>{errors.phone}</div>}
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input id="address" className='w-full rounded-lg' name="address" type="text" value={data.address} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input id="dob" className='w-full rounded-lg' name="dob" type="date" value={data.dob} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" className='w-full rounded-lg' name="gender" value={data.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="joinning_date">Joining Date</label>
        <input id="joinning_date" className='w-full rounded-lg' name="joinning_date" type="date" value={data.joinning_date} onChange={handleChange} required />
      </div>

      {/* Company Details Section */}
      <div className='col-span-2 mt-4'>
        <h2 className='mb-4 text-xl font-bold'>Company Details</h2>
      </div>
      <div>
        <label htmlFor="branch_id">Branch ID</label>
        <input id="branch_id" className='w-full rounded-lg' name="branch_id" type="text" value={data.branch_id} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="department_id">Department ID</label>
        <input id="department_id" className='w-full rounded-lg' name="department_id" type="text" value={data.department_id} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="designation_id">Designation ID</label>
        <input id="designation_id" className='w-full rounded-lg' name="designation_id" type="text" value={data.designation_id} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="company_doj">Company Date of Joining</label>
        <input id="company_doj" className='w-full rounded-lg' name="company_doj" type="date" value={data.company_doj} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="roleemployee">Role</label>
        <select id="roleemployee" className='w-full rounded-lg' name="roleemployee" value={data.roleemployee} onChange={handleChange}>
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* Bank Details Section */}
      <div className='col-span-2 mt-4'>
        <h2 className='mb-4 text-xl font-bold'>Bank Details</h2>
      </div>
      <div>
        <label htmlFor="account_holder_name">Account Holder Name</label>
        <input id="account_holder_name" className='w-full rounded-lg' name="account_holder_name" type="text" value={data.account_holder_name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="account_number">Account Number</label>
        <input id="account_number" className='w-full rounded-lg' name="account_number" type="text" value={data.account_number} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="bank_name">Bank Name</label>
        <input id="bank_name" className='w-full rounded-lg' name="bank_name" type="text" value={data.bank_name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="bank_identifier_code">Bank Identifier Code</label>
        <input id="bank_identifier_code" className='w-full rounded-lg' name="bank_identifier_code" type="text" value={data.bank_identifier_code} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="branch_location">Branch Location</label>
        <input id="branch_location" className='w-full rounded-lg' name="branch_location" type="text" value={data.branch_location} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="tax_payer_id">Tax Payer ID</label>
        <input id="tax_payer_id" className='w-full rounded-lg' name="tax_payer_id" type="text" value={data.tax_payer_id} onChange={handleChange} />
      </div>

      <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%] col-span-2'>Create</button>
    </form>
  </div>
</div>

    );
}

export default Create;
