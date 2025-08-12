import React from 'react'

const Btn = ({label}:{label:string}) => {
  return (
    <div className='bg-red-500 flex justify-center items-center p-5'>
        <button  className='bg-blue-600 text-white'>{label}</button>
        
    </div>
  )
}

export default Btn