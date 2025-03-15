const { Chat } = require("../../models/chat");
const { User } = require("../../models/User");
// Controller to send a message by a seller
const sendSellerMessage = async (req, res) => {
  try {
    const { chatId, sellerId } = req.params; // Extract chatId and sellerId from the request parameters
    const { text, productTitle, productImage, repliedMessage } = req.body; // Extract message text, product details, and repliedTo (optional) from the request body

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

    // Prepare the new message object with repliedTo, productTitle, and productImage
    const newMessage = {
      sender: sellerId,
      text,
      productTitle, // Include product title
      productImage, // Include product image
      isSender: false, // Mark as receiver (not the buyer)
      repliedTo: repliedMessage ? { id: repliedMessage.id, text: repliedMessage.text } : null, // Store the replied message
    };

    // Add the new message to the chat
    chat.messages.push(newMessage);
    await chat.save();

    // Respond with the updated chat
    return res.status(200).json({
      success: true,
      chatId: chat.chatId,
      message: "Message sent successfully",
      data: chat,
    });
  } catch (error) {
    console.error("Error in sendSellerMessage:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending the message",
    });
  }
};
// Controller to get chat with replies
const getChatWithReplies = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Fetch the chat and populate the 'repliedTo' field and 'product' field
    const chat = await Chat.findOne({ chatId })
      .populate({
        path: 'messages.repliedTo', // Populate the repliedTo field
        select: 'text', // Only select the text of the replied message
      })
      .populate('product', 'title image'); // Populate product title and image

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Extract product title and image from the product
    const productTitle = chat.product?.title || 'Product not found';
    const productImage = chat.product?.image || '';

    // Map messages to include product title and image
    const messagesWithProductDetails = chat.messages.map((message) => ({
      ...message.toObject(),
      productTitle, // Include product title
      productImage, // Include product image
    }));

    // Return the chat with populated replies and product details
    res.json({ 
      success: true, 
      chat: {
        ...chat.toObject(),
        messages: messagesWithProductDetails, // Include messages with product details
      },
    });
  } catch (error) {
    console.error("Error in getChatWithReplies:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the chat",
    });
  }
};

// Controller to get all chats for a seller
const getChatsForSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Fetch all chats for the seller by checking if the sellerId is in the participants list
    const chats = await Chat.find({
      participants: sellerId,
    })
      .sort({ createdAt: -1 }) // Sort by date, most recent first
      .populate({
        path: 'participants',
        select: 'userName', // Select the 'userName' field from the User model
      })
      .populate('product', 'title image'); // Populate product title and image

    // Return the chats for the seller with product details
    res.json({ success: true, chats });
  } catch (error) {
    console.error("Error in getChatsForSeller:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch chats' });
  }
};
// Controller to delete a chat
const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params; // Extract chatId from the request parameters

    // Find and delete the chat
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    // If chat is not found, return a 404 error
    if (!deletedChat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Delete orphan chats (chats with no associated users or messages)
    const orphanChats = await Chat.find({
      $or: [
        { users: { $size: 0 } }, // Chats with no users
        { messages: { $size: 0 } }, // Chats with no messages
      ],
    });

    if (orphanChats.length > 0) {
      await Chat.deleteMany({
        _id: { $in: orphanChats.map((chat) => chat._id) },
      });
      console.log(`Deleted ${orphanChats.length} orphan chats.`);
    }

    // Return success response with the deleted chat ID
    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      data: {
        deletedChatId: deletedChat._id, // Return the deleted chat ID
        orphanChatsDeleted: orphanChats.length, // Number of orphan chats deleted
      },
    });
  } catch (error) {
    console.error("Error in deleteChat:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the chat",
    });
  }
};

module.exports = { sendSellerMessage, getChatsForSeller, getChatWithReplies,deleteChat };
