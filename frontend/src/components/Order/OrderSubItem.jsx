import React, { useContext } from 'react'
React
import PropTypes from 'prop-types'
import { MyContext } from '../../context/Context'

const OrderSubItem = ({name,image,quantity,price}) => {
    const {URL}=useContext(MyContext)
  return (
    <div className=' w-full flex text-center border-t-2 border-gray-200 border-2'>
        <div className='name sm:w-1/5 border-r-2'>
            {name}
        </div>
        <div className='picture sm:w-1/5 border-r-2'>

        {image==="image"?"Image":<img  alt="product image" src={URL+"/images/"+image} className='m-auto h-10 w-10' />}
            
        </div>
        <div className='price sm:w-1/5 border-r-2'>
            {typeof(price)==="number"?price:"Price"}
        </div>
        <div className='quantity sm:w-1/5 border-r-2'>
            {typeof(quantity)==="number"?quantity:"Quantity"}
        </div>
        <div className='subtotal sm:w-1/5'>
            {typeof(quantity)==="number"&&typeof(quantity)==="number"?quantity*price:"Subtotal"}
        </div>
        
    </div>
  )
}

OrderSubItem.propTypes={
    name:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired,
    quantity:PropTypes.number.isRequired,
    price:PropTypes.number.isRequired
}

export default OrderSubItem