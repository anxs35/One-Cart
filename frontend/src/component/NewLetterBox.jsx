import React from 'react'

function NewLetterBox() {
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
  return (
    <div className='w-full bg-slate-100 py-16 sm:py-20'>
      <div className='max-w-4xl mx-auto text-center px-4'>
        <h2 className='text-3xl font-bold text-slate-800'>Subscribe now & get 20% off</h2>
        <p className='mt-3 max-w-2xl mx-auto text-lg text-slate-600'>
          Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
        </p>
        <form onSubmit={handleSubmit} className='mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
          <input 
            type="email" 
            placeholder='Enter Your Email' 
            className='flex-grow h-12 border border-slate-300 rounded-lg bg-white px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' 
            required 
          />
          <button 
            type='submit' 
            className='h-12 px-8 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors flex-shrink-0'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewLetterBox