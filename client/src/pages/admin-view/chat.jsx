// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getChatMessages } from "@/store/shop/chat-slice";
// import { User } from "lucide-react";
// import salesBanner from "@/assets/salesBanner.jpg";
// import { sendSellerMessage } from "@/store/admin/chat-slice";

// const SellerChatBox = () => {
//   const dispatch = useDispatch();
//   const { currentMessages, status, error } = useSelector((state) => state.chat);
//   const { user } = useSelector((state) => state.auth); // Get logged-in seller/admin
//   const [newMessage, setNewMessage] = useState("");

//   // Extract chatId from URL params using useParams
//   const { chatId } = useParams();

//   const sellerId = user?.id;
//   const sellerRole = user?.role;

//   // Create a ref to scroll to the last message
//   const messagesEndRef = useRef(null);

//   // Fetch messages for the selected chat on component mount or chatId change
//   useEffect(() => {
//     if (chatId) {
//       dispatch(getChatMessages(chatId)); // Fetch messages for the selected chat
//     }
//   }, [dispatch, chatId]);

//   // Auto-scroll to the bottom whenever new messages are added
//   useEffect(() => {
//     // Scroll to the bottom after the messages are updated
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentMessages]); // This will run every time currentMessages change

//   const handleSendMessage = () => {
//     if (newMessage.trim() && sellerId) {
//       dispatch(
//         sendSellerMessage({ chatId, sellerId, text: newMessage })
//       )
//         .then(() => {
//           // After sending, clear input and fetch updated messages
//           setNewMessage("");
//           dispatch(getChatMessages(chatId));
//         })
//         .catch((error) => console.error("Error sending message:", error));
//     }
//   };

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
//       {/* Chat Box */}
//       <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
//         {/* Seller Information */}
//         <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
//           <div className="bg-gray-100 p-2 rounded-full">
//             <User className="h-6 w-8" />
//           </div>
//           <span className="flex items-center">
//             {user?.userName || "Seller"}
//           </span>
//         </div>

//         {/* Messages */}
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
//                   className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`} // Sender to the right, receiver to the left
//                 >
//                   <div
//                     className={`inline-block max-w-[50%] rounded-lg break-words leading-6 ${messageClass} px-3 py-2`}
//                     style={{
//                       width: "fit-content", // Allow the message to only occupy necessary space
//                     }}
//                   >
//                     <p>{msg.text}</p>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center text-gray-500">
//               <p>No messages yet. Start a conversation!</p>
//             </div>
//           )}

//           {/* Empty div to scroll to the bottom */}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Section (Only for seller) */}
//         {sellerRole === "admin" && (
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
//         )}
//       </div>

//       {/* Sales Banner */}
//       <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
//         <img
//           src={salesBanner}
//           alt="Sales Banner"
//           className="w-full h-full rounded-xl object-cover"
//           style={{
//             height: "50vh",
//             borderRadius: "40% 60% 30% 50%", // Top-left, top-right, bottom-right, bottom-left
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
// import { User, CornerDownLeft } from "lucide-react"; // Import reply icon
// import salesBanner from "@/assets/salesBanner.jpg";
// import { sendSellerMessage } from "@/store/admin/chat-slice";

// const SellerChatBox = () => {
//   const dispatch = useDispatch();
//   const { currentMessages, status, error } = useSelector((state) => state.chat);
//   const { user } = useSelector((state) => state.auth);
//   const [newMessage, setNewMessage] = useState("");
//   const [repliedMessage, setRepliedMessage] = useState(null); // Track the replied message
//   const { chatId } = useParams();
//   console.log("chatiddddaaa,",chatId)
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
//       dispatch(
//         sendSellerMessage({
//           chatId,
//           sellerId,
//           text: newMessage,
//           repliedMessage: repliedMessage,  // This should be an object with { id, text }
//         })
//       )
      
//         .then(() => {
//           setNewMessage("");
//           setRepliedMessage(null); // Clear the replied message after sending
//           dispatch(getChatMessages(chatId));
//         })
//         .catch((error) => console.error("Error sending message:", error));
//     }
//   };

