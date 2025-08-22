// Ai.jsx
import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  let {showSearch , setShowSearch} = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi,setActiveAi] = useState(false)
  let openingSound = new Audio(open)

  function speak(message){
    let utterence=new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!speechRecognition) {
    console.log("Speech Recognition not supported.");
    return null; // Don't render if not supported
  }
  const recognition = new speechRecognition();

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim();
    if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch) {
      speak("opening search")
      setShowSearch(true)
      navigate("/collection")
    }
    else if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch) {
      speak("closing search")
      setShowSearch(false)
    }
    else if (transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("product")) {
      speak("opening collection page")
      navigate("/collection")
    }
    // ... other commands
    else {
      toast.error("Command not recognized. Please try again.");
    }
  }

  recognition.onend = () => {
   setActiveAi(false)
  }
  
  return (
    <div className='fixed bottom-24 md:bottom-8 left-4 z-50' onClick={()=>{
        try {
            recognition.start();
            openingSound.play();
            setActiveAi(true);
        } catch(e) {
            console.error("Recognition already started.");
        }
    }}>
      <img src={ai} alt="AI Assistant" className={`w-24 cursor-pointer transition-transform duration-300 ${activeAi ? 'scale-110' : 'scale-100'}` } style={{
        filter: ` ${activeAi ? "drop-shadow(0px 0px 25px #2563eb)" : "drop-shadow(0px 4px 10px rgba(0,0,0,0.3))"}`
      }}/>
    </div>
  )
}

export default Ai