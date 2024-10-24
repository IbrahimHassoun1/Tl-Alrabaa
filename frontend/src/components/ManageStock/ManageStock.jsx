import React, { useContext, useEffect, useState } from 'react'
React
import PropTypes from 'prop-types'
import { MyContext } from '../../context/Context'
import ItemCard from '../itemCard/ItemCard'
import FadeInSection from '../FadeInSection/FadeInSection'

const ManageStock = ({selectedStockOperation}) => {

    const {imagePreview,setImagePreview,productIsChosen,setImageFile,data,handleChange,addToStock,findOneAndUpdate,tobaccoList,shishaList,partsList}=useContext(MyContext)
    const [productCategory,setProductCategory]=useState("tobacco")
    

    const handleCategoryChange = (event) => {
        setProductCategory(event.target.value); // Save the selected value in state
      };

    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImagePreview(URL.createObjectURL(file));
          setImageFile(file)
        }
      };

      
    
   useEffect(()=>{
    console.log(data)
   },[data])
    



  return (
    <div>

        {selectedStockOperation===""?<h1>Please Select an operation</h1>:""}
        {
selectedStockOperation==="add"?
        <FadeInSection className='add flex flex-col w-1/2 gap-2 ml-4 mt-4' >

<label htmlFor="category">
    Select Item Category
    <select name="category" id="category" className='border border-primary ml-3 h-8 rounded-md cursor-pointer' onChange={handleCategoryChange} value={productCategory}>
        <option value="tobacco">Tobacco</option>
        <option value="shisha" >Shisha</option>
        <option value="parts"  >Parts</option>
    </select>
</label>

<label htmlFor="image" className="border border-primary rounded-md p-2">
        Upload Product Image
        <input
          type="file"
          id="image"
          accept="image/*"
          className="ml-3"
          onChange={handleImageChange}
          required
        />
      </label>

      {imagePreview && (
        <div className="mt-4">
          <img src={imagePreview} alt="Selected" className="max-w-xs rounded-md"/>
        </div>
      )}

<input className='border border-primary h-8 rounded-md pl-3' type="text" required   placeholder='Name' name='name' value={data.name||""} onChange={handleChange}/>
<input className='border border-primary h-8 rounded-md pl-3' type="number" required placeholder='Price(in IQD)' name='price' value={data.price||""} onChange={handleChange}/>

{productCategory==="tobacco"?
<>
    <select  id="flavor" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name="flavor" required value={data.flavor||""} onChange={handleChange}>
        <option value="Flavor" hidden >Flavor</option>
        <option value="cool">Cool</option>
        <option value="fruity">Fruity</option>
        <option value="sour">Sour</option>
        <option value="sweet">Sweet</option>
    </select>

    <select  id="" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name="size" required value={data.size||""} onChange={handleChange}>
        <option value="Flavor" hidden >Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
    </select>

</>:
productCategory==="shisha"?
<>

    <select  id="color" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name="color" required value={data.color||""} onChange={handleChange}>
        <option value="Flavor" hidden >Color</option>
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">green</option>
    </select>

    <select id="size" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name="size" required value={data.size||""} onChange={handleChange}>
        <option value="Flavor" hidden >Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
    </select>

</>:

    <select  id="type" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name="type" required value={data.type||""} onChange={handleChange}>
        <option value="Flavor" hidden >Type</option>
        <option value="bowl">Bowl</option>
        <option value="tray">Tray</option>
        <option value="hose">Hose</option>
        <option value="base">Base</option>
        <option value="mouthpiece">Mouthpiece</option>
        <option value="grommet">Grommet</option>
        <option value="downsteam">Downsteam</option>
        <option value="valve">Valve</option>
        <option value="diffuser">Diffuser</option>
    </select>
}

<input className='border border-primary h-32 rounded-md pl-3' type="text" required placeholder='Description' name='description' value={data.description||""} onChange={handleChange} />
<button className='bg-secondary rounded-md m-auto w-1/2 text-tertiary h-8 ' type='submit' onClick={(e)=>{e.preventDefault();addToStock(productCategory,data)}}>Add Item</button>
        </FadeInSection>:
selectedStockOperation==="edit"&&!productIsChosen?
        <>
<div className='flex'>
    <label htmlFor="category" className='m-auto'>
        Select Item Category
        <select name="category" id="category" className='border border-primary ml-3 h-8 rounded-md cursor-pointer' onChange={handleCategoryChange} value={productCategory}>
            <option value="tobacco" >Tobacco</option>
            <option value="shisha" >Shisha</option>
            <option value="parts" >Parts</option>
        </select>
    </label>
</div>

<div className='w-full h-full'>
    {productCategory==="tobacco"?
    <div className='flex flex-wrap'>
        {tobaccoList.map((item)=>{
            return <ItemCard key={item._id} collectionName={item.collectionName} id={item._id}name={item.name} description={item.description} image={item.image} price={item.price} rating={item.rating} flavor={item.flavor} action='edit'/>
        })}
    </div>

    :productCategory==="shisha"?
    <div className='flex flex-wrap'>
        {shishaList.map((item)=>{
            return <ItemCard key={item._id} collectionName={item.collectionName} id={item._id}name={item.name} description={item.description} image={item.image} price={item.price} rating={item.rating} flavor={item.flavor} action='edit'/>
        })}
    </div>:

    <div className='flex flex-wrap'>
         {partsList.map((item)=>{
            return <ItemCard key={item._id} collectionName={item.collectionName} id={item._id}name={item.name} description={item.description} image={item.image} price={item.price} rating={item.rating} flavor={item.flavor} action='edit'/>
        })}
    </div>

    }
</div>
        </>
        :

        
selectedStockOperation==="edit"&&productIsChosen?

        <FadeInSection className='add flex flex-col w-1/2 gap-2 ml-4 mt-4' >

{/* <div className='flex'>
    <label htmlFor="category" className='m-auto'>
        Select Item Category
        <select name="category" id="category" className='border border-primary ml-3 h-8 rounded-md cursor-pointer' onChange={handleCategoryChange} value={productCategory}>
            <option value="tobacco" >Tobacco</option>
            <option value="shisha" >Shisha</option>
            <option value="parts" >Parts</option>
        </select>
    </label>
</div> */}


{/* <div className='flex'>
    <label htmlFor="" className='m-auto'>
        Product id
        <input type="text" className='border border-primary h-8 rounded-md pl-3 ml-4' required placeholder='Product id' name='_id' value={data._id||""} onChange={handleChange} />

    </label>
</div> */}


<label htmlFor="image" className="border border-primary rounded-md p-2">
        Upload Product Image
        <input
          type="file"
          id="image"
          accept="image/*"
          className="ml-3"
          onChange={handleImageChange}
        />
      </label>

      {imagePreview && (
        <div className="mt-4">
          <img src={imagePreview} alt="Selected" className="max-w-xs rounded-md"/>
        </div>
      )}

<input className='border border-primary h-8 rounded-md pl-3' type="text"   placeholder='Name' name='name' value={data.name||""} onChange={handleChange} />
<input className='border border-primary h-8 rounded-md pl-3' type="number" placeholder='Price(in IQD)' name='price' value={data.price||""} onChange={handleChange} />

{productCategory==="tobacco"?
<>
    <select id="flavor" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name='flavor' value={data.flavor||""} onChange={handleChange}>
        <option value="Flavor" hidden >Flavor</option>
        <option value="cool">Cool</option>
        <option value="fruity">Fruity</option>
        <option value="sour">Sour</option>
        <option value="sweet">Sweet</option>
    </select>

    <select  id="" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name='size' value={data.size||""} onChange={handleChange}>
        <option value="Flavor" hidden >Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
    </select>

</>:
productCategory==="shisha"?
<>

    <select  id="color" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name='color' value={data.color||""} onChange={handleChange}>
        <option value="Flavor" hidden >Color</option>
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">green</option>
    </select>

    <select id="size" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name='size' value={data.size||""} onChange={handleChange}>
        <option value="Flavor" hidden >Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
    </select>

</>:

    <select id="type" className='bg-white h-8 pl-3 border border-primary rounded-md cursor-pointer' name='type' value={data.type||""} onChange={handleChange}>
        <option value="Flavor" hidden >Type</option>
        <option value="bowl">Bowl</option>
        <option value="tray">Tray</option>
        <option value="hose">Hose</option>
        <option value="base">Base</option>
        <option value="mouthpiece">Mouthpiece</option>
        <option value="grommet">Grommet</option>
        <option value="downsteam">Downsteam</option>
        <option value="valve">Valve</option>
        <option value="diffuser">Diffuser</option>
    </select>
}

<input className='border border-primary h-32 rounded-md pl-3' type="text" placeholder='Description' name='description' value={data.description||""} onChange={handleChange} />
<button className='bg-secondary rounded-md m-auto w-1/2 text-tertiary h-8 focus:opacity-85 active:opacity-75' type='submit' onClick={(e)=>{e.preventDefault();findOneAndUpdate(productCategory,data.id,data)}}>Edit Item</button>
        </FadeInSection>:
        
selectedStockOperation==="delete"?
        <FadeInSection className='flex flex-col w-full h-full gap-4 sm:mr-auto m-auto'>

<label htmlFor="category" className='m-auto text-center'>
    Select Item Category
    <select name="category" id="category" className='border border-primary ml-3 h-8 rounded-md cursor-pointer' onChange={handleCategoryChange} value={productCategory}>
        <option value="tobacco" >Tobacco</option>
        <option value="shisha" >Shisha</option>
        <option value="parts" >Parts</option>
    </select>
</label>
<div className='w-full h-full'>
    {productCategory==="tobacco"?
    <div className='flex flex-wrap'>
        {tobaccoList.map((item)=>{
            return <ItemCard key={item._id} collectionName={item.collectionName} id={item._id}name={item.name} description={item.description} image={item.image} price={item.price} rating={item.rating} flavor={item.flavor} action='delete'/>
        })}
    </div>

    :productCategory==="shisha"?
    <div className='flex flex-wrap'>
        {shishaList.map((item)=>{
            return <ItemCard key={item._id} collectionName={item.collectionName} id={item._id}name={item.name} description={item.description} image={item.image} price={item.price} rating={item.rating} flavor={item.flavor} action='delete'/>
        })}
    </div>:

    <div className='flex flex-wrap'>
         {partsList.map((item)=>{
            return <ItemCard key={item._id} collectionName={item.collectionName} id={item._id}name={item.name} description={item.description} image={item.image} price={item.price} rating={item.rating} flavor={item.flavor} action='delete'/>
        })}
    </div>

    }
</div>
                                                                                    
                                                                                    
        </FadeInSection>:
""
        }

    </div>
  )
}

ManageStock.propTypes={
    selectedStockOperation:PropTypes.string.isRequired
}

export default ManageStock