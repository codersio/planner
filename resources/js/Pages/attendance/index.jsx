import Modal from '@/Components/Modal';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import { useForm } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPencil, FaXmark } from 'react-icons/fa6';

const Attendance = ({ user, notif, user_type, documents }) => {
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const { } = useForm({
        employee_id: '',
        date: '',
        in_time: '',
        out_time: ''
    });
    return (
        <div className='w-[85.2%] ml-[11.5rem]'>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <Modal show={modal} maxWidth='lg'>
                <div className='p-4'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-lg'>Create Attendace</h1>
                        <button onClick={() => setModal(false)}><FaXmark /></button>
                    </div>
                    <hr />
                    <div className='py-4'>
                        <form action="#" className='space-y-3'>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">Employee</label>
                                <select name="" className='form-select rounded text-sm'>
                                    <option value="">-- Select Employee --</option>
                                    <option value="">John Doe</option>
                                    <option value="">Mark Oren</option>
                                </select>
                            </div>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">Attandance Date</label>
                                <input type="date" className='form-input rounded text-sm' />
                            </div>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">Attandance Date</label>
                                <input type="time" className='form-input rounded text-sm' />
                            </div>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">Attandance Date</label>
                                <input type="time" className='form-input rounded text-sm' />
                            </div>
                            <div className='flex justify-center text-sm gap-y-2'>
                                <button className='py-2 px-5 rounded bg-blue-500 text-white'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <div className="w-full px-9">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl'>Manage Attendance</h1>
                    <button onClick={(e) => setModal(true)} className='text-sm px-4 py-2 rounded text-white bg-blue-500'>Create Attendance</button>
                </div>
                <div className='py-4'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='py-2 bg-slate-600 text-white text-left pl-4 rounded-l'>#</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Employee Name</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Attandance Date</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Clock In</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2'>Clock Out</th>
                                <th className='py-2 bg-slate-600 text-white text-left pl-2 rounded-r'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-2 pl-4 text-sm'>1</td>
                                <td className='py-2 pl-2 text-sm'>John Doe</td>
                                <td className='py-2 pl-2 text-sm'>12-Jul-2024</td>
                                <td className='py-2 pl-2 text-sm'>10:45 AM</td>
                                <td className='py-2 pl-2 text-sm'>7:45 PM</td>
                                <td className='py-2 pl-2 text-sm'>
                                    <div className='space-x-2'>
                                        <button onClick={(e)=>setEditModal(true)} className='px-2 py-2 bg-blue-500 rounded text-white'><FaPencil /></button>
                                        <button className='px-2 py-2 bg-red-500 rounded text-white'><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                            <Modal show={editModal} maxWidth='lg'>
                                <div className='p-4'>
                                    <div className='flex justify-between items-center'>
                                        <h1 className='text-lg'>Edit Attendace</h1>
                                        <button onClick={() => setEditModal(false)}><FaXmark/></button>
                                    </div>
                                    <hr />
                                    <div className='py-4'>
                                        <form action="#" className='space-y-3'>
                                            <div className='flex flex-col text-sm gap-y-2'>
                                                <label htmlFor="">Employee</label>
                                                <select name="" className='form-select rounded text-sm'>
                                                    <option value="">-- Select Employee --</option>
                                                    <option value="">John Doe</option>
                                                    <option value="">Mark Oren</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col text-sm gap-y-2'>
                                                <label htmlFor="">Attandance Date</label>
                                                <input type="date" className='form-input rounded text-sm' />
                                            </div>
                                            <div className='flex flex-col text-sm gap-y-2'>
                                                <label htmlFor="">Attandance Date</label>
                                                <input type="time" className='form-input rounded text-sm' />
                                            </div>
                                            <div className='flex flex-col text-sm gap-y-2'>
                                                <label htmlFor="">Attandance Date</label>
                                                <input type="time" className='form-input rounded text-sm' />
                                            </div>
                                            <div className='flex justify-center text-sm gap-y-2'>
                                                <button className='py-2 px-5 rounded bg-blue-500 text-white'>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Modal>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Attendance;
