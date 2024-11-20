import React, { useState, useEffect } from 'react';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

const notyf = new Notyf();

function Index({ user, user_type, notif, leads = [] }) {

    const dummyLeads = [
        { id: 1, name: 'John Doe', subject: 'Website Development', lead_stage: 'Negotiation', lead_source: 'Email', status: 'Active', timestamp: '2024-11-19 10:00 AM' },
        { id: 2, name: 'Jane Smith', subject: 'Mobile App Design', lead_stage: 'Qualified', lead_source: 'LinkedIn', status: 'Pending', timestamp: '2024-11-18 3:45 PM' },
        { id: 3, name: 'Samuel Green', subject: 'SEO Optimization', lead_stage: 'Prospecting', lead_source: 'Referral', status: 'Active', timestamp: '2024-11-17 2:30 PM' },
        { id: 4, name: 'Emily Brown', subject: 'E-commerce Store', lead_stage: 'Closed Won', lead_source: 'Website', status: 'Closed', timestamp: '2024-11-16 1:15 PM' },
        { id: 5, name: 'Michael Johnson', subject: 'Marketing Campaign', lead_stage: 'Follow-up', lead_source: 'Facebook', status: 'Active', timestamp: '2024-11-15 4:20 PM' },
    ];

    const [query, setQuery] = useState('');
    const [filteredLeads, setFilteredLeads] = useState(leads.length > 0 ? leads : dummyLeads); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    useEffect(() => {
        const filtered = filteredLeads.filter(lead =>
            lead.name?.toLowerCase().includes(query.toLowerCase()) ||
            lead.subject?.toLowerCase().includes(query.toLowerCase()) ||
            lead.lead_stage?.toLowerCase().includes(query.toLowerCase()) ||
            lead.lead_source?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredLeads(filtered);
    }, [query, leads]);

    const indexOfLastLead = currentPage * itemsPerPage;
    const indexOfFirstLead = indexOfLastLead - itemsPerPage;
    const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleSearch = (event) => {
        setQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this lead?')) {
            const updatedLeads = filteredLeads.filter(lead => lead.id !== id);
            setFilteredLeads(updatedLeads);
            notyf.success('Lead deleted successfully.');
        }
    };

    return (
        <div className="w-[85.2%] absolute right-0 overflow-hidden">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="table-section border-[#0A1B3F] py-3 px-8 rounded-b-md">
                <div className="flex justify-between">
                    <div className="w-[40%]">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search leads..."
                            className="p-2 border rounded-md w-[80%]"
                        />
                    </div>
                    <div className="px-4">
                        <Link href="/lead/create" className="flex space-x-2 underline">
                            <span className="font-bold">Create New Lead</span>
                        </Link>
                    </div>
                </div>
                <br />
                <table className="table w-full p-4 border">
                    <thead className="border bg-[#0A1B3F] text-white">
                        <tr>
                            <th className="p-3 text-left border">NAME</th>
                            <th className="p-3 text-left border">SUBJECT</th>
                            <th className="p-3 text-left border">LEAD STAGE</th>
                            <th className="p-3 text-left border">LEAD SOURCE</th>
                            <th className="p-3 text-left border">STATUS</th>
                            <th className="p-3 text-left border">TIMESTAMP</th>
                            <th className="p-3 text-left border">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLeads.length > 0 ? (
                            currentLeads.map(lead => (
                                <tr key={lead.id}>
                                    <td className="p-3 border">{lead.name}</td>
                                    <td className="p-3 border">{lead.subject}</td>
                                    <td className="p-3 border">{lead.lead_stage}</td>
                                    <td className="p-3 border">{lead.lead_source}</td>
                                    <td className="p-3 border">{lead.status}</td>
                                    <td className="p-3 border">{lead.timestamp}</td>
                                    <td className="border">
                                        <div className="flex justify-center space-x-3">
                                            <Link
                                                className="text-green-800 text-[1.1rem] bg-[#0C7785] p-1 rounded-md"
                                                href={`leads-edit/${lead.id}`}>
                                                <CiEdit className="text-white" />
                                            </Link>
                                            <button
                                                className="text-white text-[1.1rem] bg-[#FF3A6E] p-1 rounded-md"
                                                onClick={(e) => handleDelete(e, lead.id)}>
                                                <RiDeleteBinLine />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-3 text-center">No leads found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`px-4 py-2 mx-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Index;
