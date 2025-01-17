import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { MyContext } from '../../context/Context';
import FadeInSection from '../FadeInSection/FadeInSection';
React
const ItemCard = ({ id,name, description, image, price, rating ,collectionName,action}) => {
  const {URL,addToCart,removeFromCart,cartItems,initiateEdit,deleteItem}=useContext(MyContext)
  // Generate star rating based on rating prop
  const renderStars = () => {
    if (rating){
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={index}>&#9733;</span> // Full star
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index + fullStars}>&#9734;</span> // Empty star
        ))}
      </>
    );
  };

}

  return (

    <FadeInSection className="m-auto w-1/6 mt-3 min-w-52  rounded overflow-hidden shadow-lg bg-white p-2 text-center">
      <img className="w-full h-52 object-cover" src={URL+"/images/"+image} alt={name} loading='lazy'/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl h-12 mb-2">{name}</div>
        <p className="text-gray-700 h-20 text-base">{description}</p>
        <div className="mt-2 text-yellow-500">
          {renderStars()}
        </div>
        <div className="mt-2 text-lg text-green-600 font-semibold">{price} IQD</div>
      </div>
      <div className="m-auto pb-2">
        {action==="delete"?
        <button className="bg-red-700 hover:opacity-90 active:opacity-80 text-white font-bold py-2 px-4 rounded" onClick={()=>{deleteItem(collectionName,id)}}>
        Delete {collectionName}
        </button>:
        action==="edit"?
        <button className="bg-secondary hover:opacity-90 active:opacity-80 text-white font-bold py-2 px-4 rounded" onClick={()=>{initiateEdit(collectionName,id)}}>
        Edit
        </button>:
        action==="add"&&`${cartItems[collectionName+"_"+id]}`==="undefined"? 
        <button className="bg-secondary hover:opacity-90 active:opacity-80 text-white font-bold py-2 px-4 rounded" onClick={()=>{addToCart(id,collectionName,price)}}>
        Add To cart
        </button>:
        <div className='controls flex justify-around'>
            <span onClick={()=>{removeFromCart(id,collectionName,price)}} className='bg-primary rounded-full text-tertiary w-9 h-9 cursor-pointer font-bold text-xl'>-</span>
            <span className='text-secondary'>{`${cartItems[collectionName+"_"+id]?cartItems[collectionName+"_"+id]:"0"}`}</span>
            <span onClick={()=>{addToCart(id,collectionName,price)}} className='bg-primary rounded-full text-tertiary w-9 h-9 cursor-pointer font-bold text-xl'>+</span>
        </div>
      }
        

      </div>
    </FadeInSection>
  );
  
};

// PropTypes validation
ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  collectionName: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,  // Added price prop
  rating: PropTypes.number, // Added rating prop
  
};

export default ItemCard;
