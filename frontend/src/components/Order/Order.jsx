import React, { useContext } from 'react'
React
import PropTypes from 'prop-types'
import { MyContext } from '../../context/Context'
import OrderItem from './OrderItem'
import SlideDownSection from '../SlideDownSection/SlideDownSection'

const Order = ({selectedOrder}) => {
    const {orders,renderer}=useContext(MyContext)
    
  return (
    <div className=' w-full'>

        <SlideDownSection className={`w-full text-center text-tertiary ${selectedOrder==="pending"?"bg-yellow-400":selectedOrder==="completed"?"bg-green-400":"bg-red-400"} capitalize`}>{selectedOrder} Orders</SlideDownSection>
        <SlideDownSection className="titles flex text-center">
                    <div className="quantity border-r border-gray-200 w-1/5">Show More</div>
                    <div className="item border-r border-gray-300 w-1/5">Order ID</div>
                    <div className="price border-r border-gray-300 w-1/5">Customer Name</div>
                    <div className="total border-r border-gray-200 w-1/5">Total</div>
                    <div className="total border-r border-gray-200 w-1/5">Update Status</div>
         </SlideDownSection>

        <div className="lower w-full">

            {selectedOrder==="pending"&&renderer?
            <>
            {orders.map((item)=>{
                if(item.currentStatus==="pending"){
                    return <OrderItem key={item._id} orderId={item._id} userId={item.userId} selectedOrder={selectedOrder} total={item.total}/>
                }
            })}
            
            </>:
            selectedOrder==="completed"&&renderer?
            <>
            {orders.map((item)=>{
                if(item.currentStatus==="completed"){
                    return <OrderItem key={item._id} orderId={item._id} userId={item.userId} selectedOrder={selectedOrder}/>
                }
            })}
            
            </>:selectedOrder==="cancelled"?
            <>
            {orders.map((item)=>{
                if(item.currentStatus==="cancelled"){
                    return <OrderItem key={item._id} orderId={item._id} userId={item.userId} selectedOrder={selectedOrder}/>
                }
            })}
            
            </>:""
            }
        </div>
        
    </div>
  )
}

Order.propTypes={
    selectedOrder:PropTypes.string.isRequired
}

export default Order