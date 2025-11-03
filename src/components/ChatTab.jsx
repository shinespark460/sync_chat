import React, { useContext, useEffect, useRef, useState } from "react";
import bg_image from "../assets/images/chatBox/bg_chat_img.png";
import { MessageSquareText, Plus, Smile, Send } from "lucide-react";
import assets from "../assets/assets";
import { formatMessageDate } from "../lib/utils";
import { ChatContext } from "../context/ChatContext";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import EmojiPicker from "emoji-picker-react";

const ChatTab = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    getMessages,
    sendMessage,
    loadMsgs,
  } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AppContext);
  const [input, setInput] = useState("");
  const scrollEnd = useRef(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const handleEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };
  // Handle Text Send
  const handleSubmit = async () => {
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Handle Image Send
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  const emojiRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setOpenEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollEnd.current)
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="w-full h-screen relative flex flex-col"
      style={{
        backgroundImage: `url(${bg_image})`,
      }}
    >
      <div className="w-full h-full absolute bg-[#d4d4d442]"></div>

      {selectedUser ? (
        <>
          {/* Header */}
          <div
            className={`fixed top-0 w-full z-20 flex items-center gap-3 px-4 py-4  g-white/20  shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30 `}
          >
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic || assets.avatar_icon}
                alt=""
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center text-gray-600 font-semibold">
                {selectedUser.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}

            <div className="flex-1">
              <p className="font-semibold text-[#536158] leading-5 text-lg">
                {selectedUser.fullName}
              </p>
              {onlineUsers.includes(selectedUser._id) && (
                <span className="text-green-400 text-[15px]">online</span>
              )}
            </div>
            <img
              src={assets.arrow_icon}
              alt="back"
              onClick={() => setSelectedUser(null)}
              className="w-6 cursor-pointer block md:hidden"
            />
            <img
              src={assets.help_icon}
              alt="help"
              className="w-5 hidden md:block opacity-80 hover:opacity-100 cursor-pointer"
            />
          </div>

          {/* Messages Area */}
          {loadMsgs ? (
            <div className="flex flex-col justify-center items-center gap-3 w-full h-full">
              <CircularProgress color="success" />
              <p className="text-[#4eac6d] text-xl font-bold">
                Fetching Messages....
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-4 relative z-10 space-y-5 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
              <div className="w-full h-20"></div>
              {/* Note: Applying a subtle background pattern look based on your request */}

              {messages.map((msg, index) => {
                const isSentByMe = msg.senderId === authUser._id;

                // Determine user details
                const sender = isSentByMe ? authUser : selectedUser;
                const senderName = isSentByMe ? "You" : selectedUser.fullName;
                const profilePic = sender?.profilePic || assets.avatar_icon;

                return (
                  <div
                    key={index}
                    // Flips the layout based on sender
                    className={`flex mb-6 items-start ${
                      isSentByMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* 1. Receiver's Avatar (Left side) */}
                    {!isSentByMe && (
                      <img
                        src={profilePic}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0"
                      />
                    )}

                    {/* 2. Message Content Container (Message + Metadata) */}
                    <div
                      className={`flex flex-col max-w-[70%] break-words ${
                        isSentByMe ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Metadata (Name/Time - Above the bubble, matching the image) */}
                      <div
                        className={`text-[11px] mb-1 text-gray-400 flex items-center ${
                          isSentByMe ? "justify-end" : "justify-start"
                        } w-full space-x-2`}
                      >
                        {/* Sender name is only shown for received messages in the image, and 'You' on the right side */}
                        {isSentByMe ? (
                          <span className="font-semibold text-gray-700 text-sm">
                            {senderName}
                          </span>
                        ) : (
                          <span className="font-semibold text-gray-700 text-sm">
                            {senderName}
                          </span>
                        )}
                        <span
                          className={`${
                            isSentByMe ? "order-2" : "order-1"
                          } text-gray-500 text-sm`}
                        >
                          {formatMessageDate(msg.createdAt)}
                        </span>
                      </div>

                      {/* Message Bubble or Image */}
                      {msg.image ? (
                        <img
                          src={msg.image}
                          alt="sent"
                          className="w-[200px] shadow-md cursor-pointer transition duration-300"
                        />
                      ) : (
                        <div
                          className={`px-3 py-2 text-[16px] text-gray-800 shadow-md max-w-full transition duration-200 
                               
                                ${
                                  isSentByMe
                                    ? "bg-[#D9FDD3] " // Light green/teal for sent (like the image)
                                    : "bg-white  border-gray-100" // White for received
                                }`}
                        >
                          {msg.text}
                        </div>
                      )}
                    </div>

                    {/* 3. Sender's Avatar (Right side) */}
                    {isSentByMe && (
                      <img
                        src={profilePic}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover ml-3 flex-shrink-0"
                      />
                    )}
                  </div>
                );
              })}
              <div ref={scrollEnd}></div>
            </div>
          )}

          {/* Input Area */}
          <div className="relative z-20 bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30 px-3 py-4 flex items-center gap-3">
            {/* Plus Button */}
            <div className="flex relative justify-center items-center h-9 w-9 rounded-full hover:bg-gray-200/30 transition">
              <Plus size={22} color="gray" />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2">

              </div>
            </div>

            {/* Emoji Picker */}
            <div
              ref={emojiRef}
              className="relative flex justify-center items-center h-9 w-9 rounded-full flex-shrink-0 hover:bg-gray-200/30 transition"
            >
              <Smile
                size={22}
                color="gray"
                className="cursor-pointer"
                onClick={() => setOpenEmoji(!openEmoji)}
              />
              {openEmoji && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                  <EmojiPicker
                    open={openEmoji}
                    skinTonesDisabled={true}
                    onEmojiClick={(emojiData) => handleEmojiClick(emojiData)}
                  />
                </div>
              )}
            </div>

            {/* Input Field */}
            <div className="flex-1 flex items-center bg-gray-300/20 px-3 py-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Type a message..."
                className="w-full bg-transparent text-[16px] py-2 outline-none placeholder-gray-400 text-gray-800"
              />
            </div>

            {/* Send Button */}
            {/* <img
              src={assets.send_button}
              onClick={handleSubmit}
              alt="send"
              className="w-8 cursor-pointer hover:scale-110 transition-transform"
            /> */}
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center p-3 rounded-xl cursor-pointer bg-green-400"
            >
              <Send size={22} color="white" className="mr-0.5" />
            </button>
          </div>
        </>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center h-full text-center z-20">
          <div className="w-28 h-28 bg-green-400/40 rounded-full flex items-center justify-center">
            <MessageSquareText size={60} className="text-green-500" />
          </div>
          <h2 className="mt-3 text-xl text-white font-semibold">
            Welcome to Synk Chat
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Select a user to start your conversation.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatTab;

{
  /* <input
                type="file"
                id="image"
                onChange={handleSendImage}
                hidden
                accept="image/*"
              />
              <label htmlFor="image" className="cursor-pointer">
                <img
                  src={assets.gallery_icon}
                  alt="gallery"
                  className="w-5 opacity-70 hover:opacity-100 transition"
                />
              </label> */
}
