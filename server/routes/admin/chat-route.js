const express = require('express');
const { getChatsForSeller, sendSellerMessage ,getChatWithReplies, deleteChat} = require('../../controllers/admin/chat-controller');

const router = express.Router();

// API endpoint to get all chats for a seller
router.get('/:sellerId', getChatsForSeller); // Use the controller function
router.post('/:sellerId/:chatId', sendSellerMessage); // Use the controller function
router.get('/:chatId', getChatWithReplies);
router.delete('/:chatId', deleteChat);



module.exports = router;
