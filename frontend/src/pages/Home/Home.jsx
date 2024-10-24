import React, { useContext } from 'react'
React
import Landing from '../../components/Landing/Landing'
import Tobacco from '../../components/Tobacco/Tobacco'
import ShishaIntro from '../../components/Shisha-intro/ShishaIntro'
import Shisha from '../../components/Shisha/Shisha'
import PartsIntro from '../../components/PartsIntro/PartsIntro'
import Parts from '../../components/Parts/Parts'
import Footer from '../../components/Footer/Footer'
import Popup from '../../components/Popup/Popup'
import { MyContext } from '../../context/Context'


const Home = () => {
const {showPopup}=useContext(MyContext)
  return (
    <div id='homePage' className='bg-tertiary'>
        {showPopup?<Popup className='NavHome'/>:""}
        <Landing/>
        <Tobacco/>
        <ShishaIntro/>
        <Shisha/>
        <PartsIntro/>
        <Parts/>
        <Footer/>
    </div>
  )
}

export default Home