//   const handleReply = (msgId, msgText) => {
//     setRepliedMessage({ id: msgId, text: msgText });
//   };
  

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
//       <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
//         <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
//           <div className="bg-gray-100 p-2 rounded-full">
//             <User className="h-6 w-8" />
//           </div>
//           <span className="flex items-center">
//             {user?.userName || "Seller"}
//           </span>
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
//                  {msg.repliedTo && (
//   <div className="text-sm text-gray-400 mb-2">
//     <p>Replied to: {msg.repliedTo.text}</p>
//   </div>
// )}

//                     <p>{msg.text}</p>
//                     {/* {!isSender && ( */}
//   <button onClick={() => handleReply(msg._id, msg.text)}>
//     <CornerDownLeft  className={`w-4 h-4 ${isSender ? "text-white" : "text-gray-600"} hover:text-blue-600`}  />
//   </button>
// {/* )} */}
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
//           <div className="flex flex-col items-start mt-4 space-y-2 w-full">
//             {repliedMessage && (
//               <div className="text-sm text-gray-500 mb-2 w-full">
//                 <span>
//                   Replying to: <strong>{repliedMessage.text}</strong>
//                 </span>
//                 <button
//                   onClick={() => setRepliedMessage(null)}
//                   className="text-red-600 text-xs ml-2"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//             <div className="flex items-center space-x-2 w-full">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Reply to the buyer..."
//                 className="w-full p-3 rounded-md border border-gray-300 text-sm"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
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
// import { User, CornerDownLeft } from "lucide-react"; // Import reply icon
// import salesBanner from "@/assets/salesBanner.jpg";
// import { sendSellerMessage } from "@/store/admin/chat-slice";

// const SellerChatBox = () => {
//   const dispatch = useDispatch();
//   const { currentMessages, status, error } = useSelector((state) => state.chat);
//   const { user } = useSelector((state) => state.auth);
//   const [newMessage, setNewMessage] = useState("");
//   const [repliedMessage, setRepliedMessage] = useState(null); // Track the replied message
//   const [selectedMessage, setSelectedMessage] = useState(null); // Track selected message for reply
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
//       dispatch(
//         sendSellerMessage({
//           chatId,
//           sellerId,
//           text: newMessage,
//           repliedMessage: repliedMessage,  // This should be an object with { id, text }
//         })
//       )
//         .then(() => {
//           setNewMessage("");
//           setRepliedMessage(null); // Clear the replied message after sending
//           dispatch(getChatMessages(chatId));
//         })
//         .catch((error) => console.error("Error sending message:", error));
//     }
//   };

