import React, { useState } from 'react'
React
const Footer = () => {
  const [dropDownLocation,setDropDownLocation]=useState(false)
  return (
    <div className='footer mt-3 bg-primary min-h-52'>
        <div className='containers pt-5 m-auto w-full flex flex-wrap justify-between text-start text-tertiary'>
            <div className="left w-full text-center md:w-3/5 md:text-start">
                <h1 className='font-extrabold text-4xl text-secondary'>Tl-Alrabaa</h1>
                <p className='pt-5 font-extralight '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi perspiciatis modi deserunt repellat! Beatae nihil minima modi vero rerum tenetur iusto, iure iste quod quam cupiditate, laboriosam facilis cum dolore!</p>
            </div>
            <div className="center w-full md:w-1/5 ">
                <h1 className='font-extrabold text-3xl text-center'>Company</h1>
                <ul className='pt-5 text-center font-extralight'>
                  <li className='cursor-pointer'>About Us</li>
                  <li className='cursor-pointer'>Terms&Conditions</li>
                  <li className='cursor-pointer'>
                    
                  <span className='cursor-pointer' onClick={() => setDropDownLocation(!dropDownLocation)}>
                Locations 
                <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownLocation ? 'rotate-180' : ''}`}>&#9660;</span>
              </span> <br />
              <ul
                className={`ml-auto mr-8 w-2/5  border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownLocation ? 'max-h-40' : 'max-h-0'}`}
              >
               
                <li className={`pl-2 cursor-pointer `} ><a href="https://maps.app.goo.gl/VCXNQvV7oeZeJc1p6">Location 1</a></li>
                <li className={`pl-2 cursor-pointer`} ><a href="">Location 2</a></li>
              </ul>
                  </li>
                </ul>
            </div>
            <div className="right w-full md:w-1/5 text-center">
                <h1 className='font-extrabold text-3xl' id='contact'>Contact Us</h1>
                <ul className='pt-5 font-extralight'>
                  <li className='cursor-pointer'><a href="mailto:Tlalrabaa2021@gmail.com">Email</a></li>
                  <li className='cursor-pointer'><a href="tel:+964-0750-546-2539">Phone Number</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer