import React, { useState,useContext } from 'react';
React
import ItemCard from '../itemCard/ItemCard';

import { MyContext } from '../../context/Context';

const Parts = () => {

 
  const [dropDownType, setDropDownType] = useState(true); // Changed to boolean
  const [selectedType,setSelectedType]=useState("")
  const {partsList}=useContext(MyContext)



  return (
    <div className="tobacco" id="parts">
      <div className='containers m-auto'>
        <h1 className='text-primary text-6xl mt-3'>Parts</h1>
        <hr className='bg-secondary h-1 w-4/6 mt-3 mx-auto mb-4' />

        <div className="main-table w-full flex flex-wrap">
          <div className="queries mt-3 pb-14 flex flex-col mx-auto w-fit md:w-1/6  h-fit bg-primary text-tertiary  text-start">
            <div className='ml-4 mt-4 cursor-pointer text-center text-4xl font-bold text-secondary'>Filter</div>
            <input type="text" placeholder='Search' className='w-4/6 m-auto mt-2 mb-2 rounded-lg'/>
            <div className='ml-4'>
              <span className='cursor-pointer' onClick={() => setDropDownType(!dropDownType)}>
                Parts 
                <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownType ? 'rotate-180' : ''}`}>&#9660;</span>
              </span> <br />
              <ul
                className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden  ${dropDownType ? 'max-h-96' : 'max-h-0'}`}
              >
                <li className={`pl-2 cursor-pointer ${selectedType===""?"text-secondary":""}`} onClick={()=>{setSelectedType("")}}>All Parts</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="bowl"?"text-secondary":""}`} onClick={()=>{setSelectedType("bowl")}}>Bowls</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="tray"?"text-secondary":""}`} onClick={()=>{setSelectedType("tray")}}>Trays</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="base"?"text-secondary":""}`} onClick={()=>{setSelectedType("base")}}>Bases</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="hose"?"text-secondary":""}`} onClick={()=>{setSelectedType("hose")}}>Hoses</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="mouthpiece"?"text-secondary":""}`} onClick={()=>{setSelectedType("mouthpiece")}}>Mouthpiece</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="grommet"?"text-secondary":""}`} onClick={()=>{setSelectedType("grommet")}}>Grommets</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="downstem"?"text-secondary":""}`} onClick={()=>{setSelectedType("downstem")}}>Downstem</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="purge valve"?"text-secondary":""}`} onClick={()=>{setSelectedType("purge valve")}}>Purge Valve</li>
                <li className={`pl-2 cursor-pointer ${selectedType==="diffuser"?"text-secondary":""}`} onClick={()=>{setSelectedType("diffuser")}}>Diffuser</li>
              </ul>
            </div>

            
            
          </div>

          <div className=" list m-auto w-full md:w-5/6   flex flex-wrap">
          
          
          {
            partsList.map((item)=>{
              if(item.type===selectedType||selectedType===""){
                return <ItemCard key={item._id} collectionName={item.collectionName} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price} rating={item.rating} flavor={item.flavor} action='add'/>
              }
              return null
              
            })
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Parts;
