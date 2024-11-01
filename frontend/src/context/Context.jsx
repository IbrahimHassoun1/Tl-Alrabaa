import React, { createContext, useEffect, useState } from 'react';
React
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the context
const MyContext = createContext();

// Create a provider component
const MyProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [hasAccount, setHasAccount] = useState(false);
    
    const [tobaccoList, setTobaccoList] = useState([]); 
    const [shishaList, setShishaList] = useState([]); 
    const [partsList, setPartsList] = useState([]);
    
    const [token,setToken]=useState("")
    useEffect(()=>{
        if (localStorage.token){
            setToken(localStorage.token)
        }
        setLoggedIn(true)
    },[])

    const [cartItems, setCartItems] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [data,setdata]=useState({})
    const [imageFile,setImageFile]=useState(null)
    const [productIsChosen,setProductIsChosen]=useState(false)
    const [orders,setOrders]=useState({})
    const URL="https://tl-alrabaa-production.up.railway.app"

    const [totPrice,setTotPrice]=useState(0)

    const getTobacco = async () => {
        try {
            const response = await axios.get(URL+"/api/tobacco/list");
            
            setTobaccoList(response.data.data);
        } catch (error) {
            console.log("Error fetching tobacco:", error.message);
        }
    };

    useEffect(() => {
        getTobacco();
    }, []);




    const getShisha = async () => {
        try {
            const response = await axios.get(URL+"/api/shisha/list");
            
            setShishaList(response.data.data); 
        } catch (error) {
            console.log("Error fetching shisha:", error.message);
        }
    };

    useEffect(() => {
        getShisha();
    }, []);



    const getParts = async () => {
        try {
            const response = await axios.get(URL+"/api/parts/list");
            
            setPartsList(response.data.data); 
        } catch (error) {
            console.log("Error fetching parts:", error.message);
        }
    };

    useEffect(() => {
        getParts();
    }, []);

    const getOrders=async()=>{
        try {
            const response = await axios.get(URL+"/api/order/list");
            console.log("orders response:",response)
            setOrders(response.data.data); 
        } catch (error) {
            console.log("Error fetching parts:", error.message);
        }

    }


    useEffect(()=>{
        getOrders()
    },[])

    const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

const addToCart = debounce(async (id, collectionName, price) => {
    setCartItems(prev => {
        const updatedCart = { ...prev };
        if (!updatedCart[collectionName + "_" + id]) {
            updatedCart[collectionName + "_" + id] = 1;
        } else {
            updatedCart[collectionName + "_" + id] += 1;
        }
        
        return updatedCart;
    });
    setTotPrice(prev => prev + price);
    if(token){
        await axios.post(URL+"/api/cart/add",{id,collectionName},{headers:{token}})
    }
}, 390); 




