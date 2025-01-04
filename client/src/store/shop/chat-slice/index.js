
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

// Async thunk to fetch all chats for the user
export const getUserChats = createAsyncThunk('chat/fetchChats', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/chats/user`);
    return response.data.data; // Assuming response.data.data contains the chats
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch chats');
  }
});

// Async thunk to fetch messages for a specific chat
export const getChatMessages = createAsyncThunk('chat/fetchMessages', async (chatId, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/chats/${chatId}/messages`);
    return response.data.data; // Assuming response.data.data contains the messages
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
  }
});

// Async thunk to send a new message
export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ chatId, text }, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chats/${chatId}/messages`, { text });
    return response.data.data; // Assuming response.data.data contains the updated chat
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to send message');
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    currentMessages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetChats(state) {
      state.chats = []; // Clear chats when called
    },
    resetMessages(state) {
      state.currentMessages = []; // Clear messages when called
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch chats actions
      .addCase(getUserChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chats = action.payload;
      })
      .addCase(getUserChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetch messages actions
      .addCase(getChatMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMessages = action.payload;
      })
      .addCase(getChatMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle send message actions
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMessages.push(action.payload); // Assuming message is added to currentMessages
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetChats, resetMessages } = chatSlice.actions;

export default chatSlice.reducer;
