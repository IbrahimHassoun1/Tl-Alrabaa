import React, { useContext, useEffect, useState } from 'react'
import CartItem from '../../components/cartItem/CartItem'
import { MyContext } from '../../context/Context'
import Popup from '../../components/Popup/Popup'


React

const Cart = () => {

  const {cartItems,tobaccoList,shishaList,partsList,totPrice,showPopup}=useContext(MyContext)
  const [tobaccoCartItems,setTobaccoCartItems]=useState([])
  const [shishaCartItems,setShishaCartItems]=useState([])
  const [partsCartItems,setPartsCartItems]=useState([])

  useEffect(()=>{
    
    const arrayOfAllItems=Object.entries(cartItems)
    console.log(arrayOfAllItems)

    const arrangedItems=arrayOfAllItems.map(item => {
      return {
          id: item[0].split('_')[1],
          collectionName: item[0].split('_')[0], // Extracting collection name from id
          quantity: item[1]
      };
  });
  console.log(arrangedItems)

  arrangedItems.map((item)=>{
      if (item.collectionName==="tobacco"){
        setTobaccoCartItems((prev)=>({...prev,[item.id]:item.quantity}))
      }
      if (item.collectionName==="shisha"){
        setShishaCartItems((prev)=>({...prev,[item.id]:item.quantity}))
      }
      if (item.collectionName==="parts"){
        setPartsCartItems((prev)=>({...prev,[item.id]:item.quantity}))
      }
  })
   
  
  },[cartItems])

  useEffect(()=>{
    console.log(tobaccoCartItems)
    console.log(tobaccoCartItems["670a878636666ee3d28956d8"])
    console.log(shishaCartItems)
    console.log(partsCartItems)
  })
  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top when the page loads
  }, []);

  return (
    <div>
    {showPopup?<Popup/>:""}
      
    <div className='cart  min-h-screen bg-tertiary'>
      <div className="content flex flex-wrap-reverse containers m-auto min-h-screen h-screen">

        <div className="left h-full w-full md:w-1/5  md:border-r-2 border-primary flex flex-col content-end">

          <div className="content mt-4 mr-4 flex flex-col gap-5">

            <div className='flex sm:flex-col  justify-between items-start'>
              <h1 className='font-bold text-2xl'>Subtotal:</h1>
              <h1 className='text-secondary font-bold text-2xl sm:mx-auto'>{totPrice}</h1>
            </div>

            <div className='flex sm:flex-col justify-between items-start'>
              <h1 className='font-bold text-2xl'>Tax:</h1>
              <h1 className='text-secondary font-bold text-2xl sm:mx-auto'>{totPrice*0.1}</h1>
            </div>

            <div className='flex sm:flex-col justify-between items-start'>
              <h1 className='font-bold text-2xl'>Delivery:</h1>
              <h1 className='text-secondary font-bold text-2xl sm:mx-auto'>{totPrice?2000:0}</h1>
            </div>

            <hr className='h-0.5 bg-gray-200 w-5/6 mx-auto'/>

            <div className='flex sm:flex-col justify-between items-start'>
              <h1 className='font-bold text-2xl'>Total:</h1>
              <h1 className='text-secondary font-bold text-2xl sm:mx-auto'>{Math.round(totPrice?totPrice*1.1+2000:0)}</h1>
            </div>

            <button className='h-10 w-full m-auto bg-secondary text-tertiary rounded-lg hover:opacity-95 active:opacity-85'>
              Confirm Order
            </button>

          </div>
          
          
        </div>

        <div className="right w-full md:w-4/5 flex">

        {cartItems?
        
          <div className="content flex flex-col  w-full text-center">

            <div className="titles flex">
                <div className="item border-r border-gray-300 w-1/4">
                  Item
                  
                </div>

                <div className="price border-r border-gray-300 w-1/4">
                  Price
                </div>

                <div className="quantity border-r border-gray-200 w-1/4">
                  Quantity
                </div>
                <div className="total border-r border-gray-200 w-1/4">
                  Total
                </div>
            </div>

            <div className='items'>
              
                {
                 tobaccoList.map((item,index)=>{
                    if(tobaccoCartItems[item._id]>0){
                        console.log(item.image)
                        return <CartItem key={index} image={item.image} name={item.name} price={item.price} quantity={tobaccoCartItems[item._id]} id={item._id} collectionName='tobacco'/>
                                                    }
                                                })
                }
                {
                 shishaList.map((item,index)=>{
                    if(shishaCartItems[item._id]>0){
           
                        return <CartItem key={index} image={item.image} name={item.name} price={item.price} quantity={shishaCartItems[item._id]} id={item._id} collectionName='shisha'/>
                                                    }
                                                })
                }
                {
                 partsList.map((item,index)=>{
                    if(partsCartItems[item._id]>0){
           
                        return <CartItem key={index} image={item.image} name={item.name} price={item.price} quantity={partsCartItems[item._id]} id={item._id} collectionName='parts'/>
                                                    }
                                                })
                }
            </div>

          </div>:<h1>No items in your cart</h1>}
        </div>

      </div>
    </div>
    </div>
  )
}

export default Cart