const removeFromCart = debounce(async (id, collectionName, price) => {
    setCartItems(prev => {
        const updatedCart = { ...prev };

        if (updatedCart[collectionName + "_" + id]) {
            updatedCart[collectionName + "_" + id] -= 1;

            if (updatedCart[collectionName + "_" + id] <= 0) {
                delete updatedCart[collectionName + "_" + id];
            if(window.location.pathname==="/cart"){
                setTimeout(() => {
                    window.location.reload()
                }, 250);
                
            }
        }
            }
                
        
        return { ...updatedCart };
    });

    // Update total price (making sure it doesn't go negative)
    setTotPrice(prev => Math.max(prev - price, 0));

    // Perform async API call
    if (token) {
        try {
            await axios.post(URL + "/api/cart/remove", { id, collectionName }, { headers: { token } });
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    }
}, 450);



const loadCartData = async (token) => {
    const response = await axios.get(URL + "/api/cart/get", {
        headers: { token }
    });
    
    if(response.data.cartData){
        setCartItems(response.data.cartData);
    }

    
    
};  


useEffect(()=>{
    async function loadData() {
        
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
        }
    }
    loadData()
    
  },[])


  

   


    const findOne=async(collectionName,id)=>{
        if(collectionName==="tobacco"){
            const response=await axios.get(URL+"/api/tobacco/"+id)
            return response.data.data
        }
        if(collectionName==="shisha"){
            const response=await axios.get(URL+"/api/shisha/"+id)
            return response.data.data
        }
        if(collectionName==="parts"){
            const response=await axios.get(URL+"/api/parts/"+id)
            return response.data.data
        }
    }


    const increaseSubtotal=(price)=>{
        setTotPrice(prev=>prev+price)
    }
    const decreaseSubtotal=(price)=>{
        setTotPrice(prev=>prev-price)
    }
    //delete these useEffects
   

    const handleChange=(e)=>{
        const {name,value}=e.target
        setdata(data=>({...data,[name]:value}))
    }

    const addToStock = async (collectionName, data) => {
        console.log(data)
        try {
            const formData = new FormData();
            formData.append("image", imageFile); // Ensure imagePreview is defined and holds the file
    
            // Append other data to formData
            for (const key in data) {
                formData.append(key, data[key]); // Append each key-value pair in the data object
            }
            formData.append('collectionName', collectionName); // Also add collectionName
            
            
            const response = await axios.post(URL + "/api/" + collectionName + "/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct header
                },
            });
    
            setdata({})
            setImageFile(null)
            setImagePreview(null)
            toast.success(collectionName+" added successfuly")

            return response.data.message;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            return error.message;
        }
    };
    
    const findOneAndUpdate = async (collectionName, _id, updatedData) => {
        try {
            const response = await axios.patch(`${URL}/api/${collectionName}/patch`, updatedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            toast.success(`${collectionName} updated successfully`);
            setdata(response.data.updated)
            return response.data;
        } catch (error) {
            toast.error(`Error updating ${collectionName}:`);
            console.log(error)
            return error.message;
        }
    };
    
    const initiateEdit=async(collectionName,id)=>{
        try{
            setProductIsChosen(true)
            const response=await axios.get(URL+"/api/"+collectionName+"/"+id)
            setdata(response.data.data)
            console.log(data)
        }catch(err){
            console.log(err)
        }}


        const deleteItem = async (collectionName, id) => {
            try {
                if (!collectionName || !id) {
                    throw new Error("Collection name or ID is missing.");
                }
        
                // Send the _id in the request body
                await axios.delete(`${URL}/api/${collectionName}/delete`, {
                    data: { _id: id } // Use _id instead of id
                });
        
                toast.success(`${collectionName} has been removed`);
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || "Error removing item.");
            }
        };
        
        function optimizeImage(file, maxWidth, maxHeight, quality = 0.7) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = URL.createObjectURL(file);
        
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Set canvas dimensions to keep aspect ratio
                    let width = img.width;
                    let height = img.height;
        
                    if (width > maxWidth || height > maxHeight) {
                        if (width > height) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        } else {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
        
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
        
                    canvas.toBlob(
                        (blob) => {
                            resolve(blob);
                            URL.revokeObjectURL(img.src);
                        },
                        'image/jpeg',
                        quality
                    );
                };
        
                img.onerror = reject;
            });
        }
        


    const value = {
        loggedIn,
        setLoggedIn,
        showPopup,
        setShowPopup,
        hasAccount,
        setHasAccount,
        cartItems,
        setCartItems,
        tobaccoList,
        shishaList,
        partsList,
        URL,
        addToCart,removeFromCart,
        findOne,
        totPrice,setTotPrice,
        increaseSubtotal,decreaseSubtotal,
        token,setToken,
        imagePreview,setImagePreview,
        imageFile,setImageFile,
        handleChange,data,setdata,
        addToStock,
        findOneAndUpdate,
        productIsChosen,setProductIsChosen,
        initiateEdit,
        deleteItem,
        optimizeImage,
        orders,setOrders
    };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

MyProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { MyContext, MyProvider };
