const { Chat } = require("../../models/chat");
const { User } = require("../../models/User");
// Controller to fetch all chats for a seller
const sendSellerMessage = async (req, res) => {
    try {
      const { chatId, sellerId } = req.params; // Extract chatId and sellerId from the request parameters
      const { text} = req.body; // Extract message text and optional reply-to message ID from the request body
  
      // Validate if the chat exists
      const chat = await Chat.findOne({ chatId });
      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found",
        });
      }
  
      // Validate the message text
      if (!text || text.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Message text cannot be empty",
        });
      }
  
    //   // Verify that the seller is allowed to send messages for this chat
    //   const product = await Product.findById(chat.product); // Assuming `product` is stored in the chat model
    //   if (!product || product.adminId.toString() !== sellerId) {
    //     return res.status(403).json({
    //       success: false,
    //       message: "You are not authorized to send messages for this chat",
    //     });
    //   }
  
   
      // Add the new message to the chat
      const newMessage = {
        sender: sellerId,
        text,
        isSender: false, // Mark as receiver (not the buyer)
     
      };
  
      chat.messages.push(newMessage);
      await chat.save();
  
      // Respond with the updated chat
      res.status(200).json({
        success: true,
        chatId: chat.chatId,
        data: chat,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Some error occurred while sending the message",
      });
    }
  };
  
const getChatsForSeller = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        // Fetch all chats for the seller by checking if the sellerId is in the participants list
        const chats = await Chat.find({
            participants: sellerId
        })
        .sort({ createdAt: -1 }) // Sort by date, most recent first
        .populate({
            path: 'participants',
            select: 'userName' // Select the 'name' field from the User model
        });

        // Now, each chat will have a populated participants array with the user's name
        res.json({ chats });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats' });
    }
};

module.exports = { sendSellerMessage,getChatsForSeller };
