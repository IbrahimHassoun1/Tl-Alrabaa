import React, { useContext } from 'react'
React
import PropTypes from 'prop-types'
import { MyContext } from '../../context/Context'

const CartItem = ({id,name,image,price,quantity,collectionName}) => {
    const {URL,addToCart,removeFromCart}=useContext(MyContext)

   
    
    
  return (
    <div className='w-full h-20 flex border border-gray-200'>
        <div className="title  w-1/4 border-r border-gray-200 flex">
            <div className='image-cotainer w-1/2 my-auto'><img src={URL+"/images/"+image} alt="item image" className='m-auto h-16' /></div>
            
            <h1 className='m-auto font-extrabold capitalize text-primary'>{name}</h1>
        </div>
        <div className="price  w-1/4 border-r border-gray-200 flex">
            <h1 className='m-auto'>{price}</h1>
        </div>
        <div className="quantity  w-1/4 border-r border-gray-200 flex">
            <h1 className='m-auto flex justify-between items-start w-full'>
                <div className='bg-primary h-5 w-5 text-tertiary rounded-full m-auto font-extrabold text-xs cursor-pointer' onClick={()=>{removeFromCart(id,collectionName,price)}}>-</div>
                
                {quantity}
                
                <div className='bg-primary h-5 w-5 text-tertiary rounded-full m-auto font-extrabold text-xs cursor-pointer' onClick={()=>{addToCart(id,collectionName,price)}}>+</div>
            </h1>
        </div>
        <div className="total  w-1/4 border-r border-gray-200 flex">
            <h1 className='m-auto'>{price*quantity}</h1>
        </div>
    </div>
  )
}

CartItem.propTypes={
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,
    quantity:PropTypes.number.isRequired,
    collectionName:PropTypes.string.isRequired
}

export default CartItem