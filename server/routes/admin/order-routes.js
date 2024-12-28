const express=require("express");
const { getAllOrdersOfAllUsers,getOrderById,updateOrderStatus } = require("../../controllers/admin/order-controller");

const router=express.Router();


router.get("/get", getAllOrdersOfAllUsers);


router.get("/:orderId", getOrderById);
router.put('/:orderId', updateOrderStatus);

module.exports=router;