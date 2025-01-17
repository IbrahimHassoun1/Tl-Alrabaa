import React, { useContext, useState } from 'react';
React
import "./Tobacco.css"


import { MyContext } from '../../context/Context.jsx';
import ItemCard from '../itemCard/ItemCard.jsx';
import FadeInSection from '../FadeInSection/FadeInSection.jsx';
import SlideHorizontalSection from '../SlideHorizontalSection/SlideHorizontalSection.jsx';

const Tobacco = () => {

  const [dropDownSize, setDropDownSize] = useState(true); // Changed to boolean
  const [dropDownFlavor, setDropDownFlavor] = useState(true); // Changed to boolean
  const [selectedFlavor,setSelectedFlavor]=useState("")
  const [selectedSize,setSelectedSize]=useState("")
  const {tobaccoList}=useContext(MyContext)
  const filteredTobaccos = tobaccoList.filter((item) => {
    return (
      (item.flavor === selectedFlavor && item.size === selectedSize) ||
      (selectedFlavor === "" && item.size === selectedSize) ||
      (item.flavor === selectedFlavor && selectedSize === "") ||
      (selectedFlavor === "" && selectedSize === "")
    );
  });
  

  return (
    <div className="tobacco mb-5" id='tobacco'>
      <div className='containers m-auto'>
        <h1 className='text-primary text-6xl mt-3'>TOBACCO</h1>
        <hr className='bg-secondary h-1 w-4/6 mt-3 mx-auto mb-4' />

        <div className="main-table w-full flex flex-wrap">
          <SlideHorizontalSection direction='left' className="queries mt-3 flex flex-col mx-auto w-fit md:w-1/6  h-fit bg-primary text-tertiary  text-start">
            <div className='ml-4 mt-4 cursor-pointer text-center text-4xl font-bold text-secondary'>Filter</div>
            {/* <input type="text" placeholder='Search' className='w-4/6 m-auto mt-2 mb-2 rounded-lg'/> */}
            <div className='ml-4'>
              <span className='cursor-pointer' onClick={() => setDropDownFlavor(!dropDownFlavor)}>
                Flavor 
                <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownFlavor ? 'rotate-180' : ''}`}>&#9660;</span>
              </span> <br />
              <ul
                className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownFlavor ? 'max-h-40' : 'max-h-0'}`}
              >
                <li className={`pl-2 cursor-pointer ${selectedFlavor===""?"text-secondary":""}`} onClick={()=>{setSelectedFlavor("")}}>All Flavors</li>
                <li className={`pl-2 cursor-pointer ${selectedFlavor==="cool"?"text-secondary":""}`} onClick={()=>{setSelectedFlavor("cool")}}>Cool</li>
                <li className={`pl-2 cursor-pointer ${selectedFlavor==="fruity"?"text-secondary":""}`} onClick={()=>{setSelectedFlavor("fruity")}}>Fruity</li>
                <li className={`pl-2 cursor-pointer ${selectedFlavor==="sour"?"text-secondary":""}`} onClick={()=>{setSelectedFlavor("sour")}}>Sour</li>
                <li className={`pl-2 cursor-pointer ${selectedFlavor==="sweet"?"text-secondary":""}`} onClick={()=>{setSelectedFlavor("sweet")}}>Sweet</li>
              </ul>
            </div>

            <div className='ml-4 pb-10'>
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
            <button className='mb-3 bg-secondary text-tertiary hover:opacity-90 active:opacity-85 w-3/6 m-auto rounded-md font-medium' onClick={()=>{setSelectedFlavor("");setSelectedSize("")}}>Reset</button>
          </SlideHorizontalSection>

          <div className=" list m-auto w-full md:w-5/6 gap-y-1 gap-x-1  flex flex-wrap">
          
            {
            filteredTobaccos.length === 0 ? 
              <FadeInSection className='text-primary text-4xl m-auto'>No items found</FadeInSection> :
              filteredTobaccos.map((item) => (
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
        </div>
      </div>
    </div>
  );
}

export default Tobacco;
