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

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'; 
// import { getChatMessages, sendMessage } from '@/store/shop/chat-slice';
// import salesBanner from '@/assets/salesBanner.jpg';
// import { User } from 'lucide-react';
// import { fetchProductDetails } from '@/store/shop/products-slice';


// const ChatBox = () => {
//   const dispatch = useDispatch();
//   const { currentMessages, status, error } = useSelector((state) => state.chat);
//   const { user } = useSelector((state) => state.auth); // Get the user from state.auth
//   const [newMessage, setNewMessage] = useState('');
//   const [adminName, setAdminName] = useState(null);

//   // Extract chatId and productId from URL params using useParams
//   const { chatId, productId } = useParams(); 

//   // Ensure userId is available from the logged-in user
//   const userId = user?.id;
//   const userRole = user?.role; // Get the user's role (admin or user)
//   useEffect(() => {
//     if (productId) {
//       dispatch(fetchProductDetails(productId)) // Fetch product details by productId
//         .then((response) => {
//           // Store the fetched product details in state
//           setAdminName(response.payload?.data?.adminName);
//           // Log the product details to inspect the structure
//           console.log("Fetched Product Details:", response.payload);
//         })
//         .catch((error) => {
//           console.error("Error fetching product details:", error);
//         });
//     }
//   }, [dispatch, productId]);
//   // Fetch messages for the selected chat on component mount or chatId change
//   useEffect(() => {
//     if (chatId) {
//       dispatch(getChatMessages(chatId)); // Fetch messages for the selected chat
//     }
//   }, [dispatch, chatId]); // Dependency only on chatId, re-run when chatId changes

//   // Get the recipient's username (from the first message or chat data)
//   // const recipient = currentMessages?.length > 0 ? currentMessages[0].sender?.userName : ' ';

//   const handleSendMessage = () => {
//     if (newMessage.trim() && userId) {
//       // Optimistically update the UI with the new message
//       const newChatMessage = {
//         text: newMessage,
//         userId,
//         sender: { _id: userId, userName: user?.userName },
//         timestamp: new Date().toISOString(),
//       };

//       // Dispatch sendMessage action
//       dispatch(sendMessage({ userId, chatId, text: newMessage, productId }))
//         .then(() => {
//           // After the message is successfully sent, fetch the updated messages
//           dispatch(getChatMessages(chatId));
//           setNewMessage('');
//         })
//         .catch((error) => {
//           console.error('Error sending message:', error);
//         });
//     }
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
//       {/* Chat Box */}
//       <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
//         {/* Display recipient's username at the top */}
//         <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
//     {/* Avatar with rounded background */}
//     <div className="bg-gray-100 p-2 rounded-full">
//       <User  className='h-6 w -8'/>
//     </div>
    
//     {/* Recipient's name aligned with avatar */}
//     <span className="flex items-center">{adminName}</span>
//   </div>

//         {/* Messages */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-4">
//           {currentMessages?.length > 0 ? (
//             currentMessages.map((msg, index) => {
//               const isSender = msg.sender?._id === userId;
//               const messageClass = isSender ? 'ml-auto bg-blue-800 text-white' : 'bg-gray-200 text-black';

//               return (
//                 <div
//                   key={index}
//                   className={`p-3 rounded-lg max-w-[50%] break-words leading-6 ${messageClass}`}
//                 >
//                   <p>{msg.text}</p>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center text-gray-500">
//               <p>No messages yet. Start a conversation!</p>
//             </div>
//           )}
//         </div>

//         {/* Input Section (Conditionally rendered based on role) */}
//         <div className="flex items-center mt-4 space-x-2">
//           {userRole === 'user' && ( // Only allow the user (buyer) to send messages
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type any query you have to the seller/admin.."
//               className="w-full p-3 rounded-md border border-gray-300 text-sm"
//             />
//           )}
//           {userRole === 'user' && (
//             <button
//               onClick={handleSendMessage}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Send
//             </button>
//           )}
//         </div>

//         {/* Admin's Reply Box (Only visible to the admin) */}
//         {userRole === 'admin' && (
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
//               Reply
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Sales Banner (Visible on large screens and hidden on medium) */}
//       <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
//         <img
//           src={salesBanner}
//           alt="Sales Banner"
//           className="w-full h-full rounded-xl object-cover"
//           style={{
//             height: '50vh',
//             borderRadius: '40% 60% 30% 50%', // Top-left, top-right, bottom-right, bottom-left
//           }}
//         />
//       </div>

//     </div>
//   );
// };

// export default ChatBox;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getChatMessages, sendMessage } from "@/store/shop/chat-slice";
// import salesBanner from "@/assets/salesBanner.jpg";
// import { User, Copy, CornerDownLeft } from "lucide-react";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// const ChatBox = () => {
//   const dispatch = useDispatch();
//   const { currentMessages, status } = useSelector((state) => state.chat);
//   const { user } = useSelector((state) => state.auth);
//   const { chatId, productId } = useParams();
  
