const express=require("express")
const { getFilteredProducts,getProductDetails, getAllProducts, getProductsSalePriceLessThanPrice } = require("../../controllers/shop/products-controller");
const { addReview, getReviews } = require("../../controllers/shop/review-controller");

const router=express.Router();
router.get("/get", getFilteredProducts);
router.get("/", getAllProducts);

router.get("/get/:id", getProductDetails);
router.post('/:productId/reviews', addReview);
router.get('/:productId/getreviews', getReviews);
router.get("/salePriceLessThanPrice", getProductsSalePriceLessThanPrice);

module.exports=router;