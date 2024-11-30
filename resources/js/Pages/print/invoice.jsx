import React from "react";
import { useRef } from "react";

const Invoice = () => {
    const printInv = useRef()

    function handlePrint(event){
        event.preventDefault()
        window.print();
    }
    return (
        <div className="py-4">
            <div ref={printInv} className="max-w-4xl mx-auto bg-white p-8">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <img
                        src="https://rsp1.equi.co.in/image/WhatsApp%20Image%202024-10-08%20at%2014.58.36_e0e7cbb8.jpg"
                        alt="Description"
                        className="w-24"
                    />
                    <div className="text-right">
                        <p>
                            Invoice No:{" "}
                            <span className="font-medium text-gray-600">
                                IVVP52123024
                            </span>
                        </p>
                        <p>
                            Date:{" "}
                            <span className="font-medium text-gray-600">
                                05/12/2022
                            </span>
                        </p>
                        <p>
                            Order No:{" "}
                            <span className="font-medium text-gray-500">
                                180945053
                            </span>
                        </p>
                    </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <h4 className="font-bold mb-2">From:</h4>
                        <p>Admin</p>
                        <p>admin@admin.com</p>
                        {/* <p>HP12 3JL</p>
                        <p>Thailand</p> */}
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">To:</h4>
                        <p>John Doe</p>
                        <p>test@example.com</p>
                        <p>Acropolis Mall, Rajdanga Road, Kolkata</p>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                QTY
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Price
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Sub Total
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Tax
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-right">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                Product Name 1
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                1
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                &#8377; 1200.25
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                &#8377; 1200.25
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                &#8377; 8.25
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                &#8377; 1208.50
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                Product Name 2
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                1
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                &#8377; 1400.00
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                &#8377; 1400.00
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                &#8377; 8.25
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                &#8377; 8.25
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Total */}
                <div className="flex justify-end">
                    <p className="text-lg font-bold">
                        Total:{" "}
                        <span className="text-blue-600">&#8377; 12.00</span>
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p className="italic text-rose-500">
                        Note: This is a computer-generated receipt and does not
                        require a physical signature.
                    </p>
                    <button onClick={handlePrint} className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 print:hidden">
                        Print & Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
