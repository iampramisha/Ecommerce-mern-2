


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