const mongoose=require('mongoose');
const { Product } = require('./Product');
const OrderSchema= new mongoose.Schema({
    userId: String,
    cartId:String,
    cartItems:[
       {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title:String,
        image:String,
        price:String,
        salePrice:String,
quantity:Number
       } 
    ],
    addressInfo:{
        addressid: String,
        address:String,
        city:String,
        pinCode:String,
        notes:String
    },
    totalPrice: String, // Make sure totalPrice is included and saved as a string
    shippingCost: String, 
    orderStatus:String,
    paymentMethod:String,
    paymentStatus:String,
    orderDate:Date,
    orderUpdateDtae: Date,
    paymentId: String,
    payerId: String
});
module.exports=mongoose.model("Order", OrderSchema)