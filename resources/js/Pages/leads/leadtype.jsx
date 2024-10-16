import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Modal from '@/Components/Modal';

function LeadType({ user, notif, user_type, leadTypes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLeadTypeId, setSelectedLeadTypeId] = useState(null);

    const notyf = new Notyf();

    // Use useForm for form handling
    const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
        name: '', // Initial form field
    });

    const openModal = (leadType = null) => {
        setIsModalOpen(true);
        setData('name', leadType ? leadType.name : '');
        setSelectedLeadTypeId(leadType ? leadType.id : null); // Set lead type ID for editing
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLeadTypeId(null); // Reset the selected lead type ID
        reset('name'); // Reset the form field
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedLeadTypeId) {
            put(route('leadtypes.update', selectedLeadTypeId), {
                onSuccess: () => {
                    notyf.success('Lead type updated successfully');
                    closeModal();
                },
                onError: () => {
                    notyf.error('Failed to update lead type');
                },
            });
        } else {
            post(route('leadtypes.store'), {
                onSuccess: () => {
                    notyf.success('Lead type created successfully');
                    closeModal();
                },
                onError: () => {
                    notyf.error('Failed to create lead type');
                },
            });
        }
    };

    const handleDelete = (leadTypeId) => {
        destroy(route('leadtypes.destroy', leadTypeId), {
            onSuccess: () => {
                notyf.success('Lead type deleted successfully');
            },
            onError: () => {
                notyf.error('Failed to delete lead type');
            },
        });
    };

    return (
        <div className='w-[85.2%] ml-[11.5rem]'>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="flex px-9">
                <div className="w-64 h-screen p-4 bg-teal-700">
                    <ul className="space-y-2">
                        <li className="font-medium text-white"> <Link href="/leadtypes">Lead Type</Link></li>
                        <li className="text-gray-300 hover:text-white"> <Link href="/leadstages">Lead Stage</Link></li>
                        <li className="text-gray-300 hover:text-white"> <Link href="/leadsources">Lead Sources</Link></li>
                    </ul>
                </div>
                <div className="flex-1 p-6 bg-gray-100">
                    <div className='flex justify-between'>
                        <h1 className="mb-4 text-2xl font-bold">Lead Type</h1>
                        <button onClick={() => openModal()} className="p-2 text-teal-900 underline rounded-md">
                            Create Lead Type
                        </button>
                    </div>

                    <div className='mt-3'>
                        <table className='min-w-full border border-gray-300'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='px-4 py-2 text-left border-b'>Name</th>
                                    <th className='px-4 py-2 text-right border-b'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leadTypes.map(leadType => (
                                    <tr key={leadType.id} className='transition duration-200 hover:bg-gray-100'>
                                        <td className='px-4 py-2 border-b'>{leadType.name}</td>
                                        <td className='px-4 py-2 text-right border-b'>
                                            <button onClick={() => openModal(leadType)} className="text-blue-600 underline hover:text-blue-800">Edit</button>
                                            <button onClick={() => handleDelete(leadType.id)} className="ml-4 text-red-600 underline hover:text-red-800">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for Create/Edit */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold">{selectedLeadTypeId ? 'Edit Lead Type' : 'Create New Lead Type'}</h2>
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Lead Type Name:
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="p-2 mt-4 text-white bg-blue-600 rounded-md"
                        >
                            {selectedLeadTypeId ? 'Update Lead Type' : 'Create Lead Type'}
                        </button>
                        <button
                            onClick={closeModal}
                            type="button"
                            className="p-2 mt-2 text-white bg-red-600 rounded-md"
                        >
                            Close
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default LeadType;
