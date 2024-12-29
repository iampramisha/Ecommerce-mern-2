import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
     name: 'shoppingProducts',
    productList: [],
    selectedProduct: null,
    isLoading: false,
    isReviewSubmitting: false,
    reviewList: [], // To store reviews
    error: null,
};
// Thunk for fetching products where salePrice is less than price
export const fetchProductsSalePriceLessThanPrice = createAsyncThunk(
  'shoppingProducts/fetchProductsSalePriceLessThanPrice',
  async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/salePriceLessThanPrice`);
      return result.data; // Return the data directly
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for fetching reviews
export const getReviews = createAsyncThunk(
  'products/getReviews',
  async (productId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/${productId}/getreviews`);
      return response.data; // Return the reviews
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
    'shoppingProducts/fetchAllProducts',
    async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products`); // Fetch all products
      return result.data; // Returning the data directly
    }
  );
  
  
export const fetchAllFilteredProducts = createAsyncThunk(
    'shoppingProducts/fetchAllFilteredProducts',
    async ({filterParams,sortParams}) => {
        const query=new URLSearchParams({...filterParams,sortBy: sortParams})
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`); // Replace with your API endpoint
      console.log(result);

      return result?.data; // Returning the entire response object
    }
  );
// fetch product details including reviews
export const fetchProductDetails = createAsyncThunk(
  'shoppingProducts/fetchProductDetails',
  async (productId) => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${productId}`);
    return result.data; // This now includes product and reviews
  }
);

  export const addReview = createAsyncThunk(
    'shoppingProducts/addReview',
    async ({ productId, review, userId }) => {
      const url = `${import.meta.env.VITE_API_URL}/api/shop/products/${productId}/reviews`;
      console.log('API URL:', url);
      try {
        const response = await axios.post(url, {
          rating: review.rating,
          comment: review.comment,
          userId: userId,  // Include userId
        });
        return response.data;
      } catch (error) {
        return Promise.reject(error.response ? error.response.data : error);
      }
    }
  );
  

const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data; // Correctly assign the data from payload
        state.error = null;
    })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
        .addCase(fetchAllFilteredProducts.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            console.log("Full action object:", action);
            console.log("action payload", action.payload);
            state.isLoading = false;
          
            state.productList = action.payload.data; // Adjust based on the response structure
            state.status = 'succeeded';
          })

          .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.status = 'failed';
            console.error("Failed to fetch products", action.error.message);
          }).addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
            state.status = 'loading';
          })
          .addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedProduct = action.payload.data; // Store product details
            state.reviewList = action.payload.data.reviews; // Store reviews for that product
            state.error = null;
          })
        .addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.status = 'failed';
        }).addCase(addReview.pending, (state) => {
          state.isReviewSubmitting = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        if (!state.reviewList) {
            state.reviewList = []; // Fallback initialization
        }
        state.reviewList.push(action.payload); // Add new review to the list
    })
    
      .addCase(addReview.rejected, (state, action) => {
          state.isReviewSubmitting = false;
          state.error = action.error.message;
      }) .addCase(getReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }). addCase(fetchProductsSalePriceLessThanPrice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle fetchProductsSalePriceLessThanPrice fulfilled
      .addCase(fetchProductsSalePriceLessThanPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data; // Adjust based on the response structure
        state.error = null;
      })
      // Handle fetchProductsSalePriceLessThanPrice rejected
      .addCase(fetchProductsSalePriceLessThanPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    }})

export default shoppingProductSlice.reducer;

