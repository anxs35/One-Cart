// Backgound.jsx (No changes needed)
import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

function Backgound({heroCount}) {
  
    const images = [back2, back1, back3, back4];
    const selectedImage = images[heroCount] || images[0];
    
    return <img src={selectedImage} alt="" className='w-full h-full object-cover transition-opacity duration-700'/>;
}

export default Backgound