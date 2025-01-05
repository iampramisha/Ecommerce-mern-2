const express = require('express');
const router = express.Router();

const { startOrFetchChat, sendMessage, getChatMessages, getUserChats } = require('../../controllers/shop/chat-controller');

// Start or Fetch a Chat between a Buyer and Seller for a Product
router.post('/start', startOrFetchChat);

// Send a Message in an Existing Chat
// Route to send a message
router.post('/send/:productId/:userId/:chatId', sendMessage);

// Get All Messages in a Chat
router.get('/:chatId/messages', getChatMessages);

// Get All Chats for a User
router.get('/:userId/chats', getUserChats);

module.exports = router;
