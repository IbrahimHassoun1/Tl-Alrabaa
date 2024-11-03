import React ,{useState,useEffect}from 'react'
React
import parts1 from '../../assets/parts1-head.webp'
import parts2 from '../../assets/parts2-head.jpeg'
import parts3 from '../../assets/parts3-head.jpg'

import SlideHorizontalSection from '../SlideHorizontalSection/SlideHorizontalSection'

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  const offset = 80;  // Optional: adjust this value to match your navbar height
  const yPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({ top: yPosition, behavior: 'smooth' });
};
const PartsIntro = () => {
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
        <div className="PartsIntro-content w-full containers m-auto flex flex-wrap"> 

            <SlideHorizontalSection direction='left' className="left w-full sm:w-3/6 min-h-80 rounded-xl flex flex-col">
            <img src={index===1?parts1:index===2?parts2:parts3}  loading='lazy' alt="" className='h-72 w-fit object-cover rounded-xl mx-auto'/>
                <ul className='m-auto flex'>
                  <li className={`${index===1?"bg-tertiary":"bg-transparent"} h-2 w-2 rounded-full mr-1 border cursor-pointer`} onClick={()=>setIndex(1)}></li>
                  <li className={`${index===2?"bg-tertiary":"bg-transparent"} h-2 w-2 rounded-full mr-1 border cursor-pointer`} onClick={()=>setIndex(2)}></li>
                  <li className={`${index===3?"bg-tertiary":"bg-transparent"} h-2 w-2 rounded-full border cursor-pointer`} onClick={()=>setIndex(3)}></li>
                </ul>
            </SlideHorizontalSection>

            <SlideHorizontalSection direction='right' className="right w-full sm:w-3/6  min-h-80 rounded-xl flex flex-col">
                <h1 className='text-tertiary font-extrabold text-5xl text-center pl-7 pt-7'>Are you Looking <br /> For Parts?</h1>
                <p className='text-tertiary text-center font-thin  capitalize m-auto'>Bowl,Stem,Base and much more... <br />Whatever you&apos;re looking for,we&apos;ve Got You. </p>
                <button className='bg-secondary text-tertiary w-2/6 rounded-lg h-10  hover:opacity-90 active:opacity-85 m-auto' onClick={()=>scrollToSection("parts")}>Explore Parts</button>
            </SlideHorizontalSection>
        </div>
    </div>
  )
}

export default PartsIntro