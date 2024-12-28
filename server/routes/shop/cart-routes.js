const express=require("express");
const { fetchCartItems, removeFromCart, updateCartItemQty, addToCart } = require("../../controllers/shop/cart-controller");
const router=express.Router();
router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart/:userId/:productId", updateCartItemQty);
router.delete("/:userId/:productId", removeFromCart);
module.exports=router;