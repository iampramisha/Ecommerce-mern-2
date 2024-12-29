const mongoose=require('mongoose');
const { Product } = require('./Product');

const UserSchema=new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    
    },
    role:{
        type: String,
     default:'user'
    },
     favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})
//creating model User suing schema
const User=mongoose.model('User',UserSchema);
module.exports= {User};