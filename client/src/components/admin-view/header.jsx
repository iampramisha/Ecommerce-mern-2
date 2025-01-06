// import { useState } from 'react';
// import { LogOut, Menu, MessageCircle } from 'lucide-react'; // Assuming you're using this icon
// import { Button } from '../ui/button';
// import { useDispatch, useSelector } from 'react-redux';


// import { fetchChatsForSeller } from '@/store/admin/chat-slice';
// import { useNavigate } from 'react-router-dom';

// export default function AdminHeader({ setOpen }) {
//     const [unreadMessages, setUnreadMessages] = useState(0);
//     const dispatch = useDispatch();
//     const navigate=useNavigate();
//     const {user}=useSelector((state)=>state.auth);
//     const userId=user?.id;
//     const handleLogout = async () => {
//       await dispatch(logoutUser()); // Log the user out
//       dispatch(resetOrders()); // Reset any relevant orders
//       navigate('/auth/login'); // Redirect to login after logout
//     };
  

//     const handleChatClick = () => {
//         const sellerId = userId; // You will get this from session or context
//         dispatch(fetchChatsForSeller(sellerId)); // Dispatch action to fetch chats
//     };

//     return (
//         <header className='flex items-center justify-between px-4 py-3 bg-gray-100 border-bottom'>
//             <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
//                 <Menu />
//                 <span className='sr-only'>Toggle Menu</span>
//             </Button>

//             {/* Notification Badge */}
//             <div className='flex flex-row items-center justify-end'>
//                 <Button
//                     onClick={handleChatClick} // Fetch chats when the chat icon is clicked
//                     className="relative p-2 bg-red-500 hover:bg-gray-100 rounded-full"
//                 >
//                     <MessageCircle className="w-6 h-6" />
//                     {unreadMessages > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
//                             {unreadMessages}
//                         </span>
//                     )}
//                 </Button>
//             </div>

//             {/* Logout Button */}
//             <div className='flex flex-1 justify-end'>
//                 <Button
//                     onClick={handleLogout} // Call the logout function here
//                     className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
//                 >
//                     <LogOut />
//                     Logout
//                 </Button>
//             </div>
//         </header>
//     );
// }
import { useState } from 'react';
import { LogOut, Menu, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatsForSeller } from '@/store/admin/chat-slice';
import { useNavigate } from 'react-router-dom';

import ChatPanel from './ChatPanel'; // Import the ChatPanel component
import { logoutUser } from '@/store/auth-slice';

export default function AdminHeader({ setOpen }) {
    const [isChatPanelOpen, setIsChatPanelOpen] = useState(false); // State to control chat panel visibility
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const userId = user?.id;

    // Access the chats and loading state from Redux store
    const { chats, loading } = useSelector((state) => state.chats); 
console.log("chatss",chats)
    const handleLogout = async () => {
        await dispatch(logoutUser());
        dispatch(resetOrders());
        navigate('/auth/login');
    };

    const handleChatClick = () => {
        const sellerId = userId; // Get this from session or context
        dispatch(fetchChatsForSeller(sellerId)); // Fetch chats
        setIsChatPanelOpen(true); // Open the chat panel
    };

    return (
        <header className='flex items-center justify-between px-4 py-3 bg-gray-100 border-bottom'>
            <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
                <Menu />
                <span className='sr-only'>Toggle Menu</span>
            </Button>

            {/* Notification Badge */}
            <div className='flex flex-row items-center justify-end'>
                <Button
                    onClick={handleChatClick} // Fetch chats when the chat icon is clicked
                    className="relative p-2 bg-red-500 hover:bg-gray-100 rounded-full"
                >
                    <MessageCircle className="w-6 h-6" />
                    {chats.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                            {chats.length} {/* You can show the number of chats */}
                        </span>
                    )}
                </Button>
            </div>

            {/* Logout Button */}
            <div className='flex flex-1 justify-end'>
                <Button
                    onClick={handleLogout} // Call the logout function here
                    className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
                >
                    <LogOut />
                    Logout
                </Button>
            </div>

            {/* Chat Panel */}
            <ChatPanel
                isOpen={isChatPanelOpen} // Pass the state to control visibility
                onClose={() => setIsChatPanelOpen(false)} // Close the panel when clicked
                chats={chats} // Pass the chats as props to the ChatPanel
                loading={loading} // Pass loading state to handle loading UI in ChatPanel
            />
        </header>
    );
}
