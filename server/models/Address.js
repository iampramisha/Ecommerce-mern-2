const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
