/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { ChatContext } from "../../context/ChatContext";
import { AppContext } from "../../context/AppContext";
const ArchiveTab = () => {
  const [input, setInput] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    setArchivedUsers,
    archivedUsers,
  } = useContext(ChatContext);
  const { onlineUsers } = useContext(AppContext);
  // 🔹 Filter archived users whenever users change
  useEffect(() => {
    if (users?.length) {
      const filtered = users.filter((user) => archivedUsers.includes(user._id));
      setFilteredUserList(filtered);
    }
  }, [users, archivedUsers]);
  
  useEffect(() => {
    getUsers();
  }, [onlineUsers]);
  const searchedUsers = filteredUserList.filter((user) =>
    user.fullName.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className=" w-full bg-white h-screen overflow-y-auto flex flex-col py-4 border-r border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-green-600 text-xl font-semibold">Archived</h2>
      </div>
      {/* Search Bar */}
      <div className="px-4">
        <div className="relative my-3">
          {/* Search Icon */}
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search chat"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full pl-9 pr-3 py-2.5 bg-gray-100 text-gray-800 outline-none focus:ring-1 focus:ring-green-400 transition"
          />
        </div>
      </div>

      {/* Chat list */}

      <div className="flex flex-col">
        {searchedUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-150 
              ${
                selectedUser?._id === user._id
                  ? "bg-green-200"
                  : "hover:bg-gray-50"
              }`}
          >
            {/* Avatar */}
            <div className="relative">
              {user.profilePic ? (
                <div className="w-12 h-12">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className=" object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center text-gray-600 font-semibold">
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}{" "}
              {onlineUsers.includes(user._id) ? (
                <div className="absolute w-3 h-3 rounded-full bg-green-500 bottom-0 right-1 border-2 border-white"></div>
              ) : null}
            </div>

            {/* User info */}
            <div className="flex justify-between items-center w-full">
              <p className="font-medium text-gray-800 truncate">
                {user.fullName}
              </p>

              {/* Unread count */}
              {unseenMessages[user._id] > 0 && (
                <div className="bg-green-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {unseenMessages[user._id]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveTab;
