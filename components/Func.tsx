import React from 'react'

const Func = ({osubmit}:{osubmit:()=>void}) => {
  return (
    <div>
        <h1>Func</h1>
        <button onClick={osubmit}>submit</button>


    </div>
  )
}

export default Func