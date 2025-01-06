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

    // Group chats by participant[0]._id and keep the latest chat for each participant
    const groupChatsByParticipant = (chats) => {
        const grouped = {};

        chats.forEach((chat) => {
            const participantId = chat.participants[0]._id;
            const participantName = chat.participants[0].userName;
            // If participant doesn't exist in grouped or the chat is newer, update it
            if (
                !grouped[participantId] ||
                new Date(chat.updatedAt) > new Date(grouped[participantId].updatedAt)
            ) {
                grouped[participantId] = {
                    chatId: chat.chatId,
                    userName: participantName,
                    latestMessage: chat.messages[chat.messages.length - 1]?.text || 'No messages',
                    updatedAt: chat.updatedAt,
                };
            }
        });

        
        return Object.values(grouped); // Return array of grouped chats
    };

    // Get grouped chats
    const groupedChats = groupChatsByParticipant(chats);
    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
    
        // Check if the date is today
        if (
            messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear()
        ) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    
        // Check if the date is yesterday
        if (
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear()
        ) {
            return `Yesterday, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
    
        // Otherwise, return the day of the week and time
        return `${messageDate.toLocaleDateString([], { weekday: 'long' })}, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };
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
                ) : groupedChats.length > 0 ? (
                    groupedChats.map((chat) => (
                        <div
                            key={chat.chatId} // Use chatId as key
                            className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer gap-2"
                            onClick={() => handleChatSelect(chat.chatId)} // Open chat when clicked
                        >
                            <div className="flex-1">
                                {/* Display the participant's name and their most recent message */}
                                <div className="font-semibold">{chat.userName}</div>
                                <div className="text-sm text-gray-500">{chat.latestMessage}</div>
                            </div>
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
