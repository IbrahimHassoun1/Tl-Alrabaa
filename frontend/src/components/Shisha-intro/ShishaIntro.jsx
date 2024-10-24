import React, { useState,useEffect } from 'react'
React
import shisha1 from '../../assets/shisha1-head.webp'
import shisha2 from '../../assets/shisha2-head.webp'
import shisha3 from '../../assets/shisha3-head.jpg'
import FadeInSection from '../FadeInSection/FadeInSection'

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  const offset = 80;  // Optional: adjust this value to match your navbar height
  const yPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({ top: yPosition, behavior: 'smooth' });
};
const ShishaIntro = () => {

  const [index,setIndex]=useState(1)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 3 ? 1 : prevIndex + 1));
    }, 3000);
  
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect once
  
  return (
    <div className='PartsIntro bg-primary min-h-96 h-fit flex'>
      <FadeInSection className="m-auto w-full ">
        <div className="PartsIntro-content w-full containers m-auto flex flex-wrap"> 
            
            <div className="left w-full sm:w-3/6  min-h-80 rounded-xl flex flex-col pr-4">
                <h1 className='text-tertiary font-extrabold text-5xl text-center pl-7 pt-7'>Are you  Looking <br /> For Shisha?</h1>
                <p className='text-tertiary text-center font-thin pl-7 pt-3 capitalize'>Bowl,Stem,Base and much more... <br />Whatever you&apos;re looking for,we&apos;ve Got You. </p>
                <button className='bg-secondary text-tertiary w-2/6 rounded-lg h-10  m-auto hover:opacity-90 active:opacity-85' onClick={()=>scrollToSection("shisha")}>Explore Shisha</button>
            </div>

            <div className="right w-full sm:w-3/6 min-h-80 rounded-xl flex flex-col ">
                <img src={index===2?shisha1:index===1?shisha2:shisha3} alt="" className='h-72 w-fit object-cover rounded-xl mx-auto'/>
                <ul className='m-auto flex'>
                  <li className={`${index===1?"bg-tertiary":"bg-transparent"} h-2 w-2 rounded-full mr-1 border cursor-pointer`} onClick={()=>setIndex(1)}></li>
                  <li className={`${index===2?"bg-tertiary":"bg-transparent"} h-2 w-2 rounded-full mr-1 border cursor-pointer`} onClick={()=>setIndex(2)}></li>
                  <li className={`${index===3?"bg-tertiary":"bg-transparent"} h-2 w-2 rounded-full border cursor-pointer`} onClick={()=>setIndex(3)}></li>
                </ul>
            </div>
        </div>
        </FadeInSection>
    </div>
  )
}

export default ShishaIntro