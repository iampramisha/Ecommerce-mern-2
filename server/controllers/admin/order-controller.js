const Order = require("../../models/Order");

// Get all orders of all users
const getAllOrdersOfAllUsers = async (req, res) => {
    try {
        console.log("Fetching all orders for all users..."); // Log for debugging
        const orders = await Order.find().sort({ orderDate: -1 }); // Fetch all orders sorted by orderDate in descending order

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message,
        });
    }
};

// Route to fetch a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order fetched successfully',
            data: order,
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order',
            error: error.message,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; // Get orderId from request parameters
        const { status } = req.body; // Get new status from request body

        // Check if the status is valid
        const validStatuses = ['pending', 'delivered', 'rejected', 'inShipping', 'inProcess'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status provided',
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Update the order status
        order.orderStatus = status;
        await order.save(); // Save the updated order

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: order,
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update order status',
            error: error.message,
        });
    }
};

module.exports = { getOrderById, getAllOrdersOfAllUsers ,updateOrderStatus};
