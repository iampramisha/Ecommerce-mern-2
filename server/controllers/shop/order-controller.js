const express = require('express');
const router = express.Router();

const Order = require('../../models/Order');

const payment  = require('paypal-rest-sdk');
const paypal = require('../../helpers/paypal');
const { Product } = require('../../models/Product');
const { Cart } = require('../../models/Cart');


// Route to create an order and initiate payment
const createOrder = async (req, res) => {
    const { items, userId, addressInfo, total, shippingCost } = req.body; // Include shippingCost
    const paymentMethod = "PayPal";

    console.log('Incoming request to create order:', { items, userId, addressInfo, paymentMethod, total, shippingCost });
    const formattedTotal = parseFloat(total).toFixed(2).toString();

    const newOrder = new Order({
        userId,
        cartItems: items,
        addressInfo,
        orderStatus: 'Pending',
        paymentMethod,
        paymentStatus: 0,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        totalPrice: formattedTotal,  // Save the formatted total price
        shippingCost, // Save the shipping cost
    });
    try {
        await newOrder.save();
        console.log('Order saved successfully:', newOrder._id); // Log the saved order ID

        const payment = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return?orderId=${newOrder._id}`,
                cancel_url:`${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
            },
            transactions: [{
                amount: {
                    total: total, // Use the total from the request body
                    currency: 'USD',
                },
                description: 'Order payment',
            }],
        };

        // Log payment details
        console.log('Creating PayPal payment with details:', payment);

        paypal.payment.create(payment, (error, payment) => {
            if (error) {
                console.error('PayPal error while creating payment:', error.response || error);
                return res.status(500).json({ error: 'Payment creation failed', details: error });
            }

            // Log successful payment creation
            console.log('PayPal payment created successfully:', payment);

            const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
            res.json({ approvalUrl, orderId: newOrder._id });
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Order creation failed', details: error });
    }
};


// Route to capture paymentconst capturePayment = async (req, res) => {
  // Route to capture // Route to capture payment
  // Route to capture payment
const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;

        let order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order cannot be found",
            });
        }

        // Update payment status and order confirmation
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;

        const cartItems = order.cartItems;

        // Update product stock
        for (let item of cartItems) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.totalStock -= item.quantity;
                await product.save();
            }
        }

        // Assuming Cart model stores items per user, delete the cart items after the order is confirmed
        // Delete the purchased cart items
        const userId = order.userId;
        await Cart.updateOne(
            { user: userId }, // Use the correct field name
            { $pull: { products: { product: { $in: cartItems.map(item => item.productId) } } } } // Correct products reference
        );

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order confirmed and cart items deleted',
            data: order,
        });
       
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
            error: e.message
        });
    }
};


// Route to fetch all orders or filter by user ID
const getOrders = async (req, res) => {
    try {
        const userId = req.query.userId; // Get userId from the query
        console.log("Fetching orders for userId:", userId); // Log userId for debugging
        let orders;

        if (userId) {
            orders = await Order.find({ userId }).sort({ orderDate: -1 });
        } else {
            orders = await Order.find().sort({ orderDate: -1 });
        }

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



module.exports={createOrder,capturePayment,getOrderById,getOrders}