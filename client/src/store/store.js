import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import productSlice from "./admin/product-slice";
import shopProductSlice from "./shop/products-slice"
import cartProductSlice from "./shop/cart-slice"
import AddressSlice from "./shop/address-slice"
import orderSlice from "./shop/order-slice"
import ordersSlice from "./admin/order-slice"
import distanceSlice from "./shop/distance-slice"; // Import the distance slice
import chatSlice from "./shop/chat-slice"; // Import the distance slice

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productSlice,
        shopProducts: shopProductSlice,
        
        cart: cartProductSlice,
        address:AddressSlice,
        order:orderSlice,
        allOrder:ordersSlice,
distance:distanceSlice,
chat:chatSlice
    }
});

export default store;
