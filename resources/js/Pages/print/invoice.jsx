import { Link } from "@inertiajs/react";
import React from "react";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import num2word from "num2Word";
import { Fragment } from "react";
const Invoice = ({ sale, cst }) => {
    const printInv = useRef();

    function handlePrint(event) {
        event.preventDefault();
        window.print();
    }
    return (
        <div className="grid place-items-center">
            <div className="p-8 w-[800px]">
                <div className="flex flex-col justify-center items-center space-y-1">
                    <h1 className="text-2xl font-bold">{sale && sale.invoice_type == 'pi' ? 'Profoma Invoice' : 'Tax Invoice'}</h1>
                    <p className="text-sm text-gray-600 font-medium">
                        CIN NO. U74999WB2017PTC219565
                    </p>
                    <p className="text-sm text-zinc-800">Service Bill</p>
                </div>
                <div className="border border-black">
                    <div className="w-full flex">
                        <div className="w-1/3 p-3 space-y-2 border-r border-black">
                            <p className="text-sm font-semibold">
                                RSP GREEN DEVELOPMENT & LABORATORIES PVT. LTD.
                            </p>
                            <p className="text-sm text-gray-600">
                                7F, Dinobondhu Mukherjee Lane, Howrah - 711102,
                                West Bengal
                            </p>
                            <p className="text-sm text-blue-600">
                                Email - proyrsp@gmail.com
                            </p>
                            {
                                sale && sale.invoice_type == "tax" && (
                                    <Fragment>
                                        <p className="text-sm text-gray-600">
                                            GST : 19AAICR1289D1Z7
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            SAC No : 999490
                                        </p>
                                    </Fragment>
                                )
                            }
                        </div>
                        <div className="w-1/3 flex flex-col">
                            <div className="h-1/3 p-1 px-2 border-b border-black">
                                <p className="text-sm text-zinc-900 font-bold">
                                    Invoice No.
                                </p>
                                <p className="text-sm">{sale.bill_no}</p>
                            </div>
                            <div className="h-1/3 p-1 px-2 border-b border-black flex items-center">
                                <p className="text-sm">Delivery note : N/A</p>
                            </div>
                            <div className="h-1/3 p-1 px-2 flex items-center">
                                <p className="text-sm">Supplier Ref : N/A</p>
                            </div>
                        </div>
                        <div className="w-1/3 flex flex-col border-l border-black">
                            <div className="h-1/3 p-1 px-2 border-b border-black">
                                <p className="text-sm text-zinc-900 font-bold">
                                    Invoice Date.
                                </p>
                                <p className="text-sm">{new Date(sale.date).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div className="h-1/3 p-1 px-2 border-b border-black">
                                <p className="text-sm text-zinc-900 font-bold">
                                    Mode/Term of payment
                                </p>
                                <p className="text-sm">
                                    Ac. payee Chq./ Online
                                </p>
                            </div>
                            <div className="h-1/3 p-1 px-2 flex items-center">
                                <p className="text-sm">
                                    Others Referenec(S) : N/A
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex border-t border-black">
                        <div className="w-1/3 p-3 space-y-2 border-r border-black">
                            <p className="text-sm font-semibold text-gray-600">
                                Bill To.
                                <br />
                                The,
                                <br />
                                <div className="space-y-1">
                                    <span className="block pt-4 text-gray-800">Name: {cst.name}</span>
                                    <span className="block text-gray-800">Email: {cst.email}</span>
                                    <span className="block text-gray-800">Billing Address: {sale.billing_address}</span>
                                </div>
                            </p>
                        </div>
                        <div className="w-1/3 flex flex-col">
                            <div className="h-40 p-1 px-2 border-b border-black">
                                <p className="text-sm text-zinc-900 font-bold">
                                    Work Order No.
                                </p>
                            </div>
                            <div className="h-1/3 p-1 px-2 border-b border-black flex items-center">
                                <p className="text-sm">
                                    Dispatch Document No : N/A
                                </p>
                            </div>
                            <div className="h-1/3 p-1 px-2 flex items-center">
                                <p className="text-sm">
                                    Terms of delivery: N/A
                                </p>
                            </div>
                        </div>
                        <div className="w-1/3 flex flex-col border-l border-black">
                            <div className="h-40 p-1 px-2 border-b border-black">
                                <p className="text-sm text-zinc-900 font-bold">
                                    Work Order Dt.
                                </p>
                            </div>
                            <div className="h-1/3 p-1 px-2 flex items-center border-b border-black ">
                                <p className="text-sm">
                                    Delivery Note Dt : N/A
                                </p>
                            </div>
                            <div className="h-1/3 p-1 px-2 flex items-center">
                                <p className="text-sm">Designation : N/A</p>
                            </div>
                        </div>
                    </div>
                    <table className="border-t w-full text-left border-black">
                        <thead>
                            <tr>
                                <th className="py-2 px-2 border-r border-b border-black">
                                    SL. No.
                                </th>
                                <th className="py-2 px-2 border-r border-b border-black">
                                    Description Of Service
                                </th>
                                <th className="py-2 px-2 border-r border-b border-black">
                                    Qty
                                </th>
                                <th className="py-2 px-2 border-r border-b border-black">
                                    Contract Value
                                </th>
                                <th className="py-2 px-2 border-r border-b border-black">
                                    Tax
                                </th>
                                <th className="py-2 px-2 border-b border-black">
                                    Amount in Rs.
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sale.sales_details.map((sl, i) => (
                                    <tr>
                                        <td className="py-2 px-2 border-b border-r border-black">
                                            {i + 1}
                                        </td>
                                        <td className="py-2 px-2 border-b border-r border-black">
                                            {sl.product}
                                        </td>
                                        <td className="py-2 px-2 border-b border-r border-black">
                                            {sl.quantity}
                                        </td>
                                        <td className="py-2 px-2 border-b border-r border-black">
                                            &#8377; {sl.amount}
                                        </td>
                                        <td className="py-2 px-2 border-b border-r border-black">
                                            {sl.selectedTaxes && sl.selectedTaxes.length !== 0 ? sl.selectedTaxes.map((t, i) => (<span>{t.name}</span>)) : 'n/a'}
                                        </td>
                                        <td className="py-2 px-2 border-b border-black">
                                            &#8377; {sl.amountWithTax}
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-2 py-2 border-t border-black"
                                ></td>
                                <td className="px-2 py-2 border-t border-l border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-2 py-2 border-t border-b border-black"
                                >
                                    <p className="text-sm font-semibold">
                                        Total Amount : &#8377; {sale.sales_details.reduce((sum, detail) => {
                                            return sum + detail.amountWithTax;
                                        }, 0)}
                                    </p>
                                </td>
                                <td className="px-2 py-2 border-t border-l border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-2 py-2 border-black"
                                >
                                    <p className="text-sm font-semibold capitalize">
                                        Rs. (In Words) : {num2word(sale.sales_details.reduce((sum, detail) => {
                                            return sum + detail.amountWithTax;
                                        }, 0))}
                                    </p>
                                </td>
                                <td
                                    colSpan={2}
                                    className="px-2 py-2 border-t border-l border-black"
                                >
                                    <p className="text-sm font-semibold text-gray-700">
                                        FOR RSP GREEN DEVELOPMENT AND
                                        LABORATORIES PVT. LTD.
                                    </p>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                {
                                    sale && sale.invoice_type == "tax" && (
                                        <div className="text-[13px] font-semibold p-3 w-96 text-gray-600">
                                            <p>Note : Bill Not paid within due date of issued then 2% interest will be charged as per MSME Rules.<br/> All disputes subject to Jurisdiction only.</p>
                                        </div>
                                    )}
                                <div className="py-2 px-3 space-y-1">
                                    <p className="text-sm font-semibold">Company Bank Details</p>
                                    <p className="text-sm text-gray-600">RSP GREEN DEVELOPMENT & LABORATORIES PVT. LTD.</p>
                                    <p className="text-sm space-x-1"><span className="font-semibold">Bank Name :</span><span>ICICI Bank</span></p>
                                    <p className="text-sm space-x-1"><span className="font-semibold">A/c No :</span><span>416505000037</span></p>
                                    <p className="text-sm space-x-1"><span className="font-semibold">IFSC Code :</span><span>ICIC0004165</span></p>
                                    <p className="text-sm space-x-1"><span className="font-semibold">Branch :</span><span>Mandirtala</span></p>
                                </div>
                            </td>
                            <td colSpan={2}>
                                <p className="text-sm font-medium">Authorized Signatory</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="py-8 flex justify-center items-center gap-2 print:hidden">
                    <button onClick={handlePrint} className="flex gap-1 items-center bg-gray-600 px-5 py-1.5 rounded text-white">
                        <FaPrint />
                        <span>Print</span>
                    </button>
                    <Link href="/sales" className="bg-red-500 text-white px-5 py-1.5 block rounded">Back</Link>
                </div>
            </div>

        </div>
    );
};

export default Invoice;
