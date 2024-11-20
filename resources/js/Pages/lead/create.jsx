import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav'
import React from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import Notyf styles
const notyf = new Notyf();

function create({user,user_type,notif}) {
  return (
    <div className='w-[85.2%] absolute right-0 overflow-hidden'>
      <Header user={user} notif={notif} />
      <Nav user_type={user_type} />
      <div className='table-section border-[#0A1B3F] py-3 px-8 rounded-b-md'>
        lead Create Page
      </div>
    </div>
  )
}

export default create