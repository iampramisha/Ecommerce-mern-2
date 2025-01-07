// store/chat-slice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch chats for a seller
export const fetchChatsForSeller = createAsyncThunk('chat/fetchChatsForSeller', async (sellerId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats/${sellerId}`);
    return response.data.chats; // Assuming the response has a 'chats' field
});
export const sendSellerMessage = createAsyncThunk(
    "chat/sendSellerMessage",
    async ({ chatId, sellerId, text}, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/chats/${sellerId}/${chatId}`,
          { text } // Send the replyToMessageId along with the text
        );
        return response.data; // Return the data from the API response
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to send seller message"
        );
      }
    }
  );
  

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [], // Array to store all chats
        currentChat: null, // Holds the current selected chat
        loading: false,
        error: null,
    },
    reducers: {
        setCurrentChat: (state, action) => {
            // Set the current chat based on the chatId
            state.currentChat = state.chats.find(chat => chat.id === action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatsForSeller.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChatsForSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload; // Set chats to the fetched chats
            })
            .addCase(fetchChatsForSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Handle error if API request fails
            }) .addCase(sendSellerMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(sendSellerMessage.fulfilled, (state, action) => {
                state.loading = false;
                const { chatId, data } = action.payload;
                if (state.currentChat?.id === chatId) {
                  state.currentChat.messages = data.messages; // Assuming data contains updated messages
                }
              })
              
              .addCase(sendSellerMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
    },
});

export const { setCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
