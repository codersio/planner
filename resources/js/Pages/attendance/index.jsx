import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import React from 'react'

const Attendance=({ user, notif, user_type, documents })=>{
    return (
                 <div className='w-[85.2%] ml-[11.5rem]'>
  <Header user={user} notif={notif} />
  <Nav user_type={user_type} />
   <div className="flex px-9">
            <h2>Attendance</h2>
        </div>
</div>
    )
}

export default Attendance;
