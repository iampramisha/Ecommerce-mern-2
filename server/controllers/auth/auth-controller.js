// const bcrypt=require('bcryptjs');
// const jwt=require('jsonwebtoken');
// const { User } = require('../../models/User');
// // const User=require('../../models/User')






// const registerUser=async(req,res)=>{
//     //get from req.body
//     const {userName,email,password}=req.body;
// try{
//     const checkUser=await User.findOne({email});
//     if(checkUser){
//         return res.json({
//             success:false,
//             message:"User Already exists with same the same email"
//         })
//     }
// const hashPassword=await bcrypt.hash(password,12);
// const newUser=new User({
//     userName, email,
//     //passed the hashed pasword
//     password: hashPassword
// })
// //save the new user created
// await newUser.save(); 
// res.status(200).json({
//     success:true,
//     message:"registration successful"
// })
// }catch(e){
// console.log(e);
// res.status(500).json({

//     success:false,
//     message:'some error occured'
// })
// }
// }
//  //login
 
// const loginUser=async(req,res)=>{
//     //get from req.body
//     const {email,password}=req.body 
// try{
//     const checkUser=await User.findOne({email});
//     if(!checkUser){
// return res.json({
//     success:false,
//     message:"User doesnot exists, please register first"
// })

// }
// const checkUserMatch=await bcrypt.compare(password,checkUser.password);
// if(!checkUserMatch){
//     return res.json({
//         success:false,
//         message:"wrong password,please try again"
//     })
// }

// const token=jwt.sign({
 
//     id:checkUser._id,role:checkUser.role,email:checkUser.email,
//     userName:checkUser.userName
// },'CLIENT_SECRET_KEY',{expiresIn:'6 days'})
// res.cookie('token',token,{httpOnly:true,secure:false}).json({
//     success: true,
//     message:"logged in successfully",
//     user:({
    
//         email:checkUser.email,
//         role:checkUser.role,
//         id:checkUser._id,
//         userName:checkUser.userName,
//     })
// })
// } catch (e) {
//     console.error('Error in loginUser:', e); // Enhanced logging
//     res.status(500).json({
//         success: false,
//         message: 'An error occurred during login'
//     });
// }
// }
// const logout=(req,res)=>{
//     res.clearCookie('token').json({
//         success:true,
//         message:'logged out successfully'
//     })
// }
// //auth middleware
// const authMiddleware=async(req,res,next)=>{
// const token=req.cookies.token;
// if(!token){
//     return res.json({
//         success:false,
//         message:"unauthorized user"
//     })}
//     try{
//         const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
//         req.user=decoded;
//         //decoded contains payload
//         next();
//     }catch(err){
// res.status(401).json({
//     success:false,
//     message:'unauthorised user!'
// })
//     }
// }

// module.exports={registerUser,loginUser,logout,authMiddleware};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/User');

// Register a new user
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: "User already exists with the same email"
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, 
            email,
            password: hashPassword // Save the hashed password
        });

        // Save the new user
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successful"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: "User does not exist, please register first"
            });
        }

        const checkUserMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkUserMatch) {
            return res.json({
                success: false,
                message: "Wrong password, please try again"
            });
        }

        // Generate JWT token
        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        }, 'CLIENT_SECRET_KEY', { expiresIn: '6 days' });

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true, secure: false }) // Change secure to true in production
            .json({
                success: true,
                message: "Logged in successfully",
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                    userName: checkUser.userName
                }
            });
    } catch (e) {
        console.error('Error in loginUser:', e);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login'
        });
    }
};

// Logout user
// Logout user
const logout = (req, res) => {
    console.log("Cookies before clearing:", req.cookies); // Debugging log

    res.clearCookie("token", {
        path: '/', // Ensure the path matches
        httpOnly: true, // Match the httpOnly setting
        secure: false // Change to true if using HTTPS in production
    });

    console.log("Cookies after clearing:", req.cookies); // Debugging log

    return res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user"
        });
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded; // Attach the decoded token to the request
        next(); // Proceed to the next middleware
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user!'
        });
    }
};

// Export the functions
module.exports = {
    registerUser,
    loginUser,
    logout,
    authMiddleware
};
