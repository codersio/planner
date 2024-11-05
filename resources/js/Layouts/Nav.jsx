import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { FaUserCircle, FaTasks, FaUsers } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { MdHolidayVillage } from "react-icons/md";
import { FaHandPaper } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import DropdownMenu from '@/Components/DropdownMenu';
import { FaFolderClosed } from 'react-icons/fa6';
const Nav = ({ user_type }) => {
    const [permissions, setPermissions] = useState([]);
    const [toggle, SetToggle] = useState(true);
    const { url } = usePage();

    useEffect(() => {
        if (Array.isArray(user_type)) {
            setPermissions(user_type);
        } else {
            console.error('Expected user_type to be an array:', user_type);
        }
    }, [user_type]);

    const menuitems = [
        { name: 'employees', link: "/employees" },
        { name: 'leave management', link: "/leave-index" },
        { name: 'employee setup', link: "/branches" },
        { name: 'attendance', link: "/attendance" },
        { name: 'Salary generate', link: '/salaries' },
        { name: 'payroll', link: '/payroll' },
    ];

    return (
        <nav className='grid p-5 place-items-center'>
            <div className={
                toggle ? 'modal menu fixed transition delay-700 block duration-700 ease-in shadow-md bg-white w-[17%] justify-end slide-right-to-left left-0 bottom-0 top-0' :
                    'modal menu absolute hidden bg-gray-800 w-[10rem] duration-700 ease-in-out delay-700 justify-end bottom-0 top-0'
            }>
                <ul>
                    <div className="p-2 logo">
                        <img src="/SCS-01-removebg-preview.png" alt="Description" className="w-[85%]" />
                    </div>
                    <DropdownMenu icon={<FaHome />} name={'HRMS'} items={menuitems} />
                    {
                        permissions.includes('view_role') && (
                            <li className={url === '/roles-permission-details' ? 'active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white' : 'p-2 text-black text-[0.9rem]'}>
                                <Link href='/roles-permission-details' className='flex space-x-2'> <span> <FaHandPaper /></span> <span>Roles</span> </Link>
                            </li>
                        )
                    }
                    <DropdownMenu icon={<FaFolderClosed />} name={'Project Management'} items={[
                        { name: 'Projects', link: '/projects' },
                        { name: 'Tasks', link: '/projects-task' },
                        { name: 'Task Calendar', link: '/taskcalendar' },
                        { name: 'Reports', link: '/reports-get' }
                    ]} />
                    <DropdownMenu
                        icon={<FaUsers />}
                        name={'Account System'}
                        items={[
                            { name: 'Client', link: '/clients' },
                            {
                                name: 'Purchases',
                                subItems: [
                                    { name: 'Expense', link: '/purchases/expense' },
                                    { name: 'Bill', link: '/purchases/bill' },
                                    { name: 'Payment', link: '/purchases/payment' },
                                    { name: 'Credit Note', link: '/purchases/credit-note' },
                                    { name: 'Debit Note', link: '/purchases/debit-note' }
                                ]
                            },
                            {
                                name: 'Double Entry',
                                subItems: [
                                    { name: 'chart of account', link: '/finance/double-entry' },
                                    { name: 'Journal Account', link: '/finance/budget-management' },
                                    { name: 'Ledger Summery', link: '/finance/budget-management' },
                                    { name: 'Balance sheet', link: '/finance/budget-management' },
                                ]
                            },
                             {
                                name: 'Budget ',link:'/bduget'
                                // subItems: [
                                //     { name: 'chart of account', link: '/finance/double-entry' },
                                //     { name: 'Journal Account', link: '/finance/budget-management' },
                                //     { name: 'Ledger Summery', link: '/finance/budget-management' },
                                //     { name: 'Balance sheet', link: '/finance/budget-management' },
                                // ]
                            },
                            { name: 'Accounting Setup', link: '/tax' }
                        ]}
                    />

                      <DropdownMenu icon={<FaFolderClosed />} name={'CRM'} items={[
                        { name: 'leads', link: '/projects' },
                        { name: 'Deals', link: '/projects-task' },
                        { name: 'Contract', link: '/taskcalendar' },
                        // { name: 'Reports', link: '/reports-get' }
                    ]} />
                </ul>
            </div>
        </nav>
    );
};


export default Nav;
