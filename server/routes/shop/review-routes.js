const express = require('express');
const { addReview, getReviews } = require('../../controllers/shop/review-controller');
const router = express.Router();

router.post('/:productId/reviews', addReview);
router.get('/:productId/reviews', getReviews);

module.exports = router;
