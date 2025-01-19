const { Chat } = require("../../models/chat");
const { User } = require("../../models/User");

// Controller to send a message by a seller
const sendSellerMessage = async (req, res) => {
  try {
    const { chatId, sellerId } = req.params; // Extract chatId and sellerId from the request parameters
    const { text, repliedMessage } = req.body; // Extract message text and repliedTo (optional) from the request body

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

    // // Verify that the seller is authorized to send messages for this chat
    // const product = chat.product; // Assuming `product` is populated in the chat model
    // if (!product || product.adminId.toString() !== sellerId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You are not authorized to send messages for this chat",
    //   });
    // }

    // Prepare the new message object
    const newMessage = {
      sender: sellerId,
      text,
      isSender: false, // Mark as receiver (not the buyer)
      repliedTo: repliedMessage ? { id: repliedMessage.id, text: repliedMessage.text } : null, // store the replied message
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

    // Fetch the chat and populate the 'repliedTo' field in each message
    const chat = await Chat.findOne({ chatId })
      .populate({
        path: 'messages.repliedTo',  // Populate the repliedTo field
        select: 'text',  // Only select the text of the replied message
      });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Now you can access the text of the replied message for each message in the chat
    chat.messages.forEach((message) => {
      if (message.repliedTo) {
        console.log('Replied message text:', message.repliedTo.text);
      }
    });

    // Return the chat with populated replies
    res.json({ success: true, chat });
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
        select: 'userName', // Select the 'name' field from the User model
      });

    // Return the chats for the seller
    res.json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch chats' });
  }
};

module.exports = { sendSellerMessage, getChatsForSeller, getChatWithReplies };
