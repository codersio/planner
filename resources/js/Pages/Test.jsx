import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import { useForm } from '@inertiajs/inertia-react';
import moment from 'moment';
import { CgPlayTrackNextO } from "react-icons/cg";
import { BiSkipPreviousCircle } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
const YourComponent = ({ leave, initialWeekData,user,user_type,holiday }) => {
    // State to manage the start date of the current week
    const [startDate, setStartDate] = useState(new Date());
    const [noData, setNoData] = useState(false);
    // State to manage week data and projects/tasks
    const [weekData, setWeekData] = useState([]);
    const [projects, setProjects] = useState([]);
    const [taskMapping, setTaskMapping] = useState({});
    const { data, setData, post, errors } = useForm({
        timesheets: [],
    });
    useEffect(() => {
        axios.get('/getProjectTasks')
            .then(response => {
                console.log('Full Response:', response); // Check if the structure is correct
                const data = response.data || {}; // Adjusted to match the expected structure
                setTaskMapping(data);

                // Populate projects for the dropdown
                setProjects(Object.keys(data).map(projectId => ({
                    id: projectId,
                    project_name: data[projectId].project_name
                })));
            })
            .catch(error => console.error('Error fetching project tasks:', error));
    }, []);
   
    const [selectedWeek, setSelectedWeek] = useState(moment().startOf('isoWeek').format('YYYY-MM-DD'));

    useEffect(() => {
        fetchWeekData(selectedWeek);
    }, [selectedWeek]);

    const fetchWeekData = (week) => {
        axios.get(`/timesheets/${week}`)
            .then(response => {
                const fetchedData = response.data.map(entry => ({
                    ...entry,
                    date: entry.date || getCurrentDate(0) // Add date if not present
                }));
                // const fetchedData = response.data;
                if (fetchedData.length === 0) {
                    setNoData(true);
                } else {
                    setNoData(false);
                    setWeekData(fetchedData);
                    setData('timesheets', fetchedData);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the timesheet data!', error);
            });
    };
    // Function to calculate the date for each day of the current week
    const getCurrentDate = (i) => {
        return moment(selectedWeek).startOf('isoWeek').add(i, 'days').format('YYYY-MM-DD');
    };

    // Functions to navigate between weeks
    const handlePreviousWeek = () => {
        setSelectedWeek(moment(selectedWeek).subtract(1, 'weeks').format('YYYY-MM-DD'));
    };

    const handleNextWeek = () => {
        setSelectedWeek(moment(selectedWeek).add(1, 'weeks').format('YYYY-MM-DD'));
    };
    // const [holidays, setHolidays] = useState([]);
    // Helper function to check if a date is within the leave range
    const leaveStartDate = new Date(leave.sdate);
    const leaveEndDate = new Date(leave.edate);
    const isDisabled = (date) => {
        const currentDate = new Date(date);
        return currentDate >= leaveStartDate && currentDate <= leaveEndDate;
    };
    // const [holidays] = useState([
    //     { start_date: '2024-08-05', end_date: '2024-08-06' },
    //     { start_date: '2024-08-15', end_date: '2024-08-16' }
    // ]);
    const isHoliday = (date) => {
        return holiday.some(holiday => {
            const startDate = moment(holiday.start_date, 'YYYY-MM-DD');
            const endDate = moment(holiday.end_date, 'YYYY-MM-DD');
            const currentDate = moment(date, 'YYYY-MM-DD');
            console.log('Holiday check: ', {
                currentDate: currentDate.format('YYYY-MM-DD'),
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD')
            });
            return currentDate.isBetween(startDate, endDate, 'day', '[]');
        });
    };
    // Function to handle project selection
    const handleProjectChange = (index, projectId) => {
        const newWeekData = [...weekData];
        newWeekData[index] = {
            ...newWeekData[index],
            project_id: projectId,
            task_id: '', // Reset task_id when a new project is selected
        };
        setWeekData(newWeekData);
        setData('timesheets', newWeekData);
    };

    // Function to handle task selection
    const handleTaskChange = (index, taskId) => {
        const newWeekData = [...weekData];
        newWeekData[index] = {
            ...newWeekData[index],
            task_id: taskId,
        };
        setWeekData(newWeekData);
        setData('timesheets', newWeekData);
    };

    // Function to handle time entry
    // const handleTimeChange = (e,index, field, value) => {
    //     const newWeekData = [...weekData];
    //     newWeekData[index] = {
    //         ...newWeekData[index],
    //         [field]: value || '', // Set default value to empty string if value is null
    //     };
    //     setWeekData(newWeekData);
    //     setData('timesheets', newWeekData);
    //     e.preventDefault();
    //     const updatedTimesheets = weekData.map((entry, index) => ({
    //         ...entry,
    //         date: getCurrentDate(index % 7), // Add date field based on the index
    //     }));
    //     setData('timesheets', updatedTimesheets);
    //     console.log('Data being sent:', data);
    //     setData('timesheets', updatedTimesheets);
    //     post('timesheets-store', {
            
    //         preserveScroll: true,
    //         onSuccess: () => console.log('Timesheets saved successfully'),
    //         onError: () => console.error('There was an error saving the timesheets')
    //     });
    // };
    const handleTimeChange = (e, index, field, value) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        // Update the weekData with the new value
        const newWeekData = [...weekData];
        newWeekData[index] = {
            ...newWeekData[index],
            [field]: value || '', // Set default value to empty string if value is null
        };
    
        // Update the weekData state
        setWeekData(newWeekData);
    
        // Add date field based on the index
        const updatedTimesheets = newWeekData.map((entry, i) => ({
            ...entry,
            date: getCurrentDate(i % 7), // Add date field based on the index
        }));
    
        // Set data for submission
        setData('timesheets', updatedTimesheets);
    
        // Log the data being sent for debugging
        console.log('Data being sent:', updatedTimesheets);
    
        // Post the data to the backend
        axios.post('timesheets-store', {
            preserveScroll: true,
            onSuccess: () => console.log('Timesheets saved successfully'),
            onError: (errors) => console.error('There was an error saving the timesheets:', errors),
        });
    };
    

    // Function to add a new row
    const addRow = () => {
        setWeekData([...weekData, { project_id: '', task_id: '', field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: '' }]);
        setNoData(false);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     post('timesheets-store', {
    //         preserveScroll: true,
    //         onSuccess: () => console.log('Timesheets saved successfully'),
    //         onError: () => console.error('There was an error saving the timesheets')
    //     });
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTimesheets = weekData.map((entry, index) => ({
            ...entry,
            date: getCurrentDate(index % 7), // Add date field based on the index
        }));
        setData('timesheets', updatedTimesheets);
        console.log('Data being sent:', data);
        setData('timesheets', updatedTimesheets);
        post('timesheets-store', {
            
            preserveScroll: true,
            onSuccess: () => console.log('Timesheets saved successfully'),
            onError: () => console.error('There was an error saving the timesheets')
        });
    };
    const calculateTotals = () => {
        const totals = { total: {}, overtime: {} };

        ['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'].forEach((field, i) => {
            let dailyTotal = 0;
            weekData.forEach(row => {
                dailyTotal += row[field] ? parseFloat(row[field]) : 0;
            });
            totals.total[field] = dailyTotal;
            // totals.overtime[field] = dailyTotal > 8 ? dailyTotal - 8 : dailyTotal - 8; // Assuming 8 hours is the threshold for overtime
            totals.overtime[field] = dailyTotal === 0 ? 0 : dailyTotal - 8;
        });

        return totals;
    };
    const getWeekRange = (selectedDate) => {
        const startOfWeek = moment(selectedDate).startOf('isoWeek');
        const endOfWeek = moment(selectedDate).endOf('isoWeek');
        return {
            start: startOfWeek,
            end: endOfWeek
        };
    };
    const formatWeekRange = (start, end) => {
        const formattedStart = start.format('dddd, MMMM DD, YYYY');
        const formattedEnd = end.format('dddd, MMMM DD, YYYY');
        return `${formattedStart} - ${formattedEnd}`;
    };
    const totals = calculateTotals();
    const weekRange = getWeekRange(selectedWeek);
    const formattedWeekRange = formatWeekRange(weekRange.start, weekRange.end);
    return (
        <div className='px-[8rem]'>
            <Header user={user}/>
            <Nav user_type={user_type}/>
            <div className="space-x-2" style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                <p>
                    <span className='font-bold '>Week</span>: <span className='underline text-red-500'> {formattedWeekRange}</span>
               </p>
                <div>
                    <button onClick={handlePreviousWeek} className='underline'>
                        <BiSkipPreviousCircle className='text-[2rem] text-blue-500'/>
                    </button>
                    <button onClick={handleNextWeek} className='underline'>
                        <CgPlayTrackNextO className='text-[2rem] text-blue-500'/>
                    </button>
                </div>
            </div>
            <div className='flex justify-end'>
                <button onClick={addRow} className='bg-blue-800 p-2 text-white rounded-md '>
                    <FaPlus />
                </button>
           </div>
           
            <table className='w-full mt-3'>
               
                <thead>
                    <tr className='bg-[#465584] text-white'>
                        <th className='border'>Project</th>
                        <th className='border'>Task</th>
                        {/* <th className='border'>(Mon) {getCurrentDate(0)}</th>
                        <th className='border'>(Tue) {getCurrentDate(1)}</th>
                        <th className='border'>(Wed) {getCurrentDate(2)}</th>
                        <th className='border'>(Thu) {getCurrentDate(3)}</th>
                        <th className='border'>(Fri) {getCurrentDate(4)}</th>
                        <th className='border bg-[#F06495]'>(Sat) {getCurrentDate(5)}</th>
                        <th className='border bg-[#F06495]'>(Sun) {getCurrentDate(6)}</th> */}
                        {['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'].map((field, i) => (
                                   <th key={i}>
                                   {moment(selectedWeek).startOf('isoWeek').add(i, 'days').format('MMM D')}<br />
                                   {moment(selectedWeek).startOf('isoWeek').add(i, 'days').format('ddd')}
                               </th>
                                ))}
                    </tr>
                </thead>

                <tbody>
                    {
                        noData ? (
                            <tr>
                                <td colSpan="8">   <p className='grid place-items-center'> <h1 className='font-bold text-[1.5rem]'>We couldn't find any data</h1>
                                    Sorry we can't find any timesheet records on this week.

                                    Please add timesheet record .</p></td>
                      </tr>
                        ): (
                                <>
                                    {weekData.map((rowData, index) => (
                                        <tr key={index}>
                                            <td >
                                                <select className='bg-[#6699CC] text-white' name={`timesheets[${index}].project_id`} value={rowData.project_id} onChange={(e) => handleProjectChange(index, e.target.value)}>
                                                    <option value="">Select Project</option>
                                                    {projects.map(project => (
                                                        <option key={project.id} value={project.id}>{project.project_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select className='bg-[#6699CC] text-white'
                                                    value={rowData.task_id} onChange={(e) => handleTaskChange(index, e.target.value)}>
                                                    <option value="">Select Task</option>
                                                    {taskMapping[rowData.project_id]?.tasks.map(task => (
                                                        <option key={task.task_id} value={task.task_id}>{task.task_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            {['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'].map((field, i) => {
                                                const entryDate = getCurrentDate(i);
                                                // const disabled = isDisabled(entryDate);
                                                const disabled = isDisabled(entryDate) || isHoliday(entryDate);
                                                console.log(disabled)
                                                return (
                                                    <td key={i} className={`form-control  ${disabled ? 'border-red-700 border-2' : 'border'}`}>
                                                        <input
                                                            type="text"

                                                            className='w-[5rem] border-none'
                                                            value={rowData[field] || ''} // Ensure default value is an empty string if null
                                                            onChange={(e) => handleTimeChange(e,index, field, e.target.value)}
                                                            disabled={disabled}
                                                        />
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className='border'></td>
                                        <td className='border font-bold'>Total</td>
                                        {['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'].map((field, i) => (
                                            <td key={i} className='border p-2'>{totals.total[field].toFixed(2)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className='border'></td>
                                        <td className='border font-bold'>Overtime</td>
                                        {['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7'].map((field, i) => (
                                            // <td key={i} className='border p-2' style={{ color: totals.overtime[field] < 0 ? 'red' : 'red' }}>{totals.overtime[field] !== null ? totals.overtime[field].toFixed(2) : '0.00'}</td>
                                            <td key={i} className='border p-2' style={{ color: totals.overtime[field] < 0 ? 'red' : 'red' }}>
  {totals.overtime[field] !== null ? 
    (totals.overtime[field] > 0 ? `+${totals.overtime[field].toFixed(2)}` : totals.overtime[field].toFixed(2)) 
    : '0.00'}
</td>
                                        ))}
                                    </tr></>
                        )
                    }
                    {/* <form > */}
                  
                  
                    
                    </tbody>
             
            </table>
            <div className='flex justify-end space-x-3 mt-3'>
                <button onClick={handleSubmit} className='border-2 p-2 border-[#465584]' >Save time Status</button>
                <button onClick={handleSubmit} className='border-2 p-2 border-[#465584]' >Submit time Status</button>
            </div>
        </div>
    );
};

export default YourComponent;
