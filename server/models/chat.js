const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Optional, for generating additional unique identifiers

const ChatSchema = new mongoose.Schema({
    chatId: { type: String, unique: true, required: true }, // Unique chatId
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

// Pre-save hook to generate chatId based on product and participants
ChatSchema.pre('save', function (next) {
    if (this.isNew) {
        // Create a unique chatId based on product and participants (buyer & seller)
        const sortedParticipants = this.participants.map(participant => participant.toString()).sort();
        const productId = this.product.toString();
        const chatId = `${productId}-${sortedParticipants[0]}-${sortedParticipants[1]}`;
        this.chatId = chatId; // Set the generated chatId
    }
    next();
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = { Chat };
