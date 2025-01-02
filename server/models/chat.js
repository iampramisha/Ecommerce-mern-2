const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // The product linked to the chat
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Users involved in the chat
    ],
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The sender of the message
            text: { type: String, required: true }, // The message text
            timestamp: { type: Date, default: Date.now }, // When the message was sent
        },
    ],
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = { Chat };
