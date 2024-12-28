import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API endpoint

// Async thunk for adding an address
 export const addAddress = createAsyncThunk(
  'addresses/addAddress',
  async ({userId,addressData}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/`,{ userId,...addressData});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching addresses by user ID
export const fetchAddresses = createAsyncThunk(
  'addresses/fetchAddresses',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching a specific address by user ID and address ID
export const fetchAddressById = createAsyncThunk(
  'addresses/fetchAddressById',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/${userId}/${addressId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating an address
export const updateAddress = createAsyncThunk(
  'addresses/updateAddress',
  async ({ userId, addressId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/${userId}/${addressId}`, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting an address
export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async ({ userId, addressId }) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/${userId}/${addressId}`, {
        data: { userId }, // Include userId in the request
      });
      return { id: addressId }; // Return the ID of the deleted address
    }
  );
  

// Create the address slice
const addressSlice = createSlice({
  name: 'addresses',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle add address
    builder.addCase(addAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.loading = false;
     state.addresses=action.payload.addresses;
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetch addresses
    builder.addCase(fetchAddresses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses; // Access the addresses array from the response
      });
          builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetch address by ID
    builder.addCase(fetchAddressById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddressById.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.addresses.findIndex(address => address._id === action.payload._id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      } else {
        state.addresses.push(action.payload);
      }
    });
    builder.addCase(fetchAddressById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle update address
    builder.addCase(updateAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.addresses.findIndex(address => address._id === action.payload.address._id);
      if (index !== -1) {
        state.addresses[index] = action.payload.address;
      }
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle delete address
    builder.addCase(deleteAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.addresses = state.addresses.filter(address => address._id !== action.payload.id);
  
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export the actions and reducer
export default addressSlice.reducer;
