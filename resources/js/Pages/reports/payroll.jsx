import Modal from '@/Components/Modal';
import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav'
import React, { Fragment, useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { FaCreditCard, FaEdit, FaTrash } from 'react-icons/fa';
import { FaPencil, FaXmark } from 'react-icons/fa6';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import Notyf styles
import axios from 'axios';
const notyf = new Notyf();
function payroll({ user, usrrr, notif, user_type }) {
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState()
    const { post, put, data, setData, processing, errors } = useForm({
        employee_id: '',
        date: '',
        in_time: '',
        out_time: ''
    });

    async function editAttd(id) {
        setEditId(id)
        await axios.get(`/attendances/${id}`).then((res) => {
            setData({
                employee_id: res.data.employee_id,
                date: res.data.date,
                in_time: res.data.in_time,
                out_time: res.data.out_time
            });
        });
    }



    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');  // Extract hours and minutes
        const time = new Date();
        time.setHours(hours, minutes);  // Set the time

        return time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,  // Ensures 12-hour format with AM/PM
        });
    };

    function handleSubmit(e) {

        e.preventDefault()
        post(route('attendances.store'), {
            onSuccess() {
                notyf.success("Attandance Added");
            }
        })
    }

    function handleUpdate(e) {
        console.log(editId)
        e.preventDefault()
        put(`/attendances/${editId}`, {
            onSuccess() {
                notyf.success("Attandance updated");
            }
        })
    }
    return (
        <div className='w-[85.2%] ml-[11.5rem]'>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} usrrr={usrrr} />
            <div className="w-full px-9">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl'>Payroll</h1>
                    {/* <button onClick={(e) => setModal(true)} className='text-sm px-4 py-2 rounded text-white bg-blue-500'>Create Attendance</button> */}
                </div>
                <div className='py-4'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='py-2 bg-slate-600 text-white text-left pl-4 rounded-l'>#</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Employee Name</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Salary</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Net Salary</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Payslip Type</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Status</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2 rounded-r'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                attendances && attendances.map((a, i) => (
                                    <Fragment key={i}>
                                        <tr >
                                            <td className='py-2 pl-4 text-sm'>{i + 1}</td>
                                            <td className='py-2 pl-2 text-sm'>{a.name}</td>
                                            <td className='py-2 pl-2 text-sm'>{new Date(a.date).toLocaleDateString()}</td>
                                            <td className='py-2 pl-2 text-sm'>{formatTime(a.in_time)}</td>
                                            <td className='py-2 pl-2 text-sm'>{formatTime(a.out_time)}</td>
                                            <td className='py-2 pl-2 text-sm'>
                                                <div className='space-x-2'>
                                                    <button onClick={(e)=>{setEdit(true);editAttd(a.id);}} className='px-2 py-2 bg-blue-500 rounded text-white'><FaPencil /></button>
                                                    <button className='px-2 py-2 bg-red-500 rounded text-white'><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))
                            } */}
                            <tr>
                                <td className='py-2 pl-4 text-sm'>1</td>
                                <td className='py-2 pl-2 text-sm'>John Doe</td>
                                <td className='py-2 pl-2 text-sm'>&#8377; 12,000/-</td>
                                <td className='py-2 pl-2 text-sm'>&#8377; 12,000/-</td>
                                <td className='py-2 pl-2 text-sm'>Per Month</td>
                                <td className='py-2 pl-2 text-sm'>
                                    <div className='flex'>
                                        <p className='text-sm text-red-500 font-semibold border border-red-500 px-5 py-1 rounded'>Unpaid</p>
                                    </div>
                                </td>
                                <td className='py-2 pl-2 text-sm'>
                                    <div className='space-x-2'>
                                        <button onClick={(e) => { setEdit(true); editAttd(1); }} className='px-2 py-2 bg-blue-500 rounded text-white'><FaCreditCard /></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Modal show={edit} maxWidth='lg' >
                        <div className='p-4'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-lg font-semibold'>Make Payment</h1>
                                <button onClick={(e) => setEdit(false)}><FaXmark /></button>
                            </div>
                            <hr />
                            <div className='py-4'>
                                <form onSubmit={handleUpdate} className='space-y-3'>
                                    <div className='flex flex-col text-sm gap-y-2'>
                                        <label htmlFor="">Basic Salary</label>
                                        <div className='w-full relative flex items-center'>
                                            <input type="text" readOnly value={12000} className='form-input pl-8 rounded text-sm w-full' />
                                            <FaCreditCard className='absolute left-3'/>
                                        </div>
                                    </div>
                                    <div className="space-y-3 py-2 px-4">
                                        <div className='flex justify-between items-center text-sm'>
                                            <p>Allowances</p>
                                            <p>&#8377; 0</p>
                                        </div>
                                        <div className='flex justify-between items-center text-sm'>
                                            <p>Commission</p>
                                            <p>&#8377; 0</p>
                                        </div>
                                        <div className='flex justify-between items-center text-sm'>
                                            <p>Saturation Deduction</p>
                                            <p>&#8377; 0</p>
                                        </div>
                                        <div className='flex justify-between items-center text-sm'>
                                            <p>Other Payment</p>
                                            <p>&#8377; 0</p>
                                        </div>
                                        <div className='flex justify-between items-center text-sm'>
                                            <p>Overtime</p>
                                            <p>&#8377; 0</p>
                                        </div>
                                        <div className='flex justify-between items-center font-semibold'>
                                            <p>Net Salary</p>
                                            <p>&#8377; 12000</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center text-sm gap-y-2'>
                                        <button type='submit' className='py-2 px-5 rounded bg-green-500 text-white'>Make Payment</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default payroll