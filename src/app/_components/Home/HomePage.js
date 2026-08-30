import React from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeCategories from './HomeCategories/HomeCategories'
import SaleBanner from './SaleBanner/SaleBanner'
import HotProducts from './HotProducts/page'
import GoogleMap from './GoogleMap/page'

const HomePage = () => {
  return (
    <div>
      <HomeBanner/>
      <HotProducts/>
      <SaleBanner/>
      <HomeCategories/>
      <GoogleMap/>
    </div>
  )
}

export default HomePage
