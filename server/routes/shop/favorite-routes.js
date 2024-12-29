const express = require('express');
const { addToFavorites, removeFromFavorites } = require('../../controllers/shop/favorite-controller');
const router = express.Router();

// Route to add product to favorites
router.post('/add', addToFavorites);

// Route to remove product from favorites
router.post('/remove', removeFromFavorites);

module.exports = router;
