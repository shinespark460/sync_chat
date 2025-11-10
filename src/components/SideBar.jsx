import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ChatContext } from "../context/ChatContext";

const SideBar = () => {
  const {
    
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const filteredUsers = users
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : [];


  return (
    <div
      className={`bg-[#1885b2]/10 h-full p-4 sm:p-5 rounded-r-xl text-white overflow-y-auto transition-all duration-300
            ${selectedUser ? "max-sm:hidden" : "block"}
            `}
    >
      {/* Header */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img
            src={assets.logo}
            alt="logo"
            className="w-24 sm:w-32 max-w-[120px]"
          />
          <div className="relative py-2">
            <button onClick={() => setShowMenu((prev) => !prev)}>
              <img
                src={assets.menu_icon}
                alt="menu"
                className="max-h-5 cursor-pointer"
              />
            </button>
            {showMenu && (
              <div className="absolute top-full right-0 z-20 w-32 p-4 rounded-md bg-[#282142] border border-gray-500 text-gray-100 ">
                <p
                  className="cursor-pointer text-sm"
                  onClick={() => {
                    navigate("/profile");
                    setShowMenu(false);
                  }}
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="cursor-pointer text-sm"
                >
                  Log Out
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center px-4 py-2 mt-4 rounded-full gap-3 bg-[#282142]">
          <img src={assets.search_icon} alt="" className="w-3" />
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search or start new chat"
            className="bg-transparent border-none text-white text-sm flex-1 placeholder:text-[#8c8c8c] outline-none"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex flex-col gap-2 sm:gap-3 overflow-y-auto max-h-[70vh]">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            className={`relative flex items-center gap-3 p-2 pl-3 rounded-2xl cursor-pointer transition-all duration-200
                            ${
                              selectedUser?._id === user._id
                                ? "bg-[#1885b2]/30"
                                : "hover:bg-[#1885b2]/20"
                            }
                            `}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              className="w-8 sm:w-9 md:w-10 aspect-square rounded-full object-cover"
            />
            <div className="flex flex-col leading-5">
              <p className="text-sm sm:text-base truncate max-w-[120px] sm:max-w-[180px]">
                {user.fullName}
              </p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-500 text-xs">Online</span>
              ) : (
                <span className="text-gray-500 text-xs">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="top-2 right-3 rounded-full text-xs absolute flex justify-center items-center w-4 h-4 bg-violet-500/50">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
