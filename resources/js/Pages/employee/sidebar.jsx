
import { Link } from "@inertiajs/react";
import React,{useEffect,useState} from "react"
const Sidebar = () => {
  return (
    <div className="w-64 h-screen p-4 bg-teal-700">
      <ul className="space-y-2">
        <li className="font-medium text-white"> <Link href="/branches">Branch</Link>  </li>
        <li className="text-gray-300 hover:text-white"> <Link href="/departments">Department</Link></li>
        <li className="text-gray-300 hover:text-white">Designation</li>
        <li className="text-gray-300 hover:text-white"> <Link href="/leave-type">Leave Type</Link></li>
        <li className="text-gray-300 hover:text-white"> <Link href="/documents">Document Type</Link></li>
        <li className="text-gray-300 hover:text-white"><Link href="/payslips">Payslip Type</Link> </li>
        {/* <li className="text-gray-300 hover:text-white">Allowance Option</li> */}
        {/* <li className="text-gray-300 hover:text-white">Loan Option</li> */}
      </ul>
    </div>
  );
};

export default Sidebar
