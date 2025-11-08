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
import ArchiveTab from "./LeftSideTabs.jsx/ArchiveTab";
import { ChatContext } from "../context/ChatContext";

const LeftTab = () => {
  const [activeTab, setActiveTab] = React.useState(2);
  const { archivedUsers } = useContext(ChatContext);
  const tabs = [
    { id: 1, icon: CircleUser },
    { id: 2, icon: MessagesSquare },
    { id: 3, icon: Users },
    { id: 4, icon: BookmarkCheck },
    { id: 5, icon: Archive },
    { id: 6, icon: Settings },
  ];

  return (
    <div className="flex flex-row">
      {/* Left sidebar */}
      <div className="bg-[#2e2e2e] h-screen flex flex-col justify-between items-center py-6 w-[70px]">
        {/* Top icons */}
        <div className="flex flex-col gap-4 w-full">
          {/* App Icon */}
          <div className="flex justify-center items-center">
            <MessageSquareText className="text-green-400" size={26} />
          </div>

          {/* Navigation Tabs */}
          {tabs.map(({ id, icon: Icon }) => (
            <div
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex justify-center items-center py-2 cursor-pointer relative transition group`}
            >
              <div
                id={Icon}
                className={`absolute left-0 h-full w-1 rounded-r-md transition-all duration-300 ${
                  activeTab === id ? "bg-green-400" : "bg-transparent"
                }`}
              />
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
        <div className="flex flex-col items-center gap-4">
          <Sun
            className="text-[#878a92] hover:text-yellow-300 transition"
            size={24}
          />
          <MessageSquareText className="text-white" size={24} />
        </div>
      </div>

      {/* Right section (tabs content) */}
      <div className="flex-1">
        {activeTab === 1 && <ProfileTab />}
        {activeTab === 2 && <UsersTab />}
        {activeTab === 4 && <BookMarkTab />}
        {activeTab === 5 && <ArchiveTab />}
        {activeTab === 6 && <SettingTab />}
      </div>
    </div>
  );
};

export default LeftTab;
