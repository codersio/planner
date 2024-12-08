import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { useRef } from "react";
import { useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import { usePage,Link } from "@inertiajs/react";
import { useState } from "react";

function screenshot({ user, user_type, notif, emp, imgs, empi, sd, ed }) {
    const employeeSelectRef = useRef(null);
    const imgArray = Object.entries(imgs);
    const [employee, setEmployee] = useState(empi);
    const [startDate, setStartDate] = useState(sd);
    const [endDate, setEndDate] = useState(ed);
    console.log(imgArray);
    useEffect(() => {
        const employeeChoicesInstance = new Choices(employeeSelectRef.current, {
            removeItemButton: true,
            searchEnabled: true,
        });

        return () => {
            employeeChoicesInstance.destroy();
        };
    }, []);

    const handleDownload = (images) => {
        Inertia.post(
            "/bulk/download",
            { images },
            {
                onSuccess: () => {
                    console.log("download");
                },
                onError: (error) => {
                    console.error("Error during file generation:", error);
                },
            }
        );
    };

    const handleFilter = (e) => {
        e.preventDefault();
        Inertia.get('/screenshot/employee', { employee_id : employee, start_date: startDate, end_date: endDate });
    };

    return (
        <div className="w-[83%] h-full absolute right-0 overflow-hidden">
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
                        href="/screenshot/employee"
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
                                Timestamp
                            </th>
                            <th className="py-2 px-4 bg-zinc-700 text-white rounded-r">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(imgArray) &&
                            imgArray.map((im, i) => (
                                <tr>
                                    <td className="px-4 py-2 text-sm">
                                        {i + 1}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {new Date(im[0]).toDateString()}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        <div>
                                            <button
                                                onClick={(e) =>
                                                    handleDownload(im[1])
                                                }
                                                className="flex items-center gap-1 bg-blue-500 text-white px-5 py-1 rounded-full"
                                            >
                                                <FaDownload />
                                                <span>Download</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default screenshot;
