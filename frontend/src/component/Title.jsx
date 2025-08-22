import React from 'react'

function Title({text1, text2}) {
  return (
    <div className='inline-flex gap-2.5 items-center text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-slate-800'>
            {text1} <span className='text-blue-600'>{text2}</span>
        </h2>
    </div>
  )
}

export default Title