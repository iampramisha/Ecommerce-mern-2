const { Product } = require("../../models/Product");
const { Review } = require("../../models/reviews");

const addReview = async (req, res) => {
  const { productId } = req.params; // Product ID from URL
  const { rating, comment, userId } = req.body; // Review details from the body

  try {
    // Ensure rating and comment are provided
    if (!rating || !comment.trim()) {
      return res.status(400).json({ success: false, message: 'Both rating and comment are required' });
    }

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // // Check if the user has already reviewed the product
    // const existingReview = await Review.findOne({ product: productId, user: userId });
    // if (existingReview) {
    //   return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    // }

    // Create a new review
    const review = new Review({
      product: productId,
      user: userId,
      rating,
      comment,
    });
    await review.save();

    res.status(201).json({ success: true, message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding review', error: error.message });
  }
};
const getReviews = async (req, res) => {
    const { productId } = req.params; // Get Product ID from URL parameters
  
    try {
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Fetch reviews and populate user details (e.g., userName and other relevant fields)
      const reviews = await Review.find({ product: productId })
        .populate('user', 'userName') // Adjust to match your user model field name (e.g., 'userName')
        .sort({ createdAt: -1 }); // Sort reviews by creation date, descending order
  
      // Format response to ensure user details are correctly structured
      const formattedReviews = reviews.map((review) => ({
        _id: review._id,
        product: review.product,
        comment: review.comment,
        rating: review.rating,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        user: {
          _id: review.user?._id || null,
          userName: review.user?.userName || 'Anonymous', // Fallback to 'Anonymous' if userName is missing
        },
      }));
  
      res.status(200).json({ success: true, reviews: formattedReviews });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
    }
  };  
module.exports = { addReview, getReviews };
