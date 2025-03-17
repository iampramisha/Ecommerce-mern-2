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
        const sortedChats = [...chats].sort((a, b) => {
            const aTimestamp = new Date(a.updatedAt);
            const bTimestamp = new Date(b.updatedAt);
            return bTimestamp - aTimestamp; // Sort in descending order (newest first)
        });
        return sortedChats;
    };

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
            return {
                time: messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: null, // No date needed for today
            };
        }

        // Check if the message is from yesterday
        if (
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear()
        ) {
            return {
                time: messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: 'Yesterday',
            };
        }

        // Check if the message is from the same week
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
        if (messageDate >= startOfWeek) {
            return {
                time: messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: messageDate.toLocaleDateString([], { weekday: 'long' }),
            };
        }

        // Otherwise, display the full date (month, date, year) and time
        return {
            time: messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: messageDate.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' }),
        };
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
                    sortedChats.map((chat) => {
                        const { time, date } = formatTimestamp(chat.updatedAt); // Destructure time and date
                        return (
                            <div
                                key={chat.chatId} // Use chatId as key
                                className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer gap-4"
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
                                <div className="flex flex-col items-end gap-1 w-20"> {/* Fixed width for alignment */}
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
                                <div className="text-xs text-gray-400 w-24 flex flex-col items-end"> {/* Fixed width for alignment */}
                                    <span>{time}</span>
                                    {date && <span>{date}</span>} {/* Display date only if it exists */}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-4 text-center text-gray-500">No chats available.</div>
                )}
            </div>
        </motion.div>
    );
};

export default ChatPanel;