import React from 'react'
import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav'

function index({user,user_type,notif}) {
  return (
    <div className='w-[85.2%] absolute right-0 overflow-hidden'>
      <Header user={user} notif={notif} />
      <Nav user_type={user_type} />
      <div className='table-section border-[#0A1B3F] py-3 px-8 rounded-b-md'>
        Contract Page
      </div>
    </div>
  )
}

export default index