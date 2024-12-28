// // models/Cart.js
// const mongoose = require('mongoose');

// // Define Cart Schema
// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User schema
//     required: true,
//   },
//   products: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product', // Reference to the Product schema
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         default: 1,
//       },
//     },
//   ],
// }, { timestamps: true });

// // Create Cart model
// const Cart = mongoose.model('Cart', cartSchema);
// module.exports = { Cart };
const mongoose = require('mongoose');

// Define Cart Schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product schema
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
  
      weight:{
        type: Number
      }
    },
  ],
}, { timestamps: true });

// Create Cart model
const Cart = mongoose.model('Cart', cartSchema);
module.exports = { Cart };