//   const [newMessage, setNewMessage] = useState("");
//   const [adminName, setAdminName] = useState(null);
//   const [showIcons, setShowIcons] = useState(null); // Track clicked message for icons
  
//   const userId = user?.id;
//   const userRole = user?.role;

//   // Fetch product details to get admin name
//   useEffect(() => {
//     if (productId) {
//       dispatch(fetchProductDetails(productId)).then((response) => {
//         setAdminName(response.payload?.data?.adminName);
//       }).catch((error) => console.error("Error fetching product details:", error));
//     }
//   }, [dispatch, productId]);

//   // Fetch chat messages
//   useEffect(() => {
//     if (chatId) {
//       dispatch(getChatMessages(chatId));
//     }
//   }, [dispatch, chatId]);

//   // Toggle reply & copy icons visibility
//   const handleMsgClick = (msgId) => {
//     setShowIcons((prev) => (prev === msgId ? null : msgId));
//   };

//   // Handle message reply
//   const handleReply = (msgId, text) => {
//     setNewMessage(`@${text} `);
//   };

//   // Handle message copy
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   // Handle sending message
//   const handleSendMessage = () => {
//     if (newMessage.trim() && userId) {
//       dispatch(sendMessage({ userId, chatId, text: newMessage, productId }))
//         .then(() => {
//           dispatch(getChatMessages(chatId));
//           setNewMessage("");
//         })
//         .catch((error) => console.error("Error sending message:", error));
//     }
//   };

//   if (status === "loading") return <div>Loading...</div>;

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
//       {/* Chat Box */}
//       <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
//         {/* Chat Header */}
//         <div className="text-xl font-semibold mb-4 flex items-center space-x-3">
//           <div className="bg-gray-100 p-2 rounded-full">
//             <User className="h-6 w-6" />
//           </div>
//           <span className="flex items-center">{adminName}</span>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-4">
//           {currentMessages?.length > 0 ? (
//             currentMessages.map((msg, index) => {
//               const isSender = msg.sender?._id === userId;
//               const messageClass = isSender ? "ml-auto bg-blue-800 text-white" : "bg-gray-200 text-black";

//               return (
//                 <div key={index} className="flex flex-col">
//                   {/* Message */}
//                   <div
//                     className={`p-3 rounded-lg w-fit max-w-[50%] break-words leading-6 cursor-pointer ${messageClass}`}
//                     onClick={() => handleMsgClick(msg._id)}
//                   >
//                     <p>{msg.text}</p>
//                   </div>

//                   {/* Reply & Copy Icons (Appear Below Message When Clicked) */}
//                   {showIcons === msg._id && (
//     <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 flex space-x-2">
//       {/* Reply Icon */}
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger>
//             <button
//               onClick={() => handleReply(msg._id, msg.text)}
//               className={`bg-gray-400 text-white hover:bg-gray-700 p-2 rounded-full`}
//             >
//               <CornerDownLeft className="w-4 h-4" />
//             </button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Reply</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       {/* Copy Icon */}
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger>
//             <button
//               onClick={() => handleCopy(msg.text)}
//               className={`bg-gray-400 text-white hover:bg-gray-700 p-2 rounded-full`}
//             >
//               <Copy className="w-4 h-4" />
//             </button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Copy</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </div>
//   )}
// </div>
                            
//                              );
//                            })
//                          ) : (
//             <div className="text-center text-gray-500">
//               <p>No messages yet. Start a conversation!</p>
//             </div>
//           )}
//         </div>

//         {/* Input Section (User's Message Box) */}
//         {userRole === "user" && (
//           <div className="flex items-center mt-4 space-x-2">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type any query you have for the seller/admin..."
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

