import React, { useContext, useEffect, useState } from "react";
import { UserPlus, Search  } from "lucide-react";
import { ChatContext } from "../../context/ChatContext";
import { AppContext } from "../../context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../assets/images/login/synk_logo.png"
const UsersTab = () => {
  const [input, setInput] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);
  const {
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    loading,
    archivedUsers,
  } = useContext(ChatContext);
  const { onlineUsers  , setOpenProfileUser} = useContext(AppContext);
  useEffect(() => {
    if (users?.length) {
      const filtered = users.filter(
        (user) => !archivedUsers.includes(user._id)
      );
      setFilteredUserList(filtered);
    }
  }, [users, archivedUsers]);
  const searchedUsers = filteredUserList.filter((user) =>
    user.fullName.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <div className=" w-full  h-screen overflow-y-auto flex flex-col pt-4 pb-16 md:border-r ">
        <div className="w-full md:hidden block fixed top-0 z-999 shadow-[0_0px_0px_rgba(0,0,0,0.1)] backdrop-blur-sm border-b border-base-200 bg-base-100">
          <img src={logo} className="w-36" alt="logo"/>
        </div>
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-3 mt-16 md:mt-0">
        <h2 className="text-base-600 text-xl font-semibold">Chats</h2>
        <button className="w-8 h-8 flex justify-center items-center bg-base-100 border-2 rounded-full hover:bg-base-300 cursor-pointer transition">
          <UserPlus className="" size={16} />
        </button>
      </div>
      {/* Search Bar */}
      <div className="px-2">
        <div className="relative my-3">
          {/* Search Icon */}
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-500"
            size={16}
          />

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search chat"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full pl-9 pr-3 py-2.5 border input  outline-none focus:ring-1 focus:ring-base-400 transition"
          />
        </div>
      </div>
      {/* Chat list */}
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-3 w-full mt-20">
          <CircularProgress color="success" />
          <p className="text-[#4eac6d] text-xl">Fetching Users....</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {searchedUsers.map((user, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedUser(user);
                setOpenProfileUser(false);
                setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
              }}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-150 
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300"
                  : "hover:bg-base-300"
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
                <p className="font-medium  truncate">
                  {user.fullName}
                </p>
                {/* Unread count */}
                {unseenMessages[user._id] > 0 && (
                  <div className="bg-base-100 border-[1px] text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {unseenMessages[user._id]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersTab;
