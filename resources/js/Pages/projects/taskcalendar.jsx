import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav'

function taskcalendar({ notif, usrrr, user_type, user }) {
    return (
        <div className='w-[85.2%] ml-[11.5rem]'>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} usrrr={usrrr} />
            <div className="w-full px-9">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl'>Task Calendar</h1>
                </div>
                <div className='pt-10'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={[
                            { title: 'demo event', start: '2024-10-16', end:"2024-10-18" },
                            
                          ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default taskcalendar