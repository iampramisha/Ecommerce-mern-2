// require('dotenv').config();

// const express=require('express')
// const mongoose=require('mongoose');
// const cookieParser=require('cookie-parser');
// const cors=require('cors');

// const authRouter=require('./routes/auth/auth-routes')
// const adminProductsRouter=require('./routes/admin/products-route')
// const shopProductsRouter =require('./routes/shop/products-routes')
// const CartRouter =require('./routes/shop/cart-routes')
// const AddressRouter =require('./routes/shop/address-routes')
// const OrderRouter =require('./routes/shop/order-routes');
// const AllOrderRouter =require('./routes/admin/order-routes')
// const directionsRouter = require('./routes/directions'); // Import the directions router
// const favoriteRouter= require('./routes/shop/favorite-routes'); // Import the directions router
// const chatRouter= require('./routes/shop/chat-routes'); 
// console.log('MongoDB URI:', process.env.DATABASE_URL);
// mongoose.connect(process.env.DATABASE_URL)
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Failed to connect to MongoDB', err));

// // mongoose.connect(process.env.DATABASE_URL)
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch((err) => console.error('Failed to connect to MongoDB', err));
// const app=express();
// const PORT=process.env.PORT ||5000;

// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://ecommerce-mern-8.onrender.com',
//     'https://ecommerce-mern-7-rixe.onrender.com'
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         // Allow requests with no origin (like server-side or mobile apps) or if origin is in allowedOrigins
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],  // Include OPTIONS method
//     allowedHeaders: [
//         "Content-Type",
//         'Authorization',
//         'Cache-control',
//         'Expires',
//         'Pragma'
//     ],
//     credentials: true // Allow credentials (cookies) to be sent
// }));

// // Handle preflight requests manually
// app.options('*', cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
//     allowedHeaders: [
//         "Content-Type",
//         'Authorization',
//         'Cache-control',
//         'Expires',
//         'Pragma'
//     ],
//     credentials: true
// }));

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //whenever w e got to /api/auth call authRouter
// //and wheenevr we go to authRouter  and / register call registerUser

// app.use('/api/auth', authRouter)
// app.use('/api/admin/products', adminProductsRouter)
// app.use('/api/shop/products',shopProductsRouter)
// app.use('/api/shop/carts',CartRouter)
// app.use('/api/shop/address',AddressRouter)
// app.use('/api/shop/order',OrderRouter)
// app.use('/api/admin/orders',AllOrderRouter)
// app.use('/api/directions', directionsRouter); 
// app.use('/api/favorites', favoriteRouter); 
// app.use('/api/chats',chatRouter );
// app.listen(PORT,()=>console.log(`server is running on port  ${PORT}`))
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const socketSetup = require('./socket-server'); // Import the socket server setup

const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-route');
const shopProductsRouter = require('./routes/shop/products-routes');
const CartRouter = require('./routes/shop/cart-routes');
const AddressRouter = require('./routes/shop/address-routes');
const OrderRouter = require('./routes/shop/order-routes');
const AllOrderRouter = require('./routes/admin/order-routes');
const directionsRouter = require('./routes/directions');
const favoriteRouter = require('./routes/shop/favorite-routes');
const chatRouter = require('./routes/shop/chat-routes');
const chatRoutes = require('./routes/admin/chat-route'); // Import the chat routes

console.log('MongoDB URI:', process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Set up the HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Initialize Socket.IO functionality
socketSetup(io);

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://ecommerce-mern-8.onrender.com',
    'https://ecommerce-mern-7-rixe.onrender.com',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-control',
        'Expires',
        'Pragma',
    ],
    credentials: true,
}));

app.options('*', cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-control',
        'Expires',
        'Pragma',
    ],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route configurations
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/carts', CartRouter);
app.use('/api/shop/address', AddressRouter);
app.use('/api/shop/order', OrderRouter);
app.use('/api/admin/orders', AllOrderRouter);
app.use('/api/directions', directionsRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/chats', chatRouter);
app.use('/api/chats', chatRoutes);

// Start the server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
