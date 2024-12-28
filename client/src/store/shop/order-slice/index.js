// // store/order/orderSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const createOrder = createAsyncThunk('order/createOrder', async ({ items, userId,cartId, addressInfo, total }) => {
//     const response = await axios.post("http://localhost:5000/api/shop/order/createOrder", {
//         items,
//         userId,
// cartId,
//         addressInfo,
//         total,
//     });
//     return response.data; // Return order creation data (e.g., approval URL)
// });

// export const capturePayment = createAsyncThunk('order/capturePayment', async ({ paymentId, payerId, orderId }) => {
//     const response = await axios.post('http://localhost:5000/api/shop/order/capturePayment', {
//         paymentId,
//         payerId,
//         orderId,
//     });
//     return response.data; // Return captured payment data (e.g., updated order)
// });

// const orderSlice = createSlice({
//     name: 'order',
//     initialState: {
//         orders: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {
//         // Add any additional reducers if needed
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createOrder.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(createOrder.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 // Optionally, you can push the new order into the orders array if you want to keep track of them
//                 // state.orders.push(action.payload);
//                 window.location.href = action.payload.approvalUrl; // Redirect to PayPal
//             })
//             .addCase(createOrder.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(capturePayment.fulfilled, (state, action) => {
//                 // Handle successful payment capture
//                 console.log('Payment successful:', action.payload);
//                 // Update the orders state or perform any other necessary action
//             });
//     },
// });


// export default orderSlice.reducer;
// store/order/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to create an order
export const createOrder = createAsyncThunk('order/createOrder', async ({ items, userId, addressInfo, total }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/createOrder`, {
        items,
        userId,
     
        addressInfo,
        total,
    });
    return response.data; // Return order creation data (e.g., approval URL)
});

// Async thunk to capture payment
export const capturePayment = createAsyncThunk('order/capturePayment', async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/capturePayment`, {
        paymentId,
        payerId,
        orderId,
    });
    return response.data; // Return captured payment data (e.g., updated order)
});

// Async thunk to fetch all orders
export const fetchOrders = createAsyncThunk('order/fetchOrders', async (userId) => {
    // Using query parameters instead of URL segments
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/`, {
        params: { userId } // Send userId as a query parameter
    });

    return response.data; // Return fetched orders
});

  
// Async thunk to fetch a specific order by ID
export const fetchOrderById = createAsyncThunk('order/fetchOrderById', async (orderId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/${orderId}`);
    return response.data; // Return fetched order
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        resetOrders(state) {
            state.orders = []; // Clear orders when called
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionally, you can push the new order into the orders array if you want to keep track of them
                // state.orders.push(action.payload);
                window.location.href = action.payload.approvalUrl; // Redirect to PayPal
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(capturePayment.fulfilled, (state, action) => {
                // Handle successful payment capture
                console.log('Payment successful:', action.payload);
                // Update the orders state or perform any other necessary action
            })
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload.orders; // Assuming payload contains the orders array
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Handle the fetched order, e.g., store it or perform other actions
                console.log('Fetched order:', action.payload.orders); // Assuming payload contains the order
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;
