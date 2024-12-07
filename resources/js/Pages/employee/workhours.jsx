import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { useRef } from "react";
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaList, FaTimes } from "react-icons/fa";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { Link } from "@inertiajs/react";

function screenshot({ user, user_type, notif, emp, hoursByUserAndDate, empi, sd, ed }) {
    const employeeSelectRef = useRef(null);
    const [usrLg, setUsrLg] = useState([]);
    const [modal, setModal] = useState(false);
    const [employee, setEmployee] = useState(empi);
    const [startDate, setStartDate] = useState(sd);
    const [endDate, setEndDate] = useState(ed);
    const logs = Object.entries(hoursByUserAndDate.data);
    useEffect(() => {
        const employeeChoicesInstance = new Choices(employeeSelectRef.current, {
            removeItemButton: true,
            searchEnabled: true,
        });

        return () => {
            employeeChoicesInstance.destroy();
        };
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        Inertia.get('/workhours/employee', { employee_id : employee, start_date: startDate, end_date: endDate });
    };

    function handleLog(e, lgs) {
        setModal(true)
        setUsrLg(lgs)
    }

    function closeLog() {
        setModal(false)
        setUsrLg([])
    }

    const changePage = (page) => {
        Inertia.get('/workhours/employee', { page }, { preserveState: true });
    };
    return (
        <div className="w-[83%] h-full absolute right-0 overflow-hidden">
            <Modal show={modal}>
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-medium">User Logs</h1>
                        <button onClick={() => closeLog()}><FaTimes /></button>
                    </div>
                    <div className="py-3 h-96 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="py-2 px-3 bg-gray-800 text-white rounded-l">#</th>
                                    <th className="py-2 px-3 bg-gray-800 text-white">Type</th>
                                    <th className="py-2 px-3 bg-gray-800 text-white rounded-r">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usrLg && usrLg.map((lg, i) => (
                                        <tr>
                                            <td className="py-2 px-3 text-sm">{i + 1}</td>
                                            <td className="py-2 px-3 text-sm">
                                                {lg.type == "loggedin" ? <span className="bg-green-500 text-white px-3 py-1 rounded">Logged In</span> : <span className="bg-red-500 text-white px-3 py-1 rounded">Logged Out</span>}
                                            </td>
                                            <td className="py-2 px-3 text-sm">{new Date(lg.timestamp).toLocaleString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <form onSubmit={handleFilter} className="w-full flex">
                <div className="w-1/4 p-2 flex flex-col space-y-1">
                    <label htmlFor="employee" className="text-sm font-semibold">
                        Employee
                    </label>
                    <select
                        ref={employeeSelectRef}
                        id="employee"
                        value={employee}
                        onChange={(e) => setEmployee(e.target.value)}
                        className="rounded text-sm"
                    >
                        <option value="">All</option>
                        {emp &&
                            emp.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="w-1/4 p-2 flex flex-col space-y-1">
                    <label htmlFor="start_date" className="text-sm font-semibold">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="rounded text-sm"
                    />
                </div>
                <div className="w-1/4 p-2 flex flex-col space-y-1">
                    <label htmlFor="end_date" className="text-sm font-semibold">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="rounded text-sm"
                    />
                </div>
                <div className="w-1/4 p-2 pb-5 flex items-end gap-2 justify-start">
                    <Link
                        className="rounded bg-red-500 text-white px-4 py-2 text-sm"
                        href="/workhours/employee"
                    >
                        Reset
                    </Link>
                    <button
                        type="submit"
                        className="rounded bg-blue-500 text-white px-4 py-2 text-sm"
                    >
                        Filter
                    </button>
                </div>
            </form>
            <div className="px-2">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-zinc-700 text-white rounded-l">
                                #
                            </th>
                            <th className="py-2 px-4 bg-zinc-700 text-white">
                                Name
                            </th>
                            <th className="py-2 px-4 bg-zinc-700 text-white">
                                Date
                            </th>
                            <th className="py-2 px-4 bg-zinc-700 text-white">
                                Total Work Hours
                            </th>
                            <th className="py-2 px-4 bg-zinc-700 text-white rounded-r">
                                Log Entry
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(logs) &&
                            logs.map((lg, i) => (
                                <tr>
                                    <td className="px-4 py-2 text-sm">
                                        {i + 1}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {lg[1]['name']}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {new Date(lg[1]['date']).toDateString()}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {lg[1]['total_time']}
                                    </td>
                                    <td>
                                        <button onClick={(e) => handleLog(e, lg[1]['logs'])} className="bg-emerald-500 text-white px-2 py-1 rounded">
                                            <FaList />
                                        </button>
                                    </td>
                                    {/* <td className="px-4 py-2 text-sm">
                                        <div>
                                            <button
                                                onClick={(e) =>
                                                    handleDownload(lg[1])
                                                }
                                                className="flex items-center gap-1 bg-blue-500 text-white px-5 py-1 rounded-full"
                                            >
                                                <FaDownload />
                                                <span>Download</span>
                                            </button>
                                        </div>
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination space-x-1 flex justify-center py-4">
                <button className="bg-blue-500 px-3 text-sm py-1 rounded text-white disabled:bg-gray-400"
                    disabled={!hoursByUserAndDate.prev_page_url}
                    onClick={() => changePage(hoursByUserAndDate.current_page - 1)}
                >
                    Prev
                </button>
                <span className="px-4">{hoursByUserAndDate.current_page + " / " + hoursByUserAndDate.last_page}</span>
                <button className="bg-blue-500 px-3 text-sm py-1 rounded text-white disabled:bg-gray-400"
                    disabled={!hoursByUserAndDate.next_page_url}
                    onClick={() => changePage(hoursByUserAndDate.current_page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default screenshot;
