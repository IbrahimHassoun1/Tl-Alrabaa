import React, { useState,useContext } from 'react';
React

import ItemCard from '../itemCard/ItemCard';

import { MyContext } from '../../context/Context';
import FadeInSection from '../FadeInSection/FadeInSection';
import SlideHorizontalSection from '../SlideHorizontalSection/SlideHorizontalSection';
const Shisha = () => {

  const [dropDownSize, setDropDownSize] = useState(true); // Changed to boolean
  const [dropDownColor, setDropDownColor] = useState(true); // Changed to boolean
  const [selectedColor,setSelectedColor]=useState("")
  const [selectedSize,setSelectedSize]=useState("")
  const {shishaList}=useContext(MyContext)
  const filteredShisha = shishaList.filter((item) => {
    return (
      (item.color === selectedColor && item.size === selectedSize) ||
      (selectedColor === "" && item.size === selectedSize) ||
      (item.color === selectedColor && selectedSize === "") ||
      (selectedColor === "" && selectedSize === "")
    );
  });

  return (
    <div className="tobacco mb-4" id="shisha">
      <div className='containers m-auto'>
        <h1 className='text-primary text-6xl mt-3'>SHISHA</h1>
        <hr className='bg-secondary h-1 w-4/6 mt-3 mx-auto mb-4' />

        <div className="w-full flex rounded-full flex-wrap-reverse">
          

          <div className=" list m-auto w-full md:w-5/6  flex flex-wrap">
          {
            filteredShisha.length === 0 ? 
              <FadeInSection className='text-primary text-4xl m-auto'>No items found</FadeInSection> :
              filteredShisha.map((item) => (
                 <ItemCard
                  key={item._id}
                  collectionName={item.collectionName}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  flavor={item.flavor}
                  action="add"
                />
              ))
            }

          </div>


          <SlideHorizontalSection direction='right' className="queries mt-3 flex flex-col mx-auto mb-auto w-fit md:w-1/6 h-fit bg-primary text-tertiary  text-start">
            <div className='ml-4 mt-4 cursor-pointer text-center text-4xl font-bold text-secondary'>Filter</div>
            {/* <input type="text" placeholder='Search' className='w-4/6 m-auto mt-2 mb-2 rounded-lg'/> */}
            <div className='ml-4'>
              <span className='cursor-pointer' onClick={() => setDropDownColor(!dropDownColor)}>
                Color 
                <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownColor ? 'rotate-180' : ''}`}>&#9660;</span>
              </span> <br />
              <ul
                className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownColor ? 'max-h-40' : 'max-h-0'}`}
              >
                <li className={`pl-2 cursor-pointer ${selectedColor===""?"text-secondary":""}`} onClick={()=>{setSelectedColor("")}}>All Colors</li>
                <li className={`pl-2 cursor-pointer ${selectedColor==="black"?"text-secondary":""}`} onClick={()=>{setSelectedColor("black")}}>Black</li>
                <li className={`pl-2 cursor-pointer ${selectedColor==="blue"?"text-secondary":""}`} onClick={()=>{setSelectedColor("blue")}}>Blue</li>
                <li className={`pl-2 cursor-pointer ${selectedColor==="red"?"text-secondary":""}`} onClick={()=>{setSelectedColor("red")}}>Red</li>
                <li className={`pl-2 cursor-pointer ${selectedColor==="green"?"text-secondary":""}`} onClick={()=>{setSelectedColor("green")}}>Green</li>
              </ul>
            </div>

            <div className='ml-4 pb-5'>
              <span className='cursor-pointer' onClick={() => setDropDownSize(!dropDownSize)}>
                Size 
                <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownSize ? 'rotate-180' : ''}`}>&#9660;</span>
              </span> <br />
              <ul
                className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownSize ? 'max-h-40' : 'max-h-0'}`}
              >
                <li className={`pl-2 cursor-pointer ${selectedSize===""?"text-secondary":""}`} onClick={()=>{setSelectedSize("")}}>All Sizes</li>
                <li className={`pl-2 cursor-pointer ${selectedSize==="small"?"text-secondary":""}`} onClick={()=>{setSelectedSize("small")}}>Small</li>
                <li className={`pl-2 cursor-pointer ${selectedSize==="medium"?"text-secondary":""}`} onClick={()=>{setSelectedSize("medium")}}>Medium</li>
                <li className={`pl-2 cursor-pointer ${selectedSize==="large"?"text-secondary":""}`} onClick={()=>{setSelectedSize("large")}}>Large</li>
              </ul>
            </div>
            <button className='mb-3 bg-secondary text-tertiary hover:opacity-90 active:opacity-85 w-3/6 m-auto rounded-md font-medium' onClick={()=>{setSelectedColor("");setSelectedSize("")}}>Reset</button>
          </SlideHorizontalSection>
        </div>
      </div>
    </div>
  );
}

export default Shisha;
