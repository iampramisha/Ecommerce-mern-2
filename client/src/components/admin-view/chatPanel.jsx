// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { X } from 'lucide-react'; // Close icon
// import { Button } from '../ui/button';

// import { motion } from 'framer-motion'; // For smooth animations
// import { setCurrentChat } from '@/store/admin/chat-slice';

// const ChatPanel = ({ isOpen, onClose }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const chats = useSelector((state) => state.chat.chats); // Fetch chats from Redux store

//     console.log('Chats from Redux state:', chats); // Log chats to console

//     const handleChatSelect = (chatId) => {
//         console.log('Selected Chat ID:', chatId); // Log chat ID when selected
//         dispatch(setCurrentChat(chatId)); // Set current chat
//         navigate(`/admin/chat/${chatId}`); // Navigate to the chat box
//         onClose(); // Close the chat panel
//     };

//     return (
//         <motion.div
//             className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50"
//             initial={{ x: '100%' }}
//             animate={{ x: isOpen ? '0%' : '100%' }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         >
//             <div className="flex justify-between items-center p-4 bg-gray-200">
//                 <span className="font-semibold text-lg">Chats</span>
//                 <Button onClick={onClose} className="p-2">
//                     <X />
//                 </Button>
//             </div>

//             <div className="overflow-y-auto">
//                 {chats.length > 0 ? (
//                     chats.map((chat) => (
//                         <div
//                             key={chat.id}
//                             className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
//                             onClick={() => handleChatSelect(chat.id)} // Open chat when clicked
//                         >
//                             <div className="flex-1">
//                                 <div className="font-semibold">{chat.user.name}</div>
//                                 <div className="text-sm text-gray-500">{chat.lastMessage}</div>
//                             </div>
//                             <div className="text-xs text-gray-400">{chat.timestamp}</div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="p-4 text-center text-gray-500">No chats available.</div>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// export default ChatPanel;

// import { motion } from 'framer-motion'; // For smooth animations
// import { Button } from '../ui/button';
// import { X } from 'lucide-react'; // Close icon
// import { useDispatch } from 'react-redux';
// import { setCurrentChat } from '@/store/admin/chat-slice';
// import { useNavigate } from 'react-router-dom';

// const ChatPanel = ({ isOpen, onClose, chats, loading }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Handle chat selection
//     const handleChatSelect = (chatId) => {
//         dispatch(setCurrentChat(chatId)); // Set current chat
//         navigate(`/admin/chat/${chatId}`); // Navigate to the chat box
//         onClose(); // Close the chat panel
//     };

//     // Sort chats by the most recent message timestamp
//     const sortChatsByRecentMessage = (chats) => {
//         return chats.sort((a, b) => {
//             const aTimestamp = new Date(a.updatedAt);
//             const bTimestamp = new Date(b.updatedAt);
//             return bTimestamp - aTimestamp; // Sort in descending order (newest first)
//         });
//     };

//     // Format timestamp for display
//     const formatTimestamp = (timestamp) => {
//         const messageDate = new Date(timestamp);
//         const today = new Date();
//         const yesterday = new Date();
//         yesterday.setDate(today.getDate() - 1);

//         // Check if the date is today
//         if (
//             messageDate.getDate() === today.getDate() &&
//             messageDate.getMonth() === today.getMonth() &&
//             messageDate.getFullYear() === today.getFullYear()
//         ) {
//             return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         }

//         // Check if the date is yesterday
//         if (
//             messageDate.getDate() === yesterday.getDate() &&
//             messageDate.getMonth() === yesterday.getMonth() &&
//             messageDate.getFullYear() === yesterday.getFullYear()
//         ) {
//             return `Yesterday, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//         }

//         // Otherwise, return the day of the week and time
//         return `${messageDate.toLocaleDateString([], { weekday: 'long' })}, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//     };

//     // Sort chats by most recent message
//     const sortedChats = sortChatsByRecentMessage(chats);

//     return (
//         <motion.div
//             className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
//             initial={{ x: '100%' }}
//             animate={{ x: isOpen ? '0%' : '100%' }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         >
//             <div className="flex justify-between items-center p-4 bg-gray-200">
//                 <span className="font-semibold text-lg">Chats</span>
//                 <Button onClick={onClose} className="p-2">
//                     <X />
//                 </Button>
//             </div>

