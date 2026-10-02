import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import SmartRecommendations from '../component/SmartRecommendations'

function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that Defines" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Premium Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fasion Fit", text2: "Now on Sale!" }
  ]

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative top-16 md:top-20'>
      {/* Hero Section */}
      <div className='w-full lg:h-[80vh] md:h-[60vh] sm:h-[50vh] h-[55vh] bg-gradient-to-r from-slate-50 to-gray-100 relative mb-16'>
        <Backgound heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      {/* Content Sections */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20'>
        <LatestCollection />
        <BestSeller />
        <SmartRecommendations />
        <OurPolicy />
        <NewLetterBox />
      </div>

      <Footer />
    </div>
  )
}

export default Home