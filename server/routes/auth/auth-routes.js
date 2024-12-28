//by which route to call which conroller
const express=require('express')
const { registerUser,loginUser,logout,authMiddleware }=require('../../controllers/auth/auth-controller.js')
const router=express.Router();
//whenever from fronted we call this route, call registerUser controller 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',logout)
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        message:"Authenticated user",
        user:user,
    })
})
module.exports=router;