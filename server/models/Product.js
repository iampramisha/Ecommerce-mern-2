// models/Product.js
const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String, // URL of the image stored on Cloudinary
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    default: null,
  },
  totalStock: {
    type: Number,
    required: true,
  },
  weight: { // Add the weight field
    type: Number,
    required: true, // You can adjust this based on whether weight is mandatory
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports= {Product};
