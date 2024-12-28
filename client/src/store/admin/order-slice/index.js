// orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk for fetching orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/get`);
    return response.data; // Adjust based on your API response structure
});
export const fetchOrderDetailsById = createAsyncThunk(
    'order/fetchOrderDetailsById',
    async (orderId) => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`);
      return response.data; // Adjust based on your API response structure
    }
  );
  
  export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async ({ orderId, status }) => {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`, 
        { 
            status: status

        });
      return response.data;
    }
  );
  

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        resetOrderDetails: (state) => {
          state.orders = null;
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload.orders;// Store fetched orders
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture error message
            }).addCase(fetchOrderDetailsById.fulfilled, (state, action) => {
                state.orderDetails = action.payload; // Store fetched order details
              }).addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
              }).addCase(fetchOrderDetailsById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture error message
            })
            
              .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                // Update the order in the orders array
                const index = state.orders.findIndex(order => order._id === action.payload.data._id);
                if (index !== -1) {
                  state.orders[index] = action.payload.data;
                }
              })
              .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
    },
});

// Export actions if you have defined any in reducers
// export const { someAction } = orderSlice.actions;
export const { resetOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
