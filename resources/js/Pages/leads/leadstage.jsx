import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import Modal from '@/Components/Modal';

function LeadStage({ user, notif, user_type, leadStages }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStageId, setSelectedStageId] = useState(null);

    const notyf = new Notyf();

    const { data, setData, post, put, reset, errors } = useForm({
        name: '',
    });

    // Open modal for creating or editing a lead stage
    const openModal = (stage = null) => {
        setIsModalOpen(true);
        setData('name', stage ? stage.name : '');
        setSelectedStageId(stage ? stage.id : null);
    };

    // Close modal and reset form
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStageId(null);
        reset('name');
    };

    // Handle form submission for creating or updating
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedStageId) {
            put(route('leadstages.update', selectedStageId), {
                onSuccess: () => {
                    notyf.success('Lead stage updated successfully!');
                    closeModal();
                },
            });
        } else {
            post(route('leadstages.store'), {
                onSuccess: () => {
                    notyf.success('Lead stage created successfully!');
                    closeModal();
                },
            });
        }
    };

    // Handle deletion of a lead stage
    const handleDelete = (stageId) => {
        if (confirm('Are you sure you want to delete this stage?')) {
            route('leadstages.destroy', stageId, {
                method: 'delete',
                onSuccess: () => {
                    notyf.success('Lead stage deleted successfully!');
                },
            });
        }
    };

    return (
        <div className='w-[85.2%] ml-[11.5rem]'>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />

            <div className="flex px-9">
                <div className="w-64 h-screen p-4 bg-teal-700">
                    <ul className="space-y-2">
                        <li className="text-gray-300 hover:text-white">
                            <Link href="/leadtypes">Lead Type</Link>
                        </li>
                        <li className="font-medium text-white">
                            <Link href="/leadstages">Lead Stage</Link>
                        </li>
                        <li className="text-gray-300 hover:text-white">
                            <Link href="/leadsources">Sources</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex-1 p-6 bg-gray-100">
                    <div className='flex justify-between'>
                        <h1 className="mb-4 text-2xl font-bold">Lead Stage</h1>
                        <button
                            onClick={() => openModal()}
                            className="p-2 text-teal-900 underline rounded-md"
                        >
                            Create Stage
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
                                {leadStages.map((stage) => (
                                    <tr key={stage.id}>
                                        <td className='px-4 py-2 border-b'>{stage.name}</td>
                                        <td className='px-4 py-2 text-right border-b'>
                                            <button
                                                onClick={() => openModal(stage)}
                                                className="px-2 py-1 text-white bg-blue-500 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stage.id)}
                                                className="px-2 py-1 ml-2 text-white bg-red-500 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for creating/editing lead stage */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold">{selectedStageId ? 'Edit Stage' : 'Create New Stage'}</h2>
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Stage Name:
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
                            {selectedStageId ? 'Update Stage' : 'Create Stage'}
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

export default LeadStage;
