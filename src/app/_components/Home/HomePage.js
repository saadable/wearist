import React from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeCategories from './HomeCategories/HomeCategories'
import SaleBanner from './SaleBanner/SaleBanner'
import HotProducts from './HotProducts/page'
import NewsLetter from './NewsLetter/page'

const HomePage = () => {
  return (
    <div>
      <HomeBanner/>
      <HotProducts/>
      <SaleBanner/>
      <HomeCategories/>
      <NewsLetter/>
    </div>
  )
}

export default HomePage
