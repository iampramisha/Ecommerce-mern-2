const { Chat } = require("../../models/chat");
const { Product } = require("../../models/Product");
const { User } = require("../../models/User");

// Start or Fetch a Chat between a Buyer and Seller for a Product
const startOrFetchChat = async (req, res) => {
    try {
        const { productId, buyerId } = req.body;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Check if the buyer is valid
        const buyer = await User.findById(buyerId);
        if (!buyer) {
            return res.status(404).json({
                success: false,
                message: "Buyer not found",
            });
        }

        // Get sellerId from product (assuming the seller is stored in product schema)
        const sellerId = product.sellerId;

        // Generate a unique chatId based on product, seller, and buyer
        const participants = [buyerId, sellerId];
        const sortedParticipants = participants.map(participant => participant.toString()).sort();
        const chatId = `${productId}-${sortedParticipants[0]}-${sortedParticipants[1]}`;

        // Find an existing chat by chatId
        let chat = await Chat.findOne({ chatId });

        // Create a new chat if it doesn't exist
        if (!chat) {
            chat = new Chat({
                product: productId,
                participants: [buyerId, sellerId],
                chatId: chatId, // Set the generated chatId
            });
            await chat.save();
        }

        res.status(200).json({
            success: true,
            chatId: chat.chatId,
            data: chat,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred while starting or fetching the chat",
        });
    }
};

// Send a Message in an Existing Chat
const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;

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

    // Add the new message to the chat
    chat.messages.push({
      sender: req.user._id,
      text,
    });

    await chat.save();

    res.status(200).json({
      success: true,
      chatId: chat.chatId, // Return chatId with the response
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

// Get All Messages in a Chat
const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Find the chat by chatId and populate the sender's information
    const chat = await Chat.findOne({ chatId })
      .populate('messages.sender', 'userName') // Populate the sender's username in messages
      .populate('participants', 'userName'); // Populate participants' usernames

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      data: chat.messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching the messages",
    });
  }
};

// Get All Chats for a User
const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id; // Get the logged-in user's ID

    // Find all chats where the user is a participant
    const chats = await Chat.find({
      participants: userId,
    })
      .populate('product') // Populate product details
      .populate('participants', 'userName'); // Populate participants' usernames

    if (!chats.length) {
      return res.status(404).json({
        success: false,
        message: "No chats found",
      });
    }

    res.status(200).json({
      success: true,
      data: chats.map(chat => ({ chatId: chat.chatId, ...chat.toObject() })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching the user's chats",
    });
  }
};

module.exports = {
  startOrFetchChat,
  sendMessage,
  getChatMessages,
  getUserChats,
};
