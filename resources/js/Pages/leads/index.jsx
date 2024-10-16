import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const LeadsTable = ({ leads,user,usrrr,user_type,notif }) => {
    const [search, setSearch] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const filteredLeads = leads.filter((lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase())
    );

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
                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">Employee</label>
                                <select name="employee_id" onChange={(e) => setData('employee_id', e.target.value)} value={data.employee_id} className='form-select rounded text-sm'>
                                    <option value="">-- Select Employee --</option>
                                    {
                                        employees.map((emp, index) => (
                                            <option key={index} value={emp.id}>{emp.name}</option>
                                        ))
                                    }

                                </select>
                            </div>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">Attandance Date</label>
                                <input type="date" name='date' onChange={(e) => setData('date', e.target.value)} value={data.date} className='form-input rounded text-sm' />
                            </div>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">In Time</label>
                                <input type="time" name='in_time' onChange={(e) => setData('in_time', e.target.value)} value={data.in_time} className='form-input rounded text-sm' />
                            </div>
                            <div className='flex flex-col text-sm gap-y-2'>
                                <label htmlFor="">Out Time</label>
                                <input type="time" name='out_time' onChange={(e) => setData('out_time', e.target.value)} value={data.out_time} className='form-input rounded text-sm' />
                            </div>
                            <div className='flex justify-center text-sm gap-y-2'>
                                <button type='submit' className='py-2 px-5 rounded bg-blue-500 text-white'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <div className="w-full px-9">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl'>Manage Leads</h1>
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
                                                    <button onClick={(e) => { setEdit(true); editAttd(a.id); }} className='px-2 py-2 bg-blue-500 rounded text-white'><FaPencil /></button>
                                                    <button className='px-2 py-2 bg-red-500 rounded text-white'><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))
                            } */}
                        </tbody>
                    </table>
                    <Modal show={edit} maxWidth='lg' >
                        <div className='p-4'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-lg'>Edit Attendace</h1>
                                <button onClick={(e) => setEdit(false)}><FaXmark /></button>
                            </div>
                            <hr />
                            <div className='py-4'>
                                <form onSubmit={handleUpdate} className='space-y-3'>
                                    <div className='flex flex-col text-sm gap-y-2'>
                                        <label htmlFor="">Employee</label>
                                        <select name="employee_id" onChange={(e) => setData('employee_id', e.target.value)} value={data.employee_id} className='form-select rounded text-sm'>
                                            <option value="">-- Select Employee --</option>
                                            {
                                                employees.map((emp, index) => (
                                                    <option key={index} value={emp.id}>{emp.name}</option>
                                                ))
                                            }

                                        </select>
                                    </div>
                                    <div className='flex flex-col text-sm gap-y-2'>
                                        <label htmlFor="">Attandance Date</label>
                                        <input type="date" onChange={(e) => setData('date', e.target.value)} value={data.date} className='form-input rounded text-sm' />
                                    </div>
                                    <div className='flex flex-col text-sm gap-y-2'>
                                        <label htmlFor="">In Time</label>
                                        <input type="time" onChange={(e) => setData('in_time', e.target.value)} value={data.in_time} className='form-input rounded text-sm' />
                                    </div>
                                    <div className='flex flex-col text-sm gap-y-2'>
                                        <label htmlFor="">Out Time</label>
                                        <input type="time" onChange={(e) => setData('out_time', e.target.value)} value={data.out_time} className='form-input rounded text-sm' />
                                    </div>
                                    <div className='flex justify-center text-sm gap-y-2'>
                                        <button type='submit' className='py-2 px-5 rounded bg-blue-500 text-white'>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default LeadsTable;
