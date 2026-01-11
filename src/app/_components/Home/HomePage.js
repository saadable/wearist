import React from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeCategories from './HomeCategories/HomeCategories'
import SaleBanner from './SaleBanner/SaleBanner'

const HomePage = () => {
  return (
    <div>
      <HomeBanner/>
      <HomeCategories/>
      <SaleBanner/>
    </div>
  )
}

export default HomePage
