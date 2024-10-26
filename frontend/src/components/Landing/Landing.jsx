import React from 'react'
React
import './Landing.css'
import FadeInSection from '../FadeInSection/FadeInSection'
const Landing = () => {

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const offset = 80;  // Optional: adjust this value to match your navbar height
    const yPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({ top: yPosition, behavior: 'smooth' });
  };


  return (
    <div className='landing  min-h-screen h-fit  flex items-center' id='home'>
      <FadeInSection className="content containers m-auto ">
        <h1 className='text-5xl sm:text-7xl text-tertiary font-bold '>Top Quality Polish <br />Tobacco</h1>
        <h4 className='mt-5 text-tertiary'>Made in Erbil</h4>
        <hr className='w-4/6 m-auto mt-6 '/>
        <button onClick={()=>scrollToSection("contact")} className='bg-secondary text-tertiary p-2 font-semibold mt-6 w-2/6 rounded-2xl hover:opacity-95 active:opacity-80'>Learn More <br />About Us</button>
      </FadeInSection>
        
    </div>
  )
}

export default Landing