//             <div className="overflow-y-auto">
//                 {loading ? (
//                     <div className="p-4 text-center text-gray-500">Loading chats...</div>
//                 ) : sortedChats.length > 0 ? (
//                     sortedChats.map((chat) => (
//                         <div
//                             key={chat.chatId} // Use chatId as key
//                             className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer gap-2"
//                             onClick={() => handleChatSelect(chat.chatId)} // Open chat when clicked
//                         >
//                             <div className="flex-1">
//                                 {/* Display the participant's name and their most recent message */}
//                                 <div className="font-semibold">{chat.participants[0].userName}</div>
//                                 <div className="text-sm text-gray-500">
//                                     {chat.messages[chat.messages.length - 1]?.text || 'No messages'}
//                                 </div>
//                             </div>
//                             <div className="text-xs text-gray-400">
//                                 {formatTimestamp(chat.updatedAt)}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="p-4 text-center text-gray-500">No chats available.</div>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// export default ChatPanel;

import { motion } from 'framer-motion'; // For smooth animations
import { Button } from '../ui/button';
import { X } from 'lucide-react'; // Close icon
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '@/store/admin/chat-slice';
import { useNavigate } from 'react-router-dom';

const ChatPanel = ({ isOpen, onClose, chats, loading }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle chat selection
    const handleChatSelect = (chatId) => {
        dispatch(setCurrentChat(chatId)); // Set current chat
        navigate(`/admin/chat/${chatId}`); // Navigate to the chat box
        onClose(); // Close the chat panel
    };

    // Sort chats by the most recent message timestamp
    const sortChatsByRecentMessage = (chats) => {
        // Create a copy of the chats array to avoid mutating the original array
        const sortedChats = [...chats].sort((a, b) => {
            const aTimestamp = new Date(a.updatedAt);
            const bTimestamp = new Date(b.updatedAt);
            return bTimestamp - aTimestamp; // Sort in descending order (newest first)
        });
        return sortedChats;
    };
    console.log("Products in chats:", chats.map((chat) => chat.product));
   // Format timestamp for display
    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Check if the message is from today
        if (
            messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear()
        ) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Check if the message is from yesterday
        if (
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear()
        ) {
            return `Yesterday, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // Check if the message is from the same week
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
        if (messageDate >= startOfWeek) {
            return `${messageDate.toLocaleDateString([], { weekday: 'long' })}, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // Otherwise, display the full date (month, date, year) and time
        return `${messageDate.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    // Sort chats by most recent message
    const sortedChats = sortChatsByRecentMessage(chats);

    return (
        <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: isOpen ? '0%' : '100%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="flex justify-between items-center p-4 bg-gray-200">
                <span className="font-semibold text-lg">Chats</span>
                <Button onClick={onClose} className="p-2">
                    <X />
                </Button>
            </div>

            <div className="overflow-y-auto">
                {loading ? (
                    <div className="p-4 text-center text-gray-500">Loading chats...</div>
                ) : sortedChats.length > 0 ? (
                    sortedChats.map((chat) => (
                        
                        <div
                            key={chat.chatId} // Use chatId as key
                            className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer gap-2"
                            onClick={() => handleChatSelect(chat.chatId)} // Open chat when clicked
                        >
                            {/* Left Side: User Name and Latest Message */}
                            <div className="flex-1">
                                <div className="font-semibold">{chat.participants[0].userName}</div>
                                <div className="text-sm text-gray-500">
                                    {chat.messages[chat.messages.length - 1]?.text || 'No messages'}
                                </div>
                            </div>

                            {/* Right Side: Product Image and Title */}
                            <div className="flex flex-col items-end gap-1">
                                <img
                                    src={chat.product.image} // Product image URL
                                    alt={chat.product.title}
                                    className="w-10 h-10 rounded-md object-cover"
                                />
                                <div className="text-xs text-gray-600 text-right">
                                    {chat.product.title}
                                </div>
                          </div>

                            {/* Timestamp */}
                            <div className="text-xs text-gray-400">
                                {formatTimestamp(chat.updatedAt)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">No chats available.</div>
                )}
            </div>
        </motion.div>
    );
};

export default ChatPanel;