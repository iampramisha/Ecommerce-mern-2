import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { fetchCartItems } from '../shop/cart-slice';




const initialState={
    isAuthenticated: false,
    isLoading: true,
    user:null
}
//When you use createAsyncThunk, it automatically generates action creators for the three action states (pending, fulfilled, rejected) and manages their lifecycle.
//registerUser becomes a thunk action creator. When you dispatch registerUser(formData), it runs the async function you provided, dispatches actions based on the promise state (pending, fulfilled, or rejected), and passes the result to the reducer.
export const registerUser=createAsyncThunk('/auth/register',
    //username,email,password
    async(formData)=>{
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,formData,{
            withCredentials:true
        });
        return response.data;
    }
)
//to store this sdata, we use extraREducers below


export const loginUser = createAsyncThunk('/auth/login', async (formData, { dispatch }) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData, {
      withCredentials: true
  });
  if (response.data.success) {
      // After successful login, fetch the user's cart
      dispatch(fetchCartItems(response.data.user.id));  // Fetch cart after login
  }
  return response.data;
});
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Make the API call to log out, ensuring credentials are included
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {}, // Empty object for body since logout typically doesn't require any payload
      { withCredentials: true } // Include cookies with the request
    );
    return response.data;
  } catch (error) {
    // Handle errors by rejecting with the error response
    return rejectWithValue(error.response?.data || { message: 'Logout failed' });
  }
});

export const checkAuth = createAsyncThunk('/auth/checkauth', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        localStorage.removeItem('token'); // If using token
        sessionStorage.removeItem('user'); // If storing user data
        return response.data;
    } catch (error) {
        // Handle errors here if needed
        throw error;
    }
});
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
        }
    },
        extraReducers:(builder)=>{
            builder.addCase(registerUser.pending,(state)=>{
                state.isLoading=true
            }).addCase(registerUser.fulfilled,(state,action)=>{
               state.isLoading=false ;
               state.user=null;
               state.isAuthenticated=false
            }).addCase(registerUser.rejected,(state,action)=>{
                state.isLoading=false ;
                state.user=null;
                state.isAuthenticated=false
             });
             builder
             .addCase(loginUser.pending, (state) => {
               state.isLoading = true;
               state.isError = false;
               state.errorMessage = '';
             })
             .addCase(loginUser.fulfilled, (state, action) => {
                console.log('Login fulfilled payload:', action.payload); // Log payload
                state.isLoading=false ;
                console.log('Action:', action); // Log entire action object
            if (action.payload.success) {
                state.user = action.payload.user; // Store user data from response
                state.isAuthenticated = true;
              } else {
                state.user = null;
                state.isAuthenticated = false;
              }
            })
             .addCase(loginUser.rejected, (state, action) => {
                console.log('Login rejected:', action.error.message);
                state.isLoading = false;
               state.isError = true;
               state.errorMessage = action.error.message; // Store error message
               state.user = null;
               state.isAuthenticated = false;
             });
             builder
             .addCase(checkAuth.pending, (state) => {
               state.isLoading = true;
               state.isError = false;
               state.errorMessage = '';
             })
             .addCase(checkAuth.fulfilled, (state, action) => {
                console.log('Login fulfilled payload:', action.payload); // Log payload
                console.log('Action:', action); // Log entire action object
                state.isLoading=false ;
            if (action.payload.success) {
                state.user = action.payload.user; // Store user data from response
                state.isAuthenticated = true;
              } else {
                state.user = null;
                state.isAuthenticated = false;
              }
            })
             .addCase(checkAuth.rejected, (state, action) => {
                console.log('Login rejected:', action.error.message);
                state.isLoading = false;
               state.isError = true;
               state.errorMessage = action.error.message; // Store error message
               state.user = null;
               state.isAuthenticated = false;
             }) .addCase(logoutUser.fulfilled, (state, action) => {
              state.isLoading = false;
              state.user = null;
              state.isAuthenticated = false;
            });
        
        }
    }
)

export const {setUser}=authSlice.actions;
export default authSlice.reducer;