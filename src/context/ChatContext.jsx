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

    const { socket, axios } = useContext(AppContext);

    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/auth/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
            return data;
        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };

    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/message/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            }
            return data;
        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };

    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/message/send/${selectedUser._id}`, messageData);
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
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prev) => [...prev, newMessage]);
                await axios.put(`/api/message/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prev) => ({
                    ...prev,
                    [newMessage.senderId]:
                        (prev[newMessage.senderId] || 0) + 1,
                }));
            }
        };

        socket.on("newMessages", handleNewMessage);

        return () => socket.off("newMessages", handleNewMessage);
    };

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
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
