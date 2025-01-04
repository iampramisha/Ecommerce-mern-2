import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import salesBanner from '@/assets/salesBanner.jpg'; // Adjust the import as necessary
import { getChatMessages, getUserChats, sendMessage } from '@/store/shop/chat-slice';

const ChatBox = ({ chatId }) => {
  const dispatch = useDispatch();
  const { currentMessages, status, error } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth); // Get the user from state.auth
  const [newMessage, setNewMessage] = useState('');

  // Ensure userId is available from the logged-in user
  const userId = user?.id;

  useEffect(() => {
    if (chatId) {
      dispatch(getChatMessages(chatId)); // Fetch existing chats when chatId is available
    }
  }, [dispatch, chatId]);

  const handleSendMessage = () => {
    if (newMessage.trim() && userId) {
      // Create a new message object to add immediately to UI
      const newChatMessage = {
        text: newMessage,
        isSender: true,
        userId,
      };

      // Optimistically update the UI with the new message
      dispatch(sendMessage({ chatId, text: newMessage }));

      // Add the message to the local state for immediate display
      dispatch({
        type: 'chat/addMessage',
        payload: newChatMessage,
      });

      setNewMessage('');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto h-96 space-y-4">
        {currentMessages?.length > 0 ? (
          currentMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[70%] break-words leading-6 ${
                msg.isSender
                  ? 'bg-light-blue-500 text-white ml-auto'
                  : 'bg-white text-black'
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
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
  );
};

export default ChatBox;