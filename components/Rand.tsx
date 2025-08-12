import React, { useState } from 'react'

const Rand = ({label}:{label:string}) => {
    const [name,setName]=useState('')
  return (
    <div >
        <input type="text" placeholder='name' onChange={(e)=>setName(e.target.value)}/>
        {  
            <h1 data-testid='display_name'>{name}</h1> 
        }
    </div>
  )
}

export default Rand