// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getChatMessages } from "@/store/shop/chat-slice";
// import { User, Reply } from "lucide-react";
// import salesBanner from "@/assets/salesBanner.jpg";
// import { sendSellerMessage } from "@/store/admin/chat-slice";

// const SellerChatBox = () => {
//   const dispatch = useDispatch();
//   const { currentMessages, status } = useSelector((state) => state.chat);
//   const { user } = useSelector((state) => state.auth);
//   const [newMessage, setNewMessage] = useState("");
//   const [replyToMessage, setReplyToMessage] = useState(null);

//   const { chatId } = useParams();
//   const sellerId = user?.id;
//   const sellerRole = user?.role;

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (chatId) {
//       dispatch(getChatMessages(chatId));
//     }
//   }, [dispatch, chatId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentMessages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() && sellerId) {
//       const replyMessageId = replyToMessage ? replyToMessage._id : null;
//       dispatch(
//         sendSellerMessage({ chatId, sellerId, text: newMessage, replyToMessageId: replyMessageId })
//       ).then(() => {
//         setNewMessage("");
//         setReplyToMessage(null);
//         dispatch(getChatMessages(chatId));
//       });
//     }
//   };

//   const handleReplyClick = (message) => {
//     setReplyToMessage(message);
//   };

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
//       <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
//         <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
//           <div className="bg-gray-100 p-2 rounded-full">
//             <User className="h-6 w-8" />
//           </div>
//           <span className="flex items-center">{user?.userName || "Seller"}</span>
//         </div>

//         <div className="flex-1 p-4 overflow-y-auto space-y-4">
//           {currentMessages?.length > 0 ? (
//             currentMessages.map((msg, index) => {
//               const isSender = msg.sender?._id === sellerId;
//               const messageClass = isSender
//                 ? "ml-auto bg-blue-800 text-white"
//                 : "bg-gray-200 text-black";

//               return (
//                 <div
//                   key={index}
//                   className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`inline-block max-w-[50%] rounded-lg break-words leading-6 ${messageClass} px-3 py-2`}
//                     style={{ width: "fit-content" }}
//                   >
//                     {/* Display the replied-to message if exists */}
//                     {msg.replyToMessage && (
//                       <p className="mb-2 bg-gray-100 p-2 rounded text-sm text-gray-600">
//                         Replied to: {msg.replyToMessage.text}
//                       </p>
//                     )}

//                     <p>{msg.text}</p>

//                     {!isSender && (
//                       <button
//                         onClick={() => handleReplyClick(msg)}
//                         className="ml-2 text-blue-500 hover:text-blue-700"
//                       >
//                         <Reply className="h-5 w-5" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center text-gray-500">
//               <p>No messages yet. Start a conversation!</p>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {sellerRole === "admin" && (
//           <div className="flex items-center mt-4 space-x-2">
//             {replyToMessage && (
//               <div className="mb-2 text-sm text-gray-600">
//                 <p>Replying to: "{replyToMessage.text}"</p>
//               </div>
//             )}
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Reply to the buyer..."
//               className="w-full p-3 rounded-md border border-gray-300 text-sm"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Send
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
//         <img
//           src={salesBanner}
//           alt="Sales Banner"
//           className="w-full h-full rounded-xl object-cover"
//           style={{
//             height: "50vh",
//             borderRadius: "40% 60% 30% 50%",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SellerChatBox;
// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getChatMessages } from "@/store/shop/chat-slice";
// import { User, Reply } from "lucide-react";
// import salesBanner from "@/assets/salesBanner.jpg";
// import { sendSellerMessage } from "@/store/admin/chat-slice";

// const SellerChatBox = () => {
//   const dispatch = useDispatch();
//   const { currentMessages, status } = useSelector((state) => state.chat);
//   const { user } = useSelector((state) => state.auth);
//   const [newMessage, setNewMessage] = useState("");
//   const [replyToMessage, setReplyToMessage] = useState(null);

//   const { chatId } = useParams();
//   const sellerId = user?.id;
//   const sellerRole = user?.role;

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (chatId) {
//       dispatch(getChatMessages(chatId));
//     }
//   }, [dispatch, chatId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentMessages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() && sellerId) {
//       const replyMessageId = replyToMessage ? replyToMessage._id : null;
//       dispatch(
//         sendSellerMessage({
//           chatId,
//           sellerId,
//           text: newMessage,
//           replyToMessageId: replyMessageId, // Include this only if replying
//         })
//       ).then(() => {
//         setNewMessage("");
//         setReplyToMessage(null);
//         dispatch(getChatMessages(chatId)); // Refetch messages
//       });
//     }
//   };
  

//   const handleReplyClick = (message) => {
//     setReplyToMessage(message);
//   };

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
//       <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
//         <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
//           <div className="bg-gray-100 p-2 rounded-full">
//             <User className="h-6 w-8" />
//           </div>
//           <span className="flex items-center">{user?.userName || "Seller"}</span>
//         </div>

//         <div className="flex-1 p-4 overflow-y-auto space-y-4">
//           {currentMessages?.length > 0 ? (
//             currentMessages.map((msg, index) => {
//               const isSender = msg.sender?._id === sellerId;
//               const messageClass = isSender
//                 ? "ml-auto bg-blue-800 text-white"
//                 : "bg-gray-200 text-black";

//               return (
//                 <div
//                   key={index}
//                   className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`inline-block max-w-[50%] rounded-lg break-words leading-6 ${messageClass} px-3 py-2 flex flex-col`}
//                     style={{ width: "fit-content" }}
//                   >
//                     {/* Display the replied-to message if exists */}
//                     {msg.replyToMessage && (
//                       <p className="mb-2 bg-gray-100 p-2 rounded text-sm text-gray-600">
//                          {msg.replyToMessage.text}
//                       </p>
//                     )}

//                     <p>{msg.text}</p>

//                     {!isSender && (
//                       <button
//                         onClick={() => handleReplyClick(msg)}
//                         className="ml-2 text-blue-500 hover:text-blue-700"
//                       >
//                         <Reply className="h-5 w-5" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center text-gray-500">
//               <p>No messages yet. Start a conversation!</p>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

      
//           <div className="flex items-center mt-4 space-x-2">
         
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Reply to the buyer..."
//               className="w-full p-3 rounded-md border border-gray-300 text-sm"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Send
//             </button>
//           </div>
      
//       </div>

//       <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
//         <img
//           src={salesBanner}
//           alt="Sales Banner"
//           className="w-full h-full rounded-xl object-cover"
//           style={{
//             height: "50vh",
//             borderRadius: "40% 60% 30% 50%",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SellerChatBox;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { getChatMessages, sendMessage } from '@/store/shop/chat-slice';
import salesBanner from '@/assets/salesBanner.jpg';
import { User } from 'lucide-react';
import { fetchProductDetails } from '@/store/shop/products-slice';


const ChatBox = () => {
  const dispatch = useDispatch();
  const { currentMessages, status, error } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth); // Get the user from state.auth
  const [newMessage, setNewMessage] = useState('');
  const [adminName, setAdminName] = useState(null);

  // Extract chatId and productId from URL params using useParams
  const { chatId, productId } = useParams(); 

  // Ensure userId is available from the logged-in user
  const userId = user?.id;
  const userRole = user?.role; // Get the user's role (admin or user)
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId)) // Fetch product details by productId
        .then((response) => {
          // Store the fetched product details in state
          setAdminName(response.payload?.data?.adminName);
          // Log the product details to inspect the structure
          console.log("Fetched Product Details:", response.payload);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [dispatch, productId]);
  // Fetch messages for the selected chat on component mount or chatId change
  useEffect(() => {
    if (chatId) {
      dispatch(getChatMessages(chatId)); // Fetch messages for the selected chat
    }
  }, [dispatch, chatId]); // Dependency only on chatId, re-run when chatId changes

  // Get the recipient's username (from the first message or chat data)
  // const recipient = currentMessages?.length > 0 ? currentMessages[0].sender?.userName : ' ';

  const handleSendMessage = () => {
    if (newMessage.trim() && userId) {
      // Optimistically update the UI with the new message
      const newChatMessage = {
        text: newMessage,
        userId,
        sender: { _id: userId, userName: user?.userName },
        timestamp: new Date().toISOString(),
      };

      // Dispatch sendMessage action
      dispatch(sendMessage({ userId, chatId, text: newMessage, productId }))
        .then(() => {
          // After the message is successfully sent, fetch the updated messages
          dispatch(getChatMessages(chatId));
          setNewMessage('');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
      {/* Chat Box */}
      <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
        {/* Display recipient's username at the top */}
        <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
    {/* Avatar with rounded background */}
    <div className="bg-gray-100 p-2 rounded-full">
      <User  className='h-6 w -8'/>
    </div>
    
    {/* Recipient's name aligned with avatar */}
    <span className="flex items-center">{adminName}</span>
  </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {currentMessages?.length > 0 ? (
            currentMessages.map((msg, index) => {
              const isSender = msg.sender?._id === userId;
              const messageClass = isSender ? 'ml-auto bg-blue-800 text-white' : 'bg-gray-200 text-black';

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[50%] break-words leading-6 ${messageClass}`}
                >
                  <p>{msg.text}</p>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500">
              <p>No messages yet. Start a conversation!</p>
            </div>
          )}
        </div>

        {/* Input Section (Conditionally rendered based on role) */}
        <div className="flex items-center mt-4 space-x-2">
          {userRole === 'user' && ( // Only allow the user (buyer) to send messages
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type any query you have to the seller/admin.."
              className="w-full p-3 rounded-md border border-gray-300 text-sm"
            />
          )}
          {userRole === 'user' && (
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          )}
        </div>

        {/* Admin's Reply Box (Only visible to the admin) */}
        {userRole === 'admin' && (
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Reply to the buyer..."
              className="w-full p-3 rounded-md border border-gray-300 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Reply
            </button>
          </div>
        )}
      </div>

      {/* Sales Banner (Visible on large screens and hidden on medium) */}
      <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
        <img
          src={salesBanner}
          alt="Sales Banner"
          className="w-full h-full rounded-xl object-cover"
          style={{
            height: '50vh',
            borderRadius: '40% 60% 30% 50%', // Top-left, top-right, bottom-right, bottom-left
          }}
        />
      </div>

    </div>
  );
};

export default ChatBox;