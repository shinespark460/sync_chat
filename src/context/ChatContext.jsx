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
  const { socket, axios } = useContext(AppContext);
 // ✅ CORRECT: The setter function is named 'setArchivedUsers'
const [archivedUsers, setArchivedUsers] = useState(() => {
  const stored = localStorage.getItem("archivedUsers");
  return stored ? JSON.parse(stored) : [];
});
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
      toast.error("Error: " + error.message);
      setLoading(false);
    }
  };

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

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

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
  useEffect(() => {
    const unsubscribe = subscribeToMessages();
    return unsubscribe;
  }, [socket, selectedUser]);

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
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
