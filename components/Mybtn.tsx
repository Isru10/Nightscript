
import React, { useState } from 'react'

const Mybtn = () => {
    const [click , setClick] = useState(false)
  return (
    <div>

        <button onClick={()=>setClick(!click)}> click here</button>
        {
            click && <p>button is clicked</p>
        }
    </div>
  )
}
export default Mybtn