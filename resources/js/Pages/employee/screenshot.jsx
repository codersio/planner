import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav'
import React from 'react'

function screenshot({user,user_type,notif,imgs}) {
    return (
        <div className='w-[83%] absolute right-0 overflow-hidden'>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div>
                { imgs }
                {
                    imgs.map((img)=>(
                        <img src={img} alt="" />
                    ))
                }
            </div>
        </div>
    )
}

export default screenshot