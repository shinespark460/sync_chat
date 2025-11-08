import React from "react";

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
const BottomTabMobile = () => {
  const [activeTab, setActiveTab] = React.useState(2);

  const tabs = [
    { id: 1, icon: CircleUser },
    { id: 2, icon: MessagesSquare },
    { id: 3, icon: Users },
    { id: 4, icon: BookmarkCheck },
    { id: 5, icon: Archive },
    { id: 6, icon: Settings },
  ];
  return (
    <div className="w-full h-screen relative">
      <div className="flex justify-between px-4 items-center bottom-0 absolute  w-full bg-[#2e2e2e]">
        {tabs.map(({ id, icon: Icon }) => (
          <div
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex justify-center items-center py-2 cursor-pointer relative transition group`}
          >
            <div
              id={Icon}
              className={`absolute bottom-0 h-1 w-full rounded-r-md transition-all duration-300 ${
                activeTab === id ? "bg-green-400" : "bg-transparent"
              }`}
            />
            <Icon
              size={24}
              className={`m-2 transition-all duration-200 ${
                activeTab === id
                  ? "text-green-400"
                  : "text-[#878a92] group-hover:text-green-300"
              }`}
            />
          </div>
        ))}
      </div>
      {/* <div className=" w-full py-10 top-0 bg-red-500"></div> */}
      <div className="">
        {activeTab === 1 && <ProfileTab />}
        {activeTab === 2 && <UsersTab />}
        {activeTab === 4 && <BookMarkTab />}
        {activeTab === 6 && <SettingTab />}
      </div>
    </div>
  );
};

export default BottomTabMobile;
