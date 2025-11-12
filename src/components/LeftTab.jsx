import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MessageSquareText,
  CircleUser,
  MessagesSquare,
  Settings,
  BookmarkCheck,
  Sun,
  Users,
  Archive,
  LogOut,
} from "lucide-react";
import UsersTab from "./LeftSideTabs.jsx/UsersTab";
import ProfileTab from "./LeftSideTabs.jsx/ProfileTab";
import BookMarkTab from "./LeftSideTabs.jsx/BookMarkTab";
import SettingTab from "./LeftSideTabs.jsx/SettingTab";
import ArchiveTab from "./LeftSideTabs.jsx/ArchiveTab";
import { ChatContext } from "../context/ChatContext";
import ContactsTab from "./LeftSideTabs.jsx/ContactsTab";
import { AppContext } from "../context/AppContext";
import assets from "../assets/assets";
import logo from "../assets/images/login/logo-01.png";
const LeftTab = () => {
  const [activeTab, setActiveTab] = React.useState(2);
  const { archivedUsers } = useContext(ChatContext);
  const { authUser, logout } = useContext(AppContext);
  const [profileBox, setProfileBox] = useState(false);
  const tabs = [
    { id: 1, icon: CircleUser, title: "Porfile" },
    { id: 2, icon: MessagesSquare, title: "Chats" },
    { id: 3, icon: Users, title: "Contacts" },
    { id: 4, icon: BookmarkCheck, title: "Bookmark" },
    { id: 5, icon: Archive, title: "Archive" },
    { id: 6, icon: Settings, title: "Settings" },
  ];
  const profileDropDown = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(event.target)
      ) {
        setProfileBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex flex-row">
      {/* Left sidebar */}
      <div className=" h-screen flex flex-col justify-between items-center py-6 w-[70px] border-r-[1px]">
        {/* Top icons */}
        <div className="flex flex-col gap-4 w-full">
          {/* App Icon */}
          <div className="flex justify-center items-center">
            <img src={logo} className=" w-12 brightness-125" />
          </div>

          {/* Navigation Tabs */}
          {tabs.map(({ id, icon: Icon, title }) => (
            <div
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex justify-center items-center 2xl:py-2 cursor-pointer relative transition group`}
            >
              <div
                id={Icon}
                className={`absolute left-0 h-full w-1 rounded-r-md transition-all duration-300 ${
                  activeTab === id ? "bg-green-400" : "bg-transparent"
                }`}
              />
              <div className="absolute top-4 -right-16 rounded-lg bg-black p-1 w-20 text-center hidden group-hover:block transition-all group-hover:duration-200 text-white z-50">
                {title}
              </div>
              <Icon
                size={26}
                className={`m-2 transition-all duration-200 ${
                  activeTab === id
                    ? "text-green-400"
                    : "text-[#878a92] group-hover:text-green-300"
                }`}
              />
              {id === 5 && archivedUsers.length > 0 && (
                <span
                  className={`absolute ${
                    activeTab === id
                      ? "text-green-400"
                      : "text-[#878a92] group-hover:text-green-300"
                  } right-3 bottom-2 text-sm`}
                >
                  {archivedUsers.length}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom icons */}
        <div className="flex flex-col items-center gap-4 ">
          <div
            className={`flex justify-center items-center 2xl:py-2 cursor-pointer relative transition group`}
          >
            <Sun
              className="text-[#878a92] m-2 hover:text-yellow-300 transition"
              size={26}
            />
            <div className="absolute top-4 -right-24 rounded-lg bg-black p-1 w-24 text-center hidden  group-hover:block transition-all group-hover:duration-200 text-white z-50">
              Appearence
            </div>
          </div>
          <div
            className="relative py-2 cursor-pointer"
            onClick={() => setProfileBox(!profileBox)}
          >
            <img
              src={authUser?.profilePic || assets.avatar_icon}
              className="rounded-full w-8 h-8"
            />
            {profileBox && (
              <div
                ref={profileDropDown}
                className="absolute  bottom-12 z-50  bg-[#ffffff] rounded-[8px] shadow-lg border border-gray-200"
              >
                <ul>
                  <li
                    onClick={() => setActiveTab(1)}
                    className="flex text-gray-500 hover:text-green-400 justify-between gap-4 py-1 m-1 text-[16px] px-4 items-center  cursor-pointer"
                  >
                    <span>Profile</span>
                    <span className="">
                      <CircleUser size={20} />
                    </span>{" "}
                  </li>
                  <li
                    onClick={() => setActiveTab(6)}
                    className="flex text-gray-500 hover:text-green-400 justify-between gap-4 py-1 m-1 text-[16px] px-4 items-center  cursor-pointer"
                  >
                    <span>Settings</span>
                    <span className="">
                      <Settings size={20} />
                    </span>{" "}
                  </li>
                  <li
                    onClick={() => logout()}
                    className="flex text-gray-500 hover:text-green-400 justify-between gap-4 py-1.5 m-1 text-[16px] px-4 items-center border-t-[1px] border-green-600/15 cursor-pointer"
                  >
                    <span>Loagout</span>
                    <span className="">
                      <LogOut size={20} />
                    </span>{" "}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right section (tabs content) */}
      <div className="flex-1">
        {activeTab === 1 && <ProfileTab />}
        {activeTab === 2 && <UsersTab />}
        {activeTab === 3 && <ContactsTab />}
        {activeTab === 4 && <BookMarkTab />}
        {activeTab === 5 && <ArchiveTab />}
        {activeTab === 6 && <SettingTab />}
      </div>
    </div>
  );
};

export default LeftTab;
