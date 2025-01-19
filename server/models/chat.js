const mongoose = require('mongoose');
const crypto = require('crypto');

// Message Schema
const MessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    repliedTo: {
      type: { 
        id: mongoose.Schema.Types.ObjectId, 
        text: String 
      },
      default: null
    },
    createdAt: { type: Date, default: Date.now },
  });
  
// Chat Schema
const ChatSchema = new mongoose.Schema(
  {
    chatId: { type: String, unique: true, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [MessageSchema],
  },
  { timestamps: true }
);

// Generate chatId based on participants and product
ChatSchema.pre('save', function (next) {
  if (this.isNew) {
    const sortedParticipants = this.participants.map((p) => p.toString()).sort();
    const hash = crypto.createHash('sha256');
    hash.update(`${this.product.toString()}-${sortedParticipants.join('-')}`);
    this.chatId = hash.digest('hex').substring(0, 24);
  }
  next();
});

// Models
const Chat = mongoose.model('Chat', ChatSchema);
const Message = mongoose.model('Message', MessageSchema);

module.exports = { Chat, Message };
