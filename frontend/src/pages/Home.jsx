import React from 'react'

import Banner from '../components/Banner'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

import CarouselSlider from '../components/CarouselSlider'
import MarqueeFreeShipping from '../components/Marquee'


const Home = () => {
  return (
    <div>
    <MarqueeFreeShipping/>
   <CarouselSlider/>

      <Banner/>
      {/* <br/> */}
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home