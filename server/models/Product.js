const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
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
    weight: {
      type: Number,
    },
    adminId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    adminName: {
      type: String, // Added here within the schema fields
      required: true,
    },
  },
  { timestamps: true } // Moved this outside the schema fields
);

// Virtual field to populate reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
