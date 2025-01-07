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




import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChatMessages } from "@/store/shop/chat-slice";
import { User } from "lucide-react";
import salesBanner from "@/assets/salesBanner.jpg";
import { sendSellerMessage } from "@/store/admin/chat-slice";
import { fetchProductById } from "@/store/admin/product-slice";

const SellerChatBox = () => {
  const dispatch = useDispatch();
  const { currentMessages, status, error } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth); // Get logged-in seller/admin
  const [newMessage, setNewMessage] = useState("");

  const [productImage, setProductImage] = useState(null); // Store product image if any
  const [productDetails, setProductDetails] = useState(null); // Store product details

  // Extract chatId from URL params using useParams
  const { chatId } = useParams();

  const sellerId = user?.id;
  const sellerRole = user?.role;

  // Create a ref to scroll to the last message
  const messagesEndRef = useRef(null);

  // Fetch messages for the selected chat on component mount or chatId change
  useEffect(() => {
    if (chatId) {
      dispatch(getChatMessages(chatId)); // Fetch messages for the selected chat
    }
  }, [dispatch, chatId]);

  // Auto-scroll to the bottom whenever new messages are added
  useEffect(() => {
    // Scroll to the bottom after the messages are updated
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]); // This will run every time currentMessages change

  const handleSendMessage = () => {
    if (newMessage.trim() && sellerId) {
      dispatch(
        sendSellerMessage({ chatId, sellerId, text: newMessage})
      )
        .then(() => {
          // After sending, clear input and fetch updated messages
          setNewMessage("");
        //   setRepliedMessage(""); // Clear the replied message
          dispatch(getChatMessages(chatId));
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

//   const handleReply = (message) => {
//     setRepliedMessage(message.text); // Pre-fill the reply input with the message text
//     if (message.productId) {
//       dispatch(fetchProductDetails(message.productId))
//         .then((response) => {
//           setProductDetails(response.payload);
//           setProductImage(response.payload.image); // Store the product image
//         })
//         .catch((error) => console.error("Error fetching product details:", error));
//     }
//   };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-full flex-col md:flex-row bg-gray-50">
      {/* Chat Box */}
      <div className="flex flex-col w-full h-[670px] md:w-1/2 p-4 pl-10">
        {/* Seller Information */}
        <div className="text-xl font-semibold mb-4 flex flex-row items-center space-x-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="h-6 w-8" />
          </div>
          <span className="flex items-center">
            {user?.userName || "Seller"}
          </span>
        </div>

        {/* Messages */}
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
                    className={`inline-block max-w-[50%] rounded-lg break-words leading-6 ${messageClass} px-3 py-2`}
                    style={{
                      width: "fit-content", // Allow the message to only occupy necessary space
                    }}
                  >
                    {msg.productId && productImage && !isSender && (
                      <div className="flex items-center mb-2">
                        <img
                          src={productImage}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded-lg mr-2"
                        />
                        <span className="text-sm text-gray-500">
                          Regarding: {productDetails?.title || "Product"}
                        </span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    {/* Reply Button for Seller */}
                    {/* {isSender && (
                      <button
                        // onClick={() => handleReply(msg)}
                        className="text-blue-600 mt-2 text-xs"
                      >
                        Reply to this message
                      </button>
                    )} */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500">
              <p>No messages yet. Start a conversation!</p>
            </div>
          )}

          {/* Empty div to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section (Only for seller) */}
        {sellerRole === "admin" && (
          <div className="flex items-center mt-4 space-x-2">
            {/* {repliedMessage && (
              <div className="text-sm text-gray-500 mb-2">
                <span>Replying to: {repliedMessage}</span>
              </div>
            )} */}
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
        )}
      </div>

      {/* Sales Banner */}
      <div className="hidden sm:block sm:w-1/2 h-full mt-10 rounded-lg overflow-hidden">
        <img
          src={salesBanner}
          alt="Sales Banner"
          className="w-full h-full rounded-xl object-cover"
          style={{
            height: "50vh",
            borderRadius: "40% 60% 30% 50%", // Top-left, top-right, bottom-right, bottom-left
          }}
        />
      </div>
    </div>
  );
};

export default SellerChatBox;
