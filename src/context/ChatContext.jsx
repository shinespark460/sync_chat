/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsgs, setLoadMsgs] = useState(false);
  const [sendingIndex, setSendingIndex] = useState(null);
  const { socket, axios, onlineUsers, authUser } = useContext(AppContext);
  const [msgSendLoading, setMsgSendLoading] = useState(false);
  // ✅ CORRECT: The setter function is named 'setArchivedUsers'
  const [archivedUsers, setArchivedUsers] = useState(() => {
    const stored = localStorage.getItem("archivedUsers");
    return stored ? JSON.parse(stored) : [];
  });

  // Get All Users
  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
        setLoading(false);
      }
      return data;
    } catch (error) {
      console.error("Error: " + error.message);
      setLoading(false);
    }
  };
  // Get Selected Users Messages
  const getMessages = async (userId) => {
    try {
      setLoadMsgs(true);
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
        setLoadMsgs(false);
      }
      return data;
    } catch (error) {
      toast.error("Error: " + error.message);
      setLoadMsgs(false);
    }
  };

  // Send Messages to selected User
  // Send Messages to selected User
  const sendMessage = async (messageData) => {
    // 1️⃣ Create a temporary message with loading state
    const tempMessage = {
      _id: `temp-${Date.now()}`, // Temporary ID
      text: messageData.text,
      image: messageData.image,
      senderId: authUser._id,
      createdAt: new Date().toISOString(),
      isLoading: false, // 👈 Flag to show loading
    };
    setMsgSendLoading(true);
    // 2️⃣ Add temp message immediately to UI
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMsgSendLoading(false);
        // 3️⃣ Replace temp message with real message
        setMessages((prev) =>
          prev.map((msg) => (msg._id === tempMessage._id ? data.message : msg))
        );
      } else {
        // 4️⃣ Remove temp message on error
        setMessages((prev) =>
          prev.filter((msg) => msg._id !== tempMessage._id)
        );
        toast.error(data.message);
      }
    } catch (error) {
      setMsgSendLoading(false);
      // 5️⃣ Remove temp message on error
      setMessages((prev) => prev.filter((msg) => msg._id !== tempMessage._id));
      toast.error("Error: " + error.message);
    }
  };

  // Set Seen Messages
  const subscribeToMessages = () => {
    if (!socket) return;

    const handleNewMessage = async (newMessage) => {
      // ✅ Both sender and receiver should see it live
      if (
        selectedUser &&
        (newMessage.senderId === selectedUser._id ||
          newMessage.recieverId === selectedUser._id)
      ) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);

        // Optional: mark as seen
        try {
          const sendMessage = await axios.put(
            `/api/messages/mark/${newMessage._id}`
          );
          if (sendMessage.data.success) {
            console.log("Message marked as seen");
          }
        } catch (err) {
          console.error("Mark seen failed:", err.message);
        }
      } else {
        // ✅ Increment unseen count for other chats
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    };

    // ✅ Correct event name from backend
    socket.on("newMessage", handleNewMessage);

    // ✅ Cleanup listener
    return () => socket.off("newMessage", handleNewMessage);
  };

  // Load from localStorage on app start
  useEffect(() => {
    const stored = localStorage.getItem("archivedUsers");
    if (stored) setArchivedUsers(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever archive list changes
  useEffect(() => {
    localStorage.setItem("archivedUsers", JSON.stringify(archivedUsers));
  }, [archivedUsers]);

  const toggleArchiveUser = (userId) => {
    setArchivedUsers((prev) => {
      let updated;
      if (prev.includes(userId)) {
        updated = prev.filter((id) => id !== userId);
      } else {
        updated = [...prev, userId];
      }
      // Update localStorage instantly for sync
      localStorage.setItem("archivedUsers", JSON.stringify(updated));
      return updated;
    });
  };
  const isUserArchived = (userId) => archivedUsers.includes(userId);

  const STORAGE_KEY = "bookmarkedFiles";

  // Load bookmarks from localStorage on mount
  const [bookMarks, setBookMarks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Save bookmarks to localStorage whenever bookMarks changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookMarks));
  }, [bookMarks]);

  // Toggle bookmark (add/remove)
  const toggleBookmark = (url) => {
    setBookMarks((prev) => {
      if (prev.includes(url)) {
        return prev.filter((id) => id !== url);
      }
      return [...prev, url];
    });
  };

  // Check if item is bookmarked
  const isBookMarked = (url) => bookMarks.includes(url);

  useEffect(() => {
    const unsubscribe = subscribeToMessages();
    return unsubscribe;
  }, [socket, selectedUser]);

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  const value = {
    messages,
    users,
    unseenMessages,
    setUnseenMessages,
    selectedUser,
    setSelectedUser,
    getUsers,
    getMessages,
    sendMessage,
    loading,
    loadMsgs,
    archivedUsers,
    toggleArchiveUser,
    isUserArchived,
    sendingIndex,
    setSendingIndex,
    isBookMarked,
    toggleBookmark,
    bookMarks,
    msgSendLoading,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
