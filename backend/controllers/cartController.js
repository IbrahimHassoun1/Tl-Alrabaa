import {userModel} from '../models/userModel.js'

// add items to user cart
const addToCart= async (req,res)=>{

    const {collectionName,id}=req.body

    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData
        if (!cartData[collectionName + "_" + id]) {
            cartData[collectionName + "_" + id] = 1;
        } else {
            cartData[collectionName + "_" + id] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added To Cart"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}

//remove items from user cart

const removeFromCart= async (req,res)=>{
    const {collectionName,id}=req.body
    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        if (cartData[collectionName + "_" + id]) {
            cartData[collectionName + "_" + id] -= 1;

            
            if (cartData[collectionName + "_" + id] <= 0) {
                delete cartData[collectionName + "_" + id];
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed From Cart"})
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
        
    }
}

//fetch user cart data
const getCart= async (req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData
        res.json({success:true,cartData})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}

const restoreCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "cartData restored successfully" });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Error" });
    }
};


export {addToCart,removeFromCart,getCart,restoreCart}