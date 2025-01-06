const { Chat } = require("../../models/chat");
const { User } = require("../../models/User");
// Controller to fetch all chats for a seller
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

module.exports = { getChatsForSeller };
