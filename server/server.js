require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path'); // Add this line to fix the "path not defined" error
const http = require('http');
const { Server } = require('socket.io');
const socketSetup = require('./socket-server'); // Import the socket server setup

// Import routes
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

// Log MongoDB URI for debugging
console.log('MongoDB URI:', process.env.DATABASE_URL);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins (update this for production)
        methods: ['GET', 'POST'],
    },
});

// Initialize Socket.IO functionality
socketSetup(io);

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173', // Local frontend
    'https://ecommerce-mern-8.onrender.com', // Example frontend URL
    'https://ecommerce-mern-7-rixe.onrender.com', // Example frontend URL
    'https://ecommerce-mern-2-165.onrender.com' // Your live frontend URL
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

// Handle preflight requests
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

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
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

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Root route for testing
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});