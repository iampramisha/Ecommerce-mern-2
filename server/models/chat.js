const mongoose = require('mongoose');
const crypto = require('crypto');

const ChatSchema = new mongoose.Schema({
    chatId: { type: String, unique: true, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

ChatSchema.pre('save', function (next) {
    if (this.isNew) {
        const sortedParticipants = this.participants.map(p => p.toString()).sort();
        const hash = crypto.createHash('sha256');
        hash.update(`${this.product.toString()}-${sortedParticipants.join('-')}`);
        this.chatId = hash.digest('hex').substring(0, 24);
    }
    next();
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = { Chat };
