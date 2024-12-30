const express = require('express');
const { getFavorites,removeFromFavorites, addToFavorites } = require('../../controllers/shop/favorite-controller');

const router = express.Router();
router.get('/getFavorite/:userId', getFavorites);

// Route to add product to favorites
router.post('/add', addToFavorites);

// Route to remove product from favorites
router.post('/remove', removeFromFavorites);

module.exports = router;
