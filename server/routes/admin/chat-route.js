const express = require('express');
const { getChatsForSeller } = require('../../controllers/admin/chat-controller');
const router = express.Router();

// API endpoint to get all chats for a seller
router.get('/:sellerId', getChatsForSeller); // Use the controller function

module.exports = router;
