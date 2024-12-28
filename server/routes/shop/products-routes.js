const express=require("express")
const { getFilteredProducts,getProductDetails, getAllProducts } = require("../../controllers/shop/products-controller")
const router=express.Router();
router.get("/get", getFilteredProducts);
router.get("/", getAllProducts);
router.get("/get/:id", getProductDetails);
module.exports=router;