//         {/* Admin's Reply Box */}
//         {userRole === "admin" && (
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
//               Reply
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Sales Banner (Visible on Large Screens) */}
//       <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
//         <img
//           src={salesBanner}
//           alt="Sales Banner"
//           className="w-full h-full rounded-xl object-cover"
//           style={{ height: "50vh", borderRadius: "40% 60% 30% 50%" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatBox;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChatMessages, sendMessage } from "@/store/shop/chat-slice";
import salesBanner from "@/assets/salesBanner.jpg";
import { User, Copy, CornerDownLeft, X } from "lucide-react";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { currentMessages, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { chatId, productId } = useParams();
  
  const [newMessage, setNewMessage] = useState("");
  const [adminName, setAdminName] = useState(null);
  const [showIcons, setShowIcons] = useState(null); // Track clicked message for icons
  const [repliedMessage, setRepliedMessage] = useState(null); // Store replied message details
  const [highlightedMsgId, setHighlightedMsgId] = useState(null); // Track the highlighted message
  
  const userId = user?.id;
  const userRole = user?.role;

  // Fetch product details to get admin name
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId)).then((response) => {
        setAdminName(response.payload?.data?.adminName);
      }).catch((error) => console.error("Error fetching product details:", error));
    }
  }, [dispatch, productId]);

  // Fetch chat messages
  useEffect(() => {
    if (chatId) {
      dispatch(getChatMessages(chatId));
    }
  }, [dispatch, chatId]);

  // Toggle reply & copy icons visibility
  const handleMsgClick = (msgId) => {
    setShowIcons((prev) => (prev === msgId ? null : msgId));
  };

  // Handle message reply
  const handleReply = (msgId, text) => {
    setRepliedMessage({ id: msgId, text });
  };

  // Handle cancel reply
  const handleCancelReply = () => {
    setRepliedMessage(null);
  };

  // Handle message copy
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (newMessage.trim() && userId) {
      dispatch(sendMessage({ 
        userId, 
        chatId, 
        text: newMessage, 
        productId, 
        repliedMessage: repliedMessage ? { id: repliedMessage.id, text: repliedMessage.text } : null 
      }))
        .then(() => {
          dispatch(getChatMessages(chatId));
          setNewMessage("");
          setRepliedMessage(null);
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  // Scroll to and highlight the original replied message
  const scrollToRepliedMessage = (msgId) => {
    const targetMessage = document.getElementById(msgId);
    if (targetMessage) {
      // Scroll to the message
      targetMessage.scrollIntoView({ behavior: "smooth", block: "center" });

      // Highlight the message by changing its background color
      setHighlightedMsgId(msgId);

      // Remove the highlight after 2 seconds
      setTimeout(() => {
        setHighlightedMsgId(null);
      }, 10000);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
      {/* Chat Box */}
      <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
        {/* Chat Header */}
        <div className="text-xl font-semibold mb-4 flex items-center space-x-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="h-6 w-6" />
          </div>
          <span className="flex items-center">{adminName}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {currentMessages?.length > 0 ? (
            currentMessages.map((msg, index) => {
              const isSender = msg.sender?._id === userId;
              const messageClass = isSender ? "bg-blue-800 text-white" : "bg-gray-200 text-black";

              // Apply unique background color for highlighted message
              const isHighlighted = msg._id === highlightedMsgId;
              const highlightClass = isHighlighted ? "bg-blue-300 scale-105 transition-all duration-1000" : messageClass;

              return (
                <div key={index} className="relative flex flex-col">
                  <div className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`w-fit max-w-[50%] mb-6 relative`}
                      id={msg._id}
                    >
                      {/* Message Content */}
                      <div
                        className={`inline-block rounded-lg break-words whitespace-pre-wrap leading-6 ${highlightClass} px-3 py-2 w-full max-w-xs md:max-w-sm`}
                        onClick={() => handleMsgClick(msg._id)}
                      >
                        {/* Show replied message if available */}
                        {msg.repliedTo && (
                          <div className="text-xs text-gray-400 mb-2">
                            <p>
                              Replied to:{" "}
                              <span
                                className="text-gray-400 cursor-pointer hover:underline"
                                onClick={() => scrollToRepliedMessage(msg.repliedTo.id)}
                              >
                                {msg.repliedTo.text}
                              </span>
                            </p>
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>

                      {/* Reply & Copy Icons */}
                      {showIcons === msg._id && (
                        <div className="flex justify-center mt-2 space-x-2">
                          {/* Reply Icon */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <button
                                  onClick={() => handleReply(msg._id, msg.text)}
                                  className="bg-gray-400 text-white hover:bg-gray-700 p-2 rounded-full"
                                >
                                  <CornerDownLeft className="w-4 h-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reply</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* Copy Icon */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <button
                                  onClick={() => handleCopy(msg.text)}
                                  className="bg-gray-400 text-white hover:bg-gray-700 p-2 rounded-full"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500">
              <p>No messages yet. Start a conversation!</p>
            </div>
          )}
        </div>

        {/* Input Section (User's Message Box) */}
        {userRole === "user" && (
          <div className="flex flex-col mt-4 space-y-2">
            {/* Replied Message Preview */}
            {repliedMessage && (
              <div className="flex items-center bg-gray-300 p-2 rounded-md">
                <span className="text-gray-700 text-sm">Replying to: {repliedMessage.text}</span>
                <button onClick={handleCancelReply} className="ml-auto text-gray-600 hover:text-gray-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type any query you have for the seller/admin..."
                className="w-full p-3 rounded-md border border-gray-300 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sales Banner */}
      <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
        <img src={salesBanner} alt="Sales Banner" className="w-full h-full rounded-xl object-cover" />
      </div>
    </div>
  );
};

export default ChatBox;