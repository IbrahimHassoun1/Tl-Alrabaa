import { orderModel } from "../models/orderModel.js"

export const listOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const filter = userId ? { userId } : {};

        const orders = await orderModel.find(filter);
        return res.status(200).json({ success: true, data: orders });
    } catch (err) {
        console.log("Error fetching orders:", err);
        res.status(500).json({ success: false, message: "Could not retrieve orders." });
    }
};


export const addOrder = async (req, res) => {
    try {
        const { userId, cartData,total } = req.body;

        // Check for missing userId
        if (!userId) {
            console.log("No userId found");
            return res.status(400).json({ success: false, message: "No userId found" });
        }

        // Check for missing cartData
        if (!cartData) {
            console.log("No cartData found");
            return res.status(400).json({ success: false, message: "No cartData found" });
        }
        if(!total){
            console.log("No total price found");
            return res.status(400).json({ success: false, message: "No total price found" });
        }
        // Create a new order
        const newOrder = new orderModel({
            userId: userId,
            cartData: cartData,
            currentStatus: "pending",
            total:total
            
        });

        // Save the new order to the database
        await newOrder.save();

        return res.status(201).json({ success: true, message: "Order stored successfully" });
    } catch (err) {
        console.log("Error saving order:", err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


export const removeOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({ success: false, message: "No orderId provided" });
        }

        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, message: "Order removed successfully" });
    } catch (err) {
        console.log("Error removing order:", err);
        res.status(500).json({ success: false, message: "Could not remove order." });
    }
};


export const changeOrderStatus = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;

        if (!orderId || !newStatus) {
            return res.status(400).json({ success: false, message: "OrderId and new status are required" });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { currentStatus: newStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, message: "Order status updated", data: updatedOrder });
    } catch (err) {
        console.log("Error updating order status:", err);
        res.status(500).json({ success: false, message: "Could not update order status." });
    }
};
