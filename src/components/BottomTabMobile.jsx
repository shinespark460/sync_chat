import React, { useContext } from "react";

import {
  MessageSquareText,
  CircleUser,
  MessagesSquare,
  Settings,
  BookmarkCheck,
  Sun,
  Users,
  Archive,
} from "lucide-react";
import UsersTab from "./LeftSideTabs.jsx/UsersTab";
import ProfileTab from "./LeftSideTabs.jsx/ProfileTab";
import BookMarkTab from "./LeftSideTabs.jsx/BookMarkTab";
import SettingTab from "./LeftSideTabs.jsx/SettingTab";
import { ChatContext } from "../context/ChatContext";
import ArchiveTab from "./LeftSideTabs.jsx/ArchiveTab";
import ContactsTab from "./LeftSideTabs.jsx/ContactsTab";
import { AppContext } from "../context/AppContext";
import assets from "../assets/assets";
const BottomTabMobile = () => {
  const [activeTab, setActiveTab] = React.useState(2);
  const { archivedUsers } = useContext(ChatContext);
  const {authUser} = useContext(AppContext)
  const tabs = [
  
    { id: 2, icon: MessagesSquare },
    { id: 3, icon: Users },
    { id: 4, icon: BookmarkCheck },
    { id: 5, icon: Archive },
    { id: 6, icon: Settings },
  ];
  return (
    <>
      <div className="flex justify-between px-4 items-center bottom-0 fixed z-50  w-full bg-[#2e2e2e]">
        <div
          
            onClick={() => setActiveTab(1)}
            className={`flex justify-center items-center py-2 cursor-pointer relative transition group`}
          >
            <div
          
              className={`absolute bottom-0 h-1 w-full rounded-t-md transition-all duration-300 ${
                activeTab === 1 ? "bg-green-400" : "bg-transparent"
              }`}
            />
           <img
              src={authUser?.profilePic || assets.avatar_icon}
              className="rounded-full w-8 h-8"
            />
         
        
          </div>
        {tabs.map(({ id, icon: Icon }) => (
          <div
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex justify-center items-center py-2 cursor-pointer relative transition group`}
          >
            <div
              id={Icon}
              className={`absolute bottom-0 h-1 w-full rounded-t-md transition-all duration-300 ${
                activeTab === id ? "bg-green-400" : "bg-transparent"
              }`}
            />
            <Icon
              size={28}
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
                } right-0 bottom-2 text-sm`}
              >
                {archivedUsers.length}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* <div className=" w-full py-10 top-0 bg-red-500"></div> */}
      <div className="">
        {activeTab === 1 && <ProfileTab />}
        {activeTab === 2 && <UsersTab />}
        {activeTab === 3 && <ContactsTab />}
        {activeTab === 4 && <BookMarkTab />}
        {activeTab === 5 && <ArchiveTab />}
        {activeTab === 6 && <SettingTab />}
      </div>
    </>
  );
};

export default BottomTabMobile;
