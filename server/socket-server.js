// socket-server.js
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinRoom', (productId) => {
            socket.join(productId);
            console.log(`User joined room: ${productId}`);
        });

        socket.on('sendMessage', (messageData) => {
            const { productId, text, sender } = messageData;

            // Broadcast the message to others in the room
            io.to(productId).emit('message', { text, sender });
        });

        socket.on('leaveRoom', (productId) => {
            socket.leave(productId);
            console.log(`User left room: ${productId}`);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};
