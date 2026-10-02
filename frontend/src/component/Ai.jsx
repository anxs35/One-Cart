// Ai.jsx
import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  let { showSearch, setShowSearch, addtoCart, products } = useContext(shopDataContext)
  let navigate = useNavigate()
  let location = useLocation()
  let [activeAi, setActiveAi] = useState(false)
  let openingSound = null
  try {
    openingSound = new Audio(open)
  } catch (error) {
    console.log("Audio file not available")
  }

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!speechRecognition) {
    console.log("Speech Recognition not supported.");
    toast.error("Voice features not supported in this browser");
    return null; // Don't render if not supported
  }
  const recognition = new speechRecognition();

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim();
    toast.info("Heard: " + transcript); // Debugging aid
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
    else if (transcript.toLowerCase().includes("contact")) {
      speak("opening contact page")
      navigate("/contact")
    }
    else if (transcript.toLowerCase().includes("home")) {
      speak("opening home page")
      navigate("/")
    }
    else if (transcript.toLowerCase().includes("cart")) {
      speak("opening cart")
      navigate("/cart")
    }
    else if (transcript.toLowerCase().includes("order")) {
      speak("opening orders")
      navigate("/order")
    }
    else if (transcript.toLowerCase().includes("about")) {
      speak("opening about page")
      navigate("/about")
    }
    else if (transcript.toLowerCase().includes("checkout") || (transcript.toLowerCase().includes("place") && transcript.toLowerCase().includes("order"))) {
      speak("proceeding to checkout")
      navigate("/placeorder")
    }
    else if (transcript.toLowerCase().includes("add") && transcript.toLowerCase().includes("cart")) {
      if (location.pathname.includes('/productdetail')) {
        const productId = location.pathname.split('/').pop();
        const product = products.find(p => p._id === productId);
        if (product) {
          const defaultSize = product.sizes[0] || 'M';
          addtoCart(productId, defaultSize);
          speak("added to cart");
          toast.success("Added to Cart (Size: " + defaultSize + ")");
        } else {
          speak("product not found");
          toast.error("Product not found");
        }
      } else {
        speak("please select a product first");
        toast.warning("Open a product page to add to cart");
      }
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
    <div className='fixed bottom-6 left-6 z-[100] md:bottom-8 md:left-8' onClick={() => {
      try {
        recognition.start();
        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          if (event.error === 'not-allowed') {
            toast.error("Microphone access blocked. Check browser permissions.");
          } else if (event.error === 'network') {
            toast.error("Network error. Voice features need internet.");
          } else {
            toast.error("Voice error: " + event.error);
          }
          setActiveAi(false);
        };
        if (openingSound) {
          openingSound.play().catch(() => console.log("Audio play failed"));
        }
        setActiveAi(true);
      } catch (e) {
        console.error("Recognition already started.");
        toast.info("Listening...");
      }
    }}>
      <img src={ai} alt="AI Assistant" className={`w-14 md:w-20 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${activeAi ? 'scale-110' : 'scale-100'}`} style={{
        filter: ` ${activeAi ? "drop-shadow(0px 0px 15px #2563eb)" : "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))"}`
      }} />
    </div>
  )
}

export default Ai