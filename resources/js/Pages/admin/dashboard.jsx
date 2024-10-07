import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav';
import { Link } from '@inertiajs/react';
import React,{useState,useEffect} from 'react'
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import AssignView from './asignview';
const Employee = ({ user, employee,user_type,projects,query ,usrrr,projectsss,taskss,holidays,leave,notif,assin,emp,results,projecteach,totalHours }) => {

    const [permissions, setPermissions] = useState([]);
    useEffect(() => {
        if (Array.isArray(user_type)) {
            setPermissions(user_type);
        } else {
            console.error('Expected user_type to be an array:', user_type);
        }
    }, [user_type]);
    return (

        <div className='w-[85.2%] absolute right-0 overflow-hidden' onClick={(e) => setNotifyModal(!notifyModal)}>
       <Header user={user} notif={notif} />
       <Nav user_type={user_type}/>
            <div className='px-8 table-section rounded-b-md'>
                <div className='w-full '>
                    <div className='grid grid-cols-4'>
                    <Link href='projects'>
                        <div className="w-[80%] grid place-items-center  shadow-md p-[2rem] bg-[#63D9CA] ">
                        <h1 className='text-[1.5rem] text-white'>{usrrr === 1 ? <p>{projectsss}</p>:<p>{projecteach}</p>}</h1>
                        <h1 className='text-white text-[1.2rem]'>Total Project</h1>


                         </div>
</Link>
<Link href='project-task-assign'>
    <div className="w-[80%] grid place-items-center  shadow-md p-[2rem] bg-[#FAAE42]">
        {/* <FaTasks/> */}
        {/*<h1 className='text-[1.5rem] text-white'>{taskss}</h1>*/}
        <h1 className=''>{usrrr === 1 ? <p className='text-[1.5rem] text-white'>{taskss}</p>:<p> <span className='text-[1rem] text-white'>Assigned hours-{results}</span> <span className='text-[1rem] text-white'>Worked hours-{totalHours}</span>{}</p>}</h1>
        <h1 className='text-white text-[1.2rem]'>{usrrr === 1 ? <p>Total Task</p>:''}</h1>

    </div>
</Link>
                        <Link href='holi-day'>
                            <div className="w-[80%] grid place-items-center  shadow-md p-[2rem] bg-[#2DCE89] ">
<h1 className='text-[1.5rem] text-white'>{holidays}</h1>
                         <h1 className='text-white text-[1.2rem]'>Holidays </h1>

</div></Link>
 <div className='w-[80%] grid place-items-center shadow-lg p-4 bg-[#F5365C] text-white'>
 <h1 className='text-[1.5rem] text-white'>{leave}</h1>

<h1 className='text-white text-[1.2rem]'>On Leave</h1>
                </div>

                    </div>
                </div>

            </div>

           <div className='px-8 '>
           {/* <div className='text-[1.2rem]   '>
           <div>
           <h1 className='py-5 underline'>Project Overview</h1>
           <div>
           <table className="table w-full p-4 border">
                    <thead className='border bg-[#465584] text-white'>
                        <tr>
                            <th className='p-2 text-left border text-[1rem] '>Project Name</th>
                            {
                                permissions.includes('view_assign') && (
                                    <th className='p-2 text-left border text-[1rem]'>Employee Name</th>
                                )
                            }

                            <th className='p-2 text-left border text-[1rem]'>Assign Task</th>
                            <th className='text-left border text-[1rem]'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(emp => (
                            <tr key={emp.id}>
                                <td className='p-2 border text-[1rem]'>
                                    <Link href={`/projects-show/${emp.id}`}>{emp.title}</Link>
                                </td>
                                {
                                permissions.includes('view_assign') && (
                                    <td className='p-2 border text-[1rem]'>{emp.name}</td>
                                )
                            }

                                <td className='p-2 border text-[1rem]'>{emp.task_name}</td>

                                        <td className='p-2 border text-[1rem]'>
                                            <p> {emp.status=== "0" ? <span className='text-red-500'>Pending</span> :
                                                emp.status === "1" ?  <span className='text-yellow-500'>In Progress</span>  :
                                                emp.status === "2" ? <span className='text-yellow-500'>Open</span> :
                                                emp.status === "3" ? <span className='text-yellow-500'>Close</span> :
                                                ""}</p>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
           </div>


           </div> */}

            {
                    permissions.includes('edit_task') ? (
                       <AssignView assin={assin} emp={emp}/>
                    ) : (
                        ''
                    )
                }


           <div className='py-7'>
              <h1 className='underline py-5 ml-5 text-[1.2rem]'>Project Reports</h1>
           <table className='w-[98%] px-8 ml-5 '>
                <thead className='w-full px-8'>
                    <tr className='border p-2 text-left bg-[#465584] text-white'>
                        {
                            usrrr===1?<th className='p-2 text-left border'>Employee Name</th>:''
                        }

                    <th className='p-2 text-left border'>Project Title</th>
                        <th className='p-2 text-left border'>Task Name</th>

                        <th className='p-2 text-left border'>Assign hours</th>
                        <th className='p-2 text-left border'>Time Spent(hours)</th>
                    </tr>
                </thead>
                <tbody>
                     {query.map((timesheet, index) => (
                        <tr key={index}>
                       {
                        usrrr===1?            <td   style={{
                            color: timesheet.time_number > 8 ? 'green' :
                                   timesheet.time_number < 0 ? 'red' :
                                   'black',
                            backgroundColor: timesheet.time_number > 8 ? '#e0f7e0' :
                                              timesheet.time_number < 0 ? '#f7e0e0' :
                                              '#f7e0e0',
                        }} className='p-2 text-left border border-blue-400'>{timesheet.name}</td>:''
                       }

                            <td   style={{
                    color: timesheet.time_number > 8 ? 'green' :
                           timesheet.time_number < 0 ? 'red' :
                           'black',
                    backgroundColor: timesheet.time_number > 8 ? '#e0f7e0' :
                                      timesheet.time_number < 0 ? '#f7e0e0' :
                                      '#f7e0e0',
                }} className='p-2 text-left border border-blue-400'>{timesheet.title}</td>
                       <td   style={{
                    color: timesheet.time_number > 8 ? 'green' :
                           timesheet.time_number < 0 ? 'red' :
                           'black',
                    backgroundColor: timesheet.time_number > 8 ? '#e0f7e0' :
                                      timesheet.time_number < 0 ? '#f7e0e0' :
                                      '#f7e0e0',
                }} className='p-2 text-left border border-blue-400'>{timesheet.task_name}</td>
                            <td   style={{
                    color: timesheet.time_number > 8 ? 'green' :
                           timesheet.time_number < 0 ? 'red' :
                           'black',
                    backgroundColor: timesheet.time_number > 8 ? '#e0f7e0' :
                                      timesheet.time_number < 0 ? '#f7e0e0' :
                                      '#f7e0e0',
                }} className='p-2 text-left border border-blue-400'>{timesheet.employee_hours}</td>
                            <td
                className='p-2 text-left border border-blue-400'
                style={{
                    color: timesheet.time_number > 8 ? 'green' :
                           timesheet.time_number < 0 ? 'red' :
                           'black',
                    backgroundColor: timesheet.time_number > 8 ? '#e0f7e0' :
                                      timesheet.time_number < 0 ? '#f7e0e0' :
                                      '#f7e0e0',
                }}
            >
                {timesheet.total_time_number}
            </td>

            {/* <td
                className='p-2 text-left border border-blue-400'
                style={{
                    color: timesheet.time_number > 8 ? 'green' :
                           timesheet.time_number < 0 ? 'red' :
                           'black',
                    backgroundColor: timesheet.time_number > 8 ? '#e0f7e0' :
                                      timesheet.time_number < 0 ? '#f7e0e0' :
                                      '#f7e0e0',
                }}
            >
                {timesheet.description}
            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
           </div>
           </div>
        </div>
    )
}

export default Employee;
