import { Link } from '@inertiajs/react'
import React, { useState,useRef,useEffect } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { RxDotFilled } from "react-icons/rx";

export default function DropdownMenu({ icon, name, items }) {
  const [dropdown, setDropdown] = useState(false)
  const [height, setHeight] = useState(0);
  const ulRef = useRef(null);

  useEffect(() => {
    if (dropdown) {
      // Set the height to the scroll height (actual height of the content)
      setHeight(ulRef.current.scrollHeight);
    } else {
      // Collapse the height to 0
      setHeight(0);
    }
  }, [dropdown]);
  return (
    <li className='h-full p-2'>
      <button type='button' onClick={(e) => setDropdown(!dropdown)} className={`w-full flex transition-all duration-300 space-x-2 items-center ${dropdown ? 'mb-3' : 'mb-0'}`}> {icon} <span>{name}</span><FaChevronLeft className={`!ml-auto transition-all duration-300 ${dropdown ? '-rotate-90' : 'rotate-0'}`} size={12} /></button>
      <ul ref={ulRef} className="pl-5 space-y-2 overflow-hidden transition-all duration-300" style={{
        maxHeight: `${height}px`,
        transition: 'max-height 0.3s ease',
      }}>
        {
          items && items.map((item, index) => (
            <li key={index}>

           {/* <Link href={item.link} className='flex items-center text-sm text-gray-600 gap-x-2'> */}

              <Link href={item.link} className='flex items-center text-sm text-gray-600 gap-x-2'>

                <RxDotFilled size={14} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </li>
  )
}
