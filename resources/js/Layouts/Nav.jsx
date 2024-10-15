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
    const [toggle, SetToggle] = useState(true)
    const [dropdown, setDropdown] = useState(false)
    const { url, component } = usePage()
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
        { name:'Salary generate',link:'/salaries' },
        { name:'payroll',link:'/payroll' },
    ]

    return (
        <nav className='grid p-5 place-items-center '>
            {/* <ul className=''>

                <li className={url === '' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-black' : ' p-2 cursor-pointer tex0.9hite text-[0.7rem]'} onClick={(e)=>SetToggle(!toggle)}>
                    menu
                </li>
            </ul> */}

            <div className={
                toggle ? 'modal menu fixed transition delay-700 block duration-700 ease-in shadow-md bg-white  w-[15%] justify-end slide-right-to-left  left-0 bottom-0 top-0' :
                    'modal menu absolute hidden bg-gray-800  w-[10rem] duration-700 ease-in-out delay-700 justify-end    bottom-0 top-0'
            }>
                <ul>
                    <div className="p-2 logo">
                        <img src="/SCS-01-removebg-preview.png" alt="Description" className="w-[85%]" />

                    </div>
                    <DropdownMenu icon={<FaHome />} name={'HRMS'} items={menuitems} />
                    {/* <li className={url === '/dashboard' ? 'active bg-[#0A1B3F] p-2 text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                            <Link href='/dashboard' className='flex space-x-2'> <span className='grid place-items-center' > <FaHome/> </span> <span>Dashboard</span></Link>
                        </li> */}
                    {/* {
                    permissions.includes('view_employee') ? (
                        <li   className={url === '/employees' ? 'active bg-[#0A1B3F] p-2 mt-3    text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                             <Link href='/employees' className='flex space-x-2'> <span className='grid place-items-center'><FaUserCircle/></span> <span className='grid place-items-center'>Employees</span></Link>
                        </li>
                    ) : (
                        ''
                    )
                } */}
                    {/* {
                    permissions.includes('view_project') && (
                        <li className={url === '/projects' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                            <Link href='/projects' className='flex space-x-2'> <span className='grid place-items-center' > <GoProjectSymlink/> </span> <span>Projects</span></Link>
                        </li>
                    )
                } */}
                    {/* {
                    permissions.includes('view_project') && (
                        <li className={url === '/assign-employeeproject' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                            <Link href='/assign-employeeproject' className='flex space-x-2'> <span className='grid place-items-center' > <GoProjectSymlink/> </span> <span>Projects Assigned</span></Link>
                        </li>
                    )
                } */}
                    {/* {
                    permissions.includes('view_task') && (
                        <li className={url === '/projects-task' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                            <Link href='/projects-task' className='flex space-x-2'> <span className='grid place-items-center'><FaTasks /></span><span> Task</span></Link>
                        </li>
                    ) */}

                    {/* {
                    permissions.includes('view_timsheet') && (
                           <li className={url === '/daily-status' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                    <Link href='/daily-status' className='flex space-x-2'> <span className='grid place-items-center'> <IoTimeOutline/> </span> <span>TimeSheet</span></Link>
                </li>
                    )
                } */}
                    {/* <li className=' p-1 px-5 text-black text-[0.7rem]'>Weekly Status</li> */}

                    {/* {
                    permissions.includes('view_leave') ? (
                        <li className={url === '/leave-index' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-black' : ' p-2  text-black text-[0.9rem]'}>
                            <Link href='/leave-index'>Leave </Link>
                        </li>
                    ): permissions.includes('view_employeelave') ?<li className={url === '/leave-index' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-black' : ' p-2  text-black text-[0.9rem]'}>
                            <Link href='/leave-index'>Leave </Link>
                        </li>:''
                } */}

                    {/* <li className={url === '/profile' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-black' : ' p-2  text-black text-[0.9rem]'}>
                     <Link href='/profile'>Profile</Link>
                 </li> */}
                    {/* {
                    permissions.includes('view_leave') && (
                        <li className={url === '/leave-index' ? 'active bg-[#0A1B3F] p-2   text-[0.7rem] text-white' : ' p-2   text-black text-[0.9rem]'}>
                            <Link href='/leave-index' className='flex space-x-2'> <span className='grid place-items-center'> <FcLeave/> </span> <span>Leave</span> </Link>
                        </li>
                    )
                } */}
                    {/* {
                    permissions.includes('view_holiday') && (
                        <li className={url === '/holi-day' ? 'active bg-[#0A1B3F] p-2  text-[0.9rem] text-white' : ' p-2   text-black text-[0.9rem]'}>
                            <Link href='/holi-day' className='flex space-x-2'> <span className='grid place-items-center'>
                              <span className='grid place-items-center'>
                              <MdHolidayVillage/>
                              </span>
                            </span> <span> Holiday </span> </Link>
                        </li>
                    )
                } */}
                    {
                        permissions.includes('view_role') && (
                            <li className={url === '/roles-permission-details' ? 'active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white' : ' p-2    text-black text-[0.9rem]'}>
                                <Link href='/roles-permission-details' className='flex space-x-2'> <span> <FaHandPaper /></span> <span>Roles</span> </Link>
                            </li>
                        )
                    }
                    <DropdownMenu icon={<FaFolderClosed />} name={'Project Management'} items={[{name:'Projects',link:'/projects'},{name:'Tasks',link:'/projects-task'},{name:'Task Calendar',link:'/taskcalendar'},{name:'Reports',link:'/reports-get'}]} />
                    <DropdownMenu icon={<FaUsers />} name={'User Management'} items={[{name:'User',link:'#'},{name:'Client',link:'#'},{name:'Agent',link:'#'}]} />
                    {/* {
                    permissions.includes('view_report') && (
                        <li className={url === '/reports-get' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                            <Link href='/reports-get' className='flex space-x-2'> <span className='grid place-items-center'><MdOutlineReport/></span> <span>Report</span></Link>
                        </li>
                    )
                } */}
                    {/* {

                     permissions.includes('view_employee') && (
                         <li className={url === '/assign-employee' ? 'active bg-[#0A1B3F] p-2    text-[0.9rem] text-white' : ' p-2  text-black text-[0.9rem]'}>
                             <Link href='/assign-employee' className='flex space-x-2'> <span className='grid place-items-center'><MdOutlineReport/></span> <span>Employee hours</span></Link>
                         </li>
                     )
                 } */}
                    {/* <li className={url === '/project-task-assign' ? 'active bg-[#0A1B3F] p-2  text-[0.9rem] text-black' : ' p-2    text-black text-[0.9rem]'}>
                     <Link href='/project-task-assign' >Task Assign</Link>
                 </li> */}

                </ul>
            </div>
        </nav>
    );
};

export default Nav;
