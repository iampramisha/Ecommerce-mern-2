import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for adding a product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/create`, productData);
      return response.data; // Return the data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error data if there's an issue
    }
  }
);

// Define the async thunk for updating a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    console.log("product",productData)
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/update/${id}`, productData);

      console.log("Full response", response);

      return response.data.data;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response.data); // Return the error data if there's an issue
    }
  }
);

// Define the async thunk for fetching a product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`);
      return response.data; // Return the data if successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error data if there's an issue
    }
  }
);
// Define the async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/list`);
        return response.data; // Return the list of products if successful
      } catch (error) {
        return rejectWithValue(error.response.data); // Return the error data if there's an issue
      }
    }
  );
  
// Define the async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`);
      return { id }; // Return the ID of the deleted product
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error data if there's an issue
    }
  }
);

// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add any regular reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Set the list of products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }).addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload); // Add the new product to the list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload; // Set the current product
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter(product => product._id !== action.payload.id); // Remove the deleted product from the list
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
