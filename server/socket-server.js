// socketServer.js or server.js

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Handle joining the room based on productId (could be used for product-specific chats)
        socket.on('joinRoom', (productId) => {
            if (!productId) {
                return socket.emit('error', { message: 'Invalid room ID.' });
            }
            socket.join(productId);
            console.log(`User joined room: ${productId}`);
            socket.emit('roomJoined', { roomId: productId });
        });

        // Send a message to a specific product chat
        socket.on('sendMessage', async (messageData) => {
            const { productId, text, sender, receiverId, timestamp } = messageData;

            if (!productId || !text || !sender || !receiverId || !timestamp) {
                return socket.emit('error', { message: 'Invalid message data.' });
            }

            try {
                // Save the message to your Chat model
                const newMessage = new Chat({ productId, sender, receiverId, text, timestamp });
                await newMessage.save();

                // Emit the message to the product-specific room (for real-time updates)
                io.to(productId).emit('message', { text, sender, timestamp });

                // Notify the receiver (seller) directly through WebSocket
                sendMessageToUser(io, receiverId, { text, sender, timestamp });

            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Handle when a user disconnects
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

// Utility function for sending WebSocket notifications to users (seller)
function sendMessageToUser(io, userId, messageData) {
    // Check if user is connected
    const socket = io.sockets.connected[userId];
    if (socket) {
        socket.emit('notification', { message: `New message from ${messageData.sender}`, data: messageData });
    } else {
        console.log('User is not connected, handle via other methods');
    }
}
