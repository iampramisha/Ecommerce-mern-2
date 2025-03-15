// store/chat-slice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch chats for a seller
export const deleteChat = createAsyncThunk(
  'chat/deleteChat',
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`
      );
      return response.data; // Return the deleted chat ID
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete chat'
      );
    }
  }
);
export const getChatMessages = createAsyncThunk(
    'chat/getChatMessages',
    async (chatId) => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`);
      return response.data.chat;  // Assuming the response returns the chat data
    }
  );
export const fetchChatsForSeller = createAsyncThunk('chat/fetchChatsForSeller', async (sellerId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats/${sellerId}`);
    return response.data.chats; // Assuming the response has a 'chats' field
});
export const sendSellerMessage = createAsyncThunk(
  "chat/sendSellerMessage",
  async ({ chatId, sellerId, text, productTitle, productImage, repliedMessage }, { rejectWithValue }) => {
    try {
      // Log the chatId to the console
      console.log("Sending message to chat with ID:", chatId);

      // Making the API request
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chats/${sellerId}/${chatId}`,
        { 
          text, 
          productTitle, // Include product title
          productImage, // Include product image
          repliedMessage // Include replied message
        }
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
              })
              .addCase(getChatMessages.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getChatMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentMessages = action.payload.messages;
              })
              .addCase(getChatMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
              }) .addCase(deleteChat.pending, (state) => {
                state.loading = true;
              })
              .addCase(deleteChat.fulfilled, (state, action) => {
                state.loading = false;
                const deletedChatId = action.payload; // Assuming the API returns the deleted chat ID
                state.chats = state.chats.filter(chat => chat.id !== deletedChatId); // Remove the deleted chat from the list
                if (state.currentChat?.id === deletedChatId) {
                  state.currentChat = null; // Clear the current chat if it was deleted
                }
              })
              .addCase(deleteChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Handle error if deletion fails
              });
    },
});

export const { setCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
