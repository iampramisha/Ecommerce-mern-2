const express=require("express");
const { createOrder, capturePayment ,getOrderById,getOrders} = require("../../controllers/shop/order-controller");
const router=express.Router();

router.post("/createOrder", createOrder);

router.post("/capturePayment", capturePayment);
router.get("/", getOrders);
router.get("/:orderId", getOrderById);

module.exports=router;