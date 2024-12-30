const { Product } = require("../../models/Product");
const { User } = require("../../models/User");
const getFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ favorites: user.favorites });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
const addToFavorites = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // // Check if the product is already in favorites
        // if (user.favorites.includes(productId)) {
        //     return res.status(400).json({ message: 'Product is already in favorites' });
        // }

        user.favorites.push(productId);
        await user.save();

        return res.status(200).json({ message: 'Product added to favorites', favorites: user.favorites });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const removeFromFavorites = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove product from favorites
        user.favorites = user.favorites.filter(id => id.toString() !== productId);
        await user.save();

        return res.status(200).json({ message: 'Product removed from favorites', favorites: user.favorites });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
module.exports={getFavorites,addToFavorites,removeFromFavorites}
