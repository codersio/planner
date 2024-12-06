import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { useRef } from "react";
import { useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

function screenshot({ user, user_type, notif, emp, imgs }) {
    const employeeSelectRef = useRef(null);
    const imgArray = Object.entries(imgs);
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
                   console.log("downloaad")
                },
                onError: (error) => {
                    console.error("Error during file generation:", error);
                },
            }
        );
    };
    return (
        <div className="w-[83%] h-full absolute right-0 overflow-hidden">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="w-full flex">
                <div className="w-1/4 p-2 flex flex-col space-y-1">
                    <label htmlFor="" className="text-sm font-semibold">
                        Employee
                    </label>
                    <select
                        ref={employeeSelectRef}
                        name=""
                        id=""
                        className="rounded text-sm"
                    >
                        {emp &&
                            emp.map((e, i) => (
                                <option key={i} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="w-1/4 p-2 flex flex-col space-y-1">
                    <label htmlFor="" className="text-sm font-semibold">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name=""
                        id=""
                        className="rounded text-sm"
                    />
                </div>
                <div className="w-1/4 p-2 flex flex-col space-y-1">
                    <label htmlFor="" className="text-sm font-semibold">
                        End Date
                    </label>
                    <input
                        type="date"
                        name=""
                        id=""
                        className="rounded text-sm"
                    />
                </div>
            </div>
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