//   const handleReply = (msgId, msgText) => {
//     setRepliedMessage({ id: msgId, text: msgText });
//     setSelectedMessage(msgId); // Set the selected message for reply
//   };

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
//       <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
//         <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
//           <div className="bg-gray-100 p-2 rounded-full">
//             <User className="h-6 w-8" />
//           </div>
//           <span className="flex items-center">
//             {user?.userName || "Seller"}
//           </span>
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
//                     onClick={() => handleReply(msg._id, msg.text)} // Make the message clickable
//                   >
//                     {msg.repliedTo && (
//                       <div className="text-sm text-gray-400 mb-2">
//                         <p>Replied to: {msg.repliedTo.text}</p>
//                       </div>
//                     )}
//                     <p>{msg.text}</p>
//                     {/* Show the reply button only for the clicked message */}
//                     {selectedMessage !== msg._id && (
//                       <button
//                         onClick={() => handleReply(msg._id, msg.text)}
//                         className="absolute top-0 right-0"
//                       >
//                         <CornerDownLeft className="w-4 h-4 text-gray-600 hover:text-blue-600" />
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
//           <div className="flex flex-col items-start mt-4 space-y-2 w-full">
//             {repliedMessage && (
//               <div className="text-sm text-gray-500 mb-2 w-full">
//                 <span>
//                   Replying to: <strong>{repliedMessage.text}</strong>
//                 </span>
//                 <button
//                   onClick={() => setRepliedMessage(null)}
//                   className="text-red-600 text-xs ml-2"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//             <div className="flex items-center space-x-2 w-full">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Reply to the buyer..."
//                 className="w-full p-3 rounded-md border border-gray-300 text-sm"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
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

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChatMessages } from "@/store/shop/chat-slice";
import { sendSellerMessage } from "@/store/admin/chat-slice";
import { User, CornerDownLeft, Copy } from "lucide-react"; // Import reply icon
import salesBanner from "@/assets/salesBanner.jpg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SellerChatBox = () => {
  const dispatch = useDispatch();
  const { currentMessages, status, error } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const [repliedMessage, setRepliedMessage] = useState(null); // Track the replied message
  const [tooltipVisible, setTooltipVisible] = useState(null); // Track if tooltip should be visible for a message
  const [showIcons, setShowIcons] = useState(null); // Track if icons should be shown for a specific message
  const { chatId } = useParams();
  const sellerId = user?.id;
  const sellerRole = user?.role;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatId) {
      dispatch(getChatMessages(chatId));
    }
  }, [dispatch, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && sellerId) {
      dispatch(
        sendSellerMessage({
          chatId,
          sellerId,
          text: newMessage,
          repliedMessage: repliedMessage,  // This should be an object with { id, text }
        })
      )
        .then(() => {
          setNewMessage("");
          setRepliedMessage(null); // Clear the replied message after sending
          dispatch(getChatMessages(chatId));
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  const handleReply = (msgId, msgText) => {
    setRepliedMessage({ id: msgId, text: msgText });
    setTooltipVisible(null); // Hide the tooltip after reply
    setShowIcons(null); // Hide the icons when the message is replied
  };

  const handleMessageClick = (msgId) => {
    // Toggle the visibility of icons on click
    setShowIcons((prevId) => (prevId === msgId ? null : msgId));
  };
  
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard!");
    }).catch((err) => {
      console.error("Error copying text: ", err);
    });
  };

  return (
    <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
      <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
        <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="h-6 w-8" />
          </div>
          <span className="flex items-center">
            {user?.userName || "Seller"}
          </span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {currentMessages?.length > 0 ? (
            currentMessages.map((msg, index) => {
              const isSender = msg.sender?._id === sellerId;
              const messageClass = isSender
                ? "ml-auto bg-blue-800 text-white"
                : "bg-gray-200 text-black";

              return (
                <div
                  key={index}
                  className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`inline-block max-w-[50%] rounded-lg break-words leading-6 ${messageClass} px-3 py-2 relative  mb-6`}
                    style={{ width: "fit-content" }}
                    onClick={() => handleMessageClick(msg._id)}  // Show icons on message click
                  >
                    {msg.repliedTo && (
                      <div className="text-xs text-gray-400 mb-2">
                        <p>Replied to: {msg.repliedTo.text}</p>
                      </div>
                    )}
                    <p>{msg.text}</p>

                    {/* Tooltip for reply icon */}
                    {showIcons === msg._id && (
        <div className={`absolute ${isSender ? 'bottom-5' : 'bottom-2'} right-2 flex items-center space-x-2 mt-4`}>

                        <TooltipProvider  className="bg-gray-300">
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => handleReply(msg._id, msg.text)}
                                className={`text-gray-600 hover:text-blue-600 ${isSender ? 'text-white' : ''}`}
                              >
                                <CornerDownLeft className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reply</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        {/* Copy icon */}
                        <TooltipProvider  className="bg-gray-300">
                          <Tooltip>
                            <TooltipTrigger>
                        <button
                          onClick={() => handleCopy(msg.text)}
                          className={`text-gray-600 hover:text-blue-600 ${isSender ? 'text-white' : ''}`}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        </TooltipTrigger>
                            <TooltipContent>
                              <p >Copy</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500">
              <p>No messages yet. Start a conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {sellerRole === "admin" && (
          <div className="flex flex-col items-start mt-4 space-y-2 w-full">
            {repliedMessage && (
              <div className="text-sm text-gray-500 mb-2 w-full">
                <span>
                  Replying to: <strong>{repliedMessage.text}</strong>
                </span>
                <button
                  onClick={() => setRepliedMessage(null)}
                  className="text-red-600 text-xs ml-2"
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2 w-full">
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
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
        <img
          src={salesBanner}
          alt="Sales Banner"
          className="w-full h-full rounded-xl object-cover"
          style={{
            height: "50vh",
            borderRadius: "40% 60% 30% 50%",
          }}
        />
      </div>
    </div>
  );
};

export default SellerChatBox;