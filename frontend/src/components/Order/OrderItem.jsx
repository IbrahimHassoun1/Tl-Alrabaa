import React, { useContext, useEffect, useState } from 'react'
React
import PropTypes from 'prop-types'
import axios from 'axios'
import { MyContext } from '../../context/Context'
import OrderSubItem from './OrderSubItem'
import FadeInSection from '../FadeInSection/FadeInSection'




const OrderItem = ({orderId,userId,selectedOrder,total}) => {

  const {URL,getOrders,orders,tobaccoList,shishaList,partsList}=useContext(MyContext)


  const [ordererInfo,setOrdererInfo]=useState({})
  const [showMore,setShowMore]=useState(false)
  const [tobaccoOrdersItems,setTobaccoOrdersItems]=useState({})
  const [shishaOrdersItems,setShishaOrdersItems]=useState({})
  const [partsOrdersItems,setPartsOrdersItems]=useState({})
 

  const changeStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(URL+"/api/order/edit", { orderId, newStatus });
      console.log("Status updated successfully:", response.data); // Log the success
      return response.data; // Return response data if needed
    } catch (error) {
      console.error("Failed to update status:", error.message); // Log detailed error
      throw error; // Throw the error to handle it outside
    }
  };
  
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.post(`${URL}/api/user/info`, { userId });
        setOrdererInfo(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (userId) {  // Make sure userId is available before calling the function
      fetchInfo();
    }
  }, [URL,userId]);

  // useEffect(()=>{
  //   console.log("This is orders :",orders)
  //   console.log("This is tobaccoCartItems :",tobaccoCartItems)
  //   console.log("cartItems",cartItems)
  // })
  
  useEffect(() => {
    if (!Array.isArray(orders) || orders.length === 0) {
      console.warn("orders is not an array or is empty:", orders);
      return;
    }
  
    const MYORDER = orders.find(item => item._id === orderId);
    
    if (!MYORDER || !MYORDER.cartData) {
      console.warn("MYORDER or MYORDER.cartData is undefined:", MYORDER);
      return;
    }
  
    console.log("MYORDER:", MYORDER);
    console.log("MYORDER.cartData:", MYORDER.cartData);
  
    const arrayOfAllItems = Object.entries(MYORDER.cartData);
    console.log("arrayOfAllItems", arrayOfAllItems);
  
    const arrangedItems = arrayOfAllItems.map(item => ({
      id: item[0].split('_')[1],
      collectionName: item[0].split('_')[0],
      quantity: item[1],
    }));
  
    console.log("arrangedItems", arrangedItems);
  
    arrangedItems.forEach(item => {
      if (item.collectionName === "tobacco") {
        setTobaccoOrdersItems(prev => ({ ...prev, [item.id]: item.quantity }));
      } else if (item.collectionName === "shisha") {
        setShishaOrdersItems(prev => ({ ...prev, [item.id]: item.quantity }));
      } else if (item.collectionName === "parts") {
        setPartsOrdersItems(prev => ({ ...prev, [item.id]: item.quantity }));
      }
    });
  }, [orderId, orders]);
  
  return (
  <FadeInSection className='flex flex-col border-t-2 border-gray-300'>

    <div className='w-full flex text-center mt-1'>
        
                    <div className="quantity border-r border-gray-200 w-1/5 cursor-pointer" onClick={()=>{setShowMore(prev=>!prev)}}>^</div>
                    <div className="item border-r border-gray-300 w-1/5">{orderId}</div>
                    <div className="price border-r border-gray-300 w-1/5">{ordererInfo.name}<br/>{ordererInfo.phone}</div>
                    <div className="total border-r border-gray-200 w-1/5">{total} IQD</div>

                    {selectedOrder==="pending"?
                    <div className="total border-r border-gray-200 w-1/5 flex"><button className='bg-green-700 rounded-md text-tertiary m-auto w-full h-full' onClick={async()=>{await changeStatus(orderId,"completed");await getOrders();}}>Completed</button><button className='bg-red-700 w-full h-full rounded-md text-tertiary m-auto' onClick={async()=>{await changeStatus(orderId,"cancelled");await getOrders();}}>Cancel</button></div>
                    :
                    selectedOrder==="completed"?
                    <div className="total border-r border-gray-200 w-1/5 flex"><button className='bg-yellow-700 rounded-md text-tertiary m-auto w-full h-full 'onClick={async()=>{await changeStatus(orderId,"pending");await getOrders();}}>Pending</button><button className='bg-red-700 w-full h-full rounded-md text-tertiary m-auto' onClick={async()=>{await changeStatus(orderId,"cancelled");await getOrders();}}>Cancel</button></div>
                    :
                    selectedOrder==="cancelled"?
                    <div className="total border-r border-gray-200 w-1/5 flex"><button className='bg-green-700 rounded-md text-tertiary m-auto w-full h-full' onClick={async()=>{await changeStatus(orderId,"completed");await getOrders();}}>Completed</button><button className='bg-yellow-700 w-full h-full rounded-md text-tertiary m-auto' onClick={async()=>{await changeStatus(orderId,"pending");await getOrders();}}>Pending</button></div>
                    :""}

    </div>

    <div className={`SubItems flex flex-col h-fit bg-gray-100 mt-4 mb-3 transition-max-height duration-300 ease-in-out overflow-hidden ${showMore?"max-h-96":"max-h-0"}`}>
      <OrderSubItem name="Name" price="Price" image="image" quantity="Quantity"/>
      {tobaccoList.map((item, index) => {
                    if (tobaccoOrdersItems[item._id] > 0) {
                      return <OrderSubItem key={index} image={item.image} name={item.name} price={item.price} quantity={tobaccoOrdersItems[item._id]} id={item._id} collectionName='tobacco' />;
                    }
                  })}
      {shishaList.map((item, index) => {
                    if (shishaOrdersItems[item._id] > 0) {
                      return <OrderSubItem key={index} image={item.image} name={item.name} price={item.price} quantity={shishaOrdersItems[item._id]} id={item._id} collectionName='tobacco' />;
                    }
                  })}
      {partsList.map((item, index) => {
                    if (partsOrdersItems[item._id] > 0) {
                      return <OrderSubItem key={index} image={item.image} name={item.name} price={item.price} quantity={partsOrdersItems[item._id]} id={item._id} collectionName='tobacco' />;
                    }
                  })}
    </div>
    </FadeInSection>
  )
}

OrderItem.propTypes={
    orderId:PropTypes.string.isRequired,
    userId:PropTypes.string.isRequired,
    selectedOrder:PropTypes.string.isRequired,
    total:PropTypes.number.isRequired
}
export default OrderItem