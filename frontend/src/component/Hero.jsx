import React from 'react'
import { FaCircle } from "react-icons/fa";

function Hero({heroData,heroCount,setHeroCount}) {
  return (
    <div className='absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-lg text-slate-800'>
            <p className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>{heroData.text1}</p>
            <p className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-2'>{heroData.text2}</p>
        </div>
        <div className='flex items-center gap-3 mt-8'>
            <button onClick={()=>setHeroCount(0)}><FaCircle className={`w-3 h-3 transition-colors ${heroCount===0 ? "text-blue-600":"text-slate-300 hover:text-slate-400"}`}/></button>
            <button onClick={()=>setHeroCount(1)}><FaCircle className={`w-3 h-3 transition-colors ${heroCount===1 ? "text-blue-600":"text-slate-300 hover:text-slate-400"}`}/></button>
            <button onClick={()=>setHeroCount(2)}><FaCircle className={`w-3 h-3 transition-colors ${heroCount===2 ? "text-blue-600":"text-slate-300 hover:text-slate-400"}`}/></button>
            <button onClick={()=>setHeroCount(3)}><FaCircle className={`w-3 h-3 transition-colors ${heroCount===3 ? "text-blue-600":"text-slate-300 hover:text-slate-400"}`}/></button>
        </div>
    </div>
  )
}

export default Hero