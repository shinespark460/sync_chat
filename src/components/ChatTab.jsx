import React, { useContext, useEffect, useRef, useState } from "react";
import bg_image from "../assets/images/chatBox/bg_chat_img.png";
import logo from "../assets/images/login/synk_logo.png";
import {
  Plus,
  Smile,
  Send,
  FileText,
  Images,
  Headphones,
  Link,
  MapPin,
  Search,
  Info,
  EllipsisVertical,
  Archive,
  BellOff,
} from "lucide-react";
import assets from "../assets/assets";
import { formatMessageDate } from "../lib/utils";
import { ChatContext } from "../context/ChatContext";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import EmojiPicker from "emoji-picker-react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ImagePreviewDialog from "../lib/ImageModel";
const ChatTab = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    getMessages,
    sendMessage,
    loadMsgs,
    toggleArchiveUser,
    isUserArchived,
    msgSendLoading,
  } = useContext(ChatContext);
  const { authUser, onlineUsers, openProfileUser, setOpenProfileUser } =
    useContext(AppContext);
  const [input, setInput] = useState("");
  const scrollEnd = useRef(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [openAttachment, setOpenAttachment] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const openImageDialog = (url) => {
    setSelectedImageUrl(url); // Set the URL of the clicked image
    setDialogOpen(true); // Open the dialog
  };

  // Function to close the dialog
  const closeImageDialog = () => {
    setDialogOpen(false);
    setSelectedImageUrl(null); // Optional: clear the URL when closing
  };

  const [previewImage, setPreviewImage] = useState(null);
  // This will store an object like: { file: FileObject, url: 'blob:http://...' }
  const handleEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };
  // Handle Text Send
  const handleSubmit = async () => {
    if (input.trim() === "") return;

    const messageText = input.trim(); // 👈 Save the text first
    setInput(""); // 👈 Clear input IMMEDIATELY

    await sendMessage({ text: messageText }); // 👈 Send the saved text
  };

  const [open, setOpen] = React.useState(false);

  // Function to open upcoming feature dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage({
        file: file,
        url: imageUrl,
      });
      e.target.value = null;
    }
    setOpenAttachment(false);
  };
  const handleCancelPreview = () => {
    URL.revokeObjectURL(previewImage.url);
    setPreviewImage(null);
  };
  const handleSendImage = async () => {
    const file = previewImage?.file;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      handleCancelPreview(); // close preview after sending
    };
    reader.readAsDataURL(file);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const msgRefs = useRef([]); // array of refs

  useEffect(() => {
    if (search.trim()) {
      const foundMessage = messages.find(
        (msg) =>
          msg &&
          msg.text &&
          msg.text.toLowerCase().includes(search.toLowerCase())
      );
      if (foundMessage) {
        const targetElement = msgRefs.current[foundMessage._id];
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            targetElement.classList.add("highlight");
            setTimeout(() => targetElement.classList.remove("highlight"), 3000);
          }, 100);
        } else {
          console.warn("Target element not found for id:", foundMessage._id);
        }
      } else {
        toast.error(`No messages found matching "${search.trim()}"`);
      }
    }
  }, [search, messages]);

  const optionref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionref.current && !optionref.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const searchref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchref.current && !searchref.current.contains(event.target)) {
        setOpenSearchBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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

  const attachMentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        attachMentRef.current &&
        !attachMentRef.current.contains(event.target)
      ) {
        setOpenAttachment(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollEnd.current)
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`w-full h-screen relative flex flex-col `}
      style={{
        backgroundImage: `url(${bg_image})`,
      }}
    >
      <div className="w-full h-full absolute "></div>

      {selectedUser ? (
        <>
          {/* Header */}
          <div
            className={`top-0 left-0 w-full z-10 fixed md:relative  flex items-center justify-between  px-4 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border-b border-base-200 bg-base-100/80 md:border-base-300`}
          >
            {/* ===== Left Section (Profile Info) ===== */}
            <div
              onClick={() => setOpenProfileUser(true)}
              className={`flex items-center gap-3 cursor-pointer w-full`}
            >
              <img
                src={assets.arrow_icon}
                alt="back"
                onClick={() => {
                  setSelectedUser(null);
                  setOpenProfileUser(false);
                }}
                className="w-6 cursor-pointer block md:hidden"
              />
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

              <div className="flex-1 overflow-hidden">
                <p className="font-semibold  leading-5 text-lg truncate">
                  {selectedUser.fullName}
                </p>
                {onlineUsers.includes(selectedUser._id) && (
                  <span className="text-green-400 text-[15px]">online</span>
                )}
              </div>
            </div>

            {/* ===== Right Section (Icons + Dropdowns) ===== */}
            <div className="flex items-center gap-6 relative">
              {/* 🔍 Search Icon */}
              <span className="relative">
                <Search
                  size={22}
                  fontWeight={600}
                  onClick={() => setOpenSearchBox(!openSearchBox)}
                  className="cursor-pointer"
                />
                {openSearchBox && (
                  <div
                    ref={searchref}
                    className=" absolute top-full  bg-base-100 right-0 mt-2 p-2 rounded-lg shadow-lg"
                  >
                    <input
                      type="text"
                      placeholder="Search message..."
                      value={search}
                      onChange={handleSearchChange}
                      className="px-3 py-1.5 border  rounded-md text-[16px] outline-none"
                    />
                  </div>
                )}
              </span>

              {/* ℹ️ Info Icon */}
              <span>
                <Info
                  size={22}
                  className="cursor-pointer"
                  fontWeight={600}
                  onClick={() => setOpenProfileUser(!openProfileUser)}
                />
              </span>

              {/* ⋮ Options Icon */}
              <span className="relative">
                <EllipsisVertical
                  size={22}
                  fontWeight={600}
                  className="cursor-pointer"
                  onClick={() => setShowOptions(!showOptions)}
                />
                {showOptions && (
                  <div
                    ref={optionref}
                    className=" absolute top-full right-0 mt-3 p-3 rounded-lg shadow-lg  bg-base-100 border  w-36"
                  >
                    <ul className="flex flex-col gap-2 px-2 text-sm">
                      <li
                        onClick={() => {
                          toggleArchiveUser(selectedUser._id);
                          setShowOptions(!showOptions);
                          if (isUserArchived(selectedUser._id)) {
                            toast.success("Contact Unarchived");
                          } else {
                            toast.success("Contact archived");
                          }
                        }}
                        className="flex justify-between items-center cursor-pointer  hover:text-green-400 transition"
                      >
                        <span>
                          {" "}
                          {isUserArchived(selectedUser._id)
                            ? "Unarchive"
                            : "Archive"}
                        </span>
                        <Archive size={18} />
                      </li>
                      <li className="flex justify-between items-center cursor-pointer  hover:text-green-400 transition">
                        <span>Mute</span>
                        <BellOff size={18} />
                      </li>
                    </ul>
                  </div>
                )}
              </span>
            </div>
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
            <div className="flex-1 overflow-y-auto lg:px-6 px-3 py-4 relative z-0 space-y-5  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
              <div className="w-full h-5"></div>
              {/* Note: Applying a subtle background pattern look based on your request */}

              {messages.map((msg, index) => {
                const isSentByMe = msg.senderId === authUser._id;
                const sender = isSentByMe ? authUser : selectedUser;
                const senderName = isSentByMe ? "You" : selectedUser.fullName;
                const profilePic = sender?.profilePic || assets.avatar_icon;

                return (
                  <div
                    key={msg._id || index} // Use msg._id instead of index
                    className={`chat ${isSentByMe ? "chat-end" : "chat-start"}`}
                  >
                    {/* Avatar */}
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={profilePic} alt="avatar" />
                      </div>
                    </div>

                    {/* Header (Name + Time) */}
                    <div className="chat-header flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {senderName}
                      </span>
                      <time className="text-xs opacity-50">
                        {formatMessageDate(msg.createdAt)}
                      </time>
                    </div>

                    {/* Bubble (Text or Image) */}
                    {msg.image ? (
                      <div className="chat-bubble p-2 flex shadow-md justify-center items-center">
                        <img
                          src={msg.image}
                          onClick={() => openImageDialog(msg.image)}
                          alt="sent-img"
                          className="chat-bubble p-0 w-40 cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div
                        ref={(el) => (msgRefs.current[msg._id] = el)}
                        className="chat-bubble shadow-md max-w-[70%]"
                      >
                        {/* 👇 Check if THIS message is loading */}
                        {msg.isLoading ? (
                          <CircularProgress size="20px" />
                        ) : (
                          <span>{msg.text}</span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="chat-footer opacity-50 text-xs">
                      {isSentByMe ? "Delivered" : ""}
                    </div>
                  </div>
                );
              })}
              <div ref={scrollEnd}></div>
            </div>
          )}
          <div className="w-full md:h-16 h-14"></div>
          {/* Input Area */}
          <div className="absolute bottom-0 w-full z-20   shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border-b   px-1 lg:px-3 py-2.5 flex items-center gap-3 border-base-200 bg-base-100/80 md:border-base-300">
            {/* Plus Button */}
            <div
              ref={attachMentRef}
              onClick={() => setOpenAttachment(true)}
              className="flex relative justify-center items-center h-9 w-9 rounded-full hover:bg-gray-200/30 transition cursor-pointer"
            >
              <Plus size={22} />
              {openAttachment && (
                <div className="absolute bottom-12 left-0 md:left-1/2 md:-translate-x-1/2 z-50  bg-base-100   rounded-lg shadow-lg border ">
                  <ul className="py-2">
                    <li
                      onClick={(e) => {
                        handleClickOpen(e);
                        setOpenAttachment(false);
                      }}
                      className="flex hover:bg-green-200 justify-start gap-4 py-1.5 my-1 text-lg ps-4 pe-8 items-center cursor-pointer"
                    >
                      <span className="">
                        <FileText size={20} />
                      </span>{" "}
                      <span>Document</span>
                    </li>
                    <li className="flex hover:bg-green-200 justify-start gap-4 py-1.5 my-1 text-lg ps-4 pe-8 items-center cursor-pointer">
                      {/* The hidden input must stay */}

                      {/* Wrap BOTH the icon and the text inside the <label> */}
                      <label
                        htmlFor="image"
                        className="flex items-center gap-4 w-full cursor-pointer"
                      >
                        {" "}
                        <input
                          type="file"
                          id="image"
                          onChange={handleOpenImage}
                          hidden
                          accept="image/jpg, image/jpeg, image/png"
                        />
                        {/* Use the original span for styling if needed, or remove it */}
                        <span className="">
                          <Images size={20} />
                        </span>{" "}
                        Photos
                      </label>
                    </li>
                    <li
                      onClick={handleClickOpen}
                      className="flex hover:bg-green-200 justify-start gap-4 py-1.5 my-1 text-lg ps-4 pe-8 items-center cursor-pointer"
                    >
                      <span className="">
                        <Headphones size={20} />
                      </span>{" "}
                      <span>Audio</span>
                    </li>
                    <li
                      onClick={handleClickOpen}
                      className="flex hover:bg-green-200 justify-start gap-4 py-1.5 my-1 text-lg ps-4 pe-8 items-center cursor-pointer"
                    >
                      <span className="">
                        <Link size={20} />
                      </span>{" "}
                      <span>Link</span>
                    </li>
                    <li
                      onClick={handleClickOpen}
                      className="flex hover:bg-green-200 justify-start gap-4 py-1.5 my-1 text-lg ps-4 pe-8 items-center cursor-pointer"
                    >
                      <span className="">
                        <MapPin size={20} />
                      </span>{" "}
                      <span>Loaction</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Emoji Picker */}
            <div
              ref={emojiRef}
              className="relative flex justify-center items-center h-9 w-9 rounded-full shrink-0 hover:bg-gray-200/30 transition"
            >
              <Smile
                size={22}
                className="cursor-pointer"
                onClick={() => setOpenEmoji(!openEmoji)}
              />
              {openEmoji && (
                <div className="absolute bottom-12 border rounded-lg  z-50 -left-10 md:left-1/2  bg-base-100 md:-translate-x-1/2">
                  <EmojiPicker
                    open={openEmoji}
                    width={300}
                    theme="auto"
                    height={400}
                    skinTonesDisabled={true}
                    className="bg-base-100"
                    onEmojiClick={(emojiData) => handleEmojiClick(emojiData)}
                  />
                </div>
              )}
            </div>

            {/* Input Field */}
            <div className="flex-1 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Type a message..."
                className="w-full border px-4 text-[16px] py-2 input outline-none "
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={input.trim() === "" || msgSendLoading}
              className={`flex justify-center items-center p-2 border btn border-base-300 outline-none bg-base-200
    ${input.trim() === "" || msgSendLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-60 cursor-pointer"}`}
            >
              <Send size={22} />
            </button>

          </div>
          {previewImage && (
            <div className="fixed inset-0 bg-base-100 flex flex-col p-4  justify-center items-center z-100">
              <h1 className="mb-2">
                Send Image to{" "}
                <span className="font-bold">{selectedUser?.fullName}</span>
              </h1>
              {msgSendLoading && (
                <div className="w-full h-full absolute flex justify-center flex-col gap-4 items-center bg-base-100 opacity-60 z-50">
                  <CircularProgress size="60px" />
                  <h2>Sending...</h2>
                </div>
              )}
              <div className=" p-4 rounded-lg shadow-xl  ">
                <img
                  src={previewImage.url}
                  alt="Preview"
                  className="max-h-72 w-full object-contain rounded mb-4"
                />
                <div className="flex justify-between gap-4">
                  <button
                    onClick={handleCancelPreview}
                    className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendImage}
                    className="px-4 py-2 border cursor-pointer rounded hover:bg-green-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Dialog Box for upcoming features */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"🛠️ Feature Unavailable"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This option isn’t available yet. I am working to roll it out
                soon. Stay tuned for updates.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Okay</Button>
            </DialogActions>
          </Dialog>
          <ImagePreviewDialog
            open={dialogOpen}
            imageUrl={selectedImageUrl}
            onClose={closeImageDialog}
          />
        </>
      ) : (
        // Empty State
        <div className="w-full h-full flex justify-center items-center">
          {" "}
          <div className="flex flex-col gap-2 items-center">
            {" "}
            <div className=" rounded-full flex justify-center items-center mx-auto">
              {" "}
              <img
                src={logo}
                className="w-72 brightness-100 pointer-events-none"
              />
            </div>{" "}
            <h2 className="text-xl font-medium">
              {" "}
              Welcome to the Synk Chat Web App{" "}
            </h2>{" "}
            <p className="text-lg text-gray-500 font-medium">
              Select a user. Start chatting with your friends now!
            </p>{" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default ChatTab;
