/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
import { AppContext } from "../context/AppContext";
import {
  X, // For the close button
  MessageSquare,
  Heart,
  MoreHorizontal,
  FileText,
  Images,
  Headphones,
  Link,
  MapPin,
  Archive,
  BellOff,  CircleUserRound,
  Mail,
  History,
  SquarePen,
} from "lucide-react";
import noData from "../assets/icons/no_data.png";
import toast from "react-hot-toast";
import useFormatDate from "../hooks/useFormatDate";

const SenderProfleTab = () => {
  // Added onClose prop for the X button
  const { selectedUser, messages, toggleArchiveUser, isUserArchived } =
    useContext(ChatContext);
  const { onlineUsers, setOpenProfileUser, openProfileUser } =
    useContext(AppContext); // Removed 'logout' as it's not needed in this layout
  const [activeTab, setActiveTab] = React.useState(1);
  const isUserOnline = onlineUsers.includes(selectedUser?._id);
  const [showOptions, setShowOptions] = useState(false);
  const [msgImages, setMsgImages] = useState([]);
  const optionref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionref.current && !optionref.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);
  return (
    openProfileUser && (
      <div
        // Match the clean, white background look of the reference image
        className={` z-20 overflow-y-auto h-screen relative 
                shadow-2xl border-l 
                transition-all duration-300`}
      >
        {/* Profile Header Image and Info */}
        <div className="relative w-full h-52 sm:h-64 ">
          {/* Background Image (Replace with a dynamic image if available) */}
          <img
            src={selectedUser?.profilePic || assets.avatar_icon} // Assuming coverPhoto exists or use a default
            className="w-full h-full object-cover "
            alt="cover"
          />

          {/* Close Button (X) */}
          <button
            onClick={() => setOpenProfileUser(!openProfileUser)}
            className="absolute top-4 left-4 p-2 rounded-full cursor-pointer hover:bg-black/10 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Name and Active Status Overlay */}
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-xl font-bold ">
              {selectedUser?.fullName || "Tonia Clay"}
            </h2>

            <div className="flex items-center gap-1 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  isUserOnline ? "bg-green-500" : ""
                }`}
              ></span>
              <span className="text-sm text-white/90">
                {isUserOnline ? "Active" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* --- Action Buttons (Message, Favourite, Audio, Video, More) --- */}
        <div className="flex justify-around py-5 border-b ">
          {/* Replicated action buttons */}

          <div className="flex flex-col items-center gap-1 cursor-pointer  hover:text-green-400 transition">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-semibold">Message</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer  hover:text-green-400 transition">
            <Heart className="w-5 h-5" />
            <span className="text-xs font-semibold">Favourite</span>
          </div>
          <div className="flex flex-col items-center gap-1 relative cursor-pointer ">
            <MoreHorizontal
              className="w-5 h-5"
              onClick={() => setShowOptions(!showOptions)}
            />
            <span className="text-xs font-semibold">More</span>
            {showOptions && (
              <div
                ref={optionref}
                className="z-50 absolute top-full right-0 mt-3 p-3 rounded-lg bg-base-100 shadow-lg border-[1px] w-36"
              >
                <ul className="flex flex-col gap-2 px-2 text-sm">
                  <li
                    onClick={() => {
                      toggleArchiveUser(selectedUser._id);
                      setShowOptions(!showOptions);
                      if (isUserArchived(selectedUser._id)) {
                        toast.success("Contact Unarchived");
                      } else {
                        toast.success("Contact archived");
                      }
                    }}
                    className="flex justify-between items-center cursor-pointer  hover:text-green-400 transition"
                  >
                    <span>
                      {" "}
                      {isUserArchived(selectedUser._id)
                        ? "Unarchive"
                        : "Archive"}
                    </span>
                    <Archive size={18} />
                  </li>
                  <li className="flex justify-between items-center cursor-pointer  hover:text-green-400 transition">
                    <span>Mute</span>
                    <BellOff size={18} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* --- Content Sections --- */}
        <div className="p-5 space-y-6 flex-1 overflow-y-auto">
          {/* STATUS */}
          <div>
            <h3 className="text-lg font-semibold   mb-2">About</h3>
            <p className="text-sm leading-relaxed">
              {selectedUser?.bio || "Hey there! I am using Synk"}
            </p>
             <div className="mt-2">
          <h3 className="text-lg font-semibold  mb-4">
            Contact Info
          </h3>
          <p className="flex flex-row gap-4 items-center mb-2 ">
            <span>
              <CircleUserRound size={20} />
            </span>
            <span>{selectedUser?.fullName || "Tony Stark"}</span>
          </p>
          <a
            href={`mailto:${selectedUser?.email}`}
            className="flex flex-row gap-4 items-center mb-2 "
          >
            <span>
              <Mail size={20} />
            </span>
            <span>{selectedUser?.email || "Tony Stark"}</span>
          </a>
          <p className="flex flex-row gap-4 items-center mb-2 ">
            <span>
              <History size={20} />
            </span>
            <span>{useFormatDate(selectedUser?.createdAt) || "Tony Stark"}</span>
          </p>
          <p className="flex flex-row gap-4 items-center mb-2 ">
            <span className="">
              <SquarePen size={20} />
            </span>
            <span>{useFormatDate(selectedUser?.updatedAt) || "--_--_--"}</span>
          </p>
        </div>
          </div>
          {/* INFO */}
          <div className="flex justify-around py-3 border-b ">
            {/* Replicated action buttons */}
            {[
              { icon: Images, label: "Photos" },
              { icon: FileText, label: "Document" },
              { icon: Headphones, label: "Audio" },
              { icon: Link, label: "Link" },
              { icon: MapPin, label: "Locaion" },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index + 1)}
                className={`flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === index + 1 ? "text-green-400" : ""
                }  hover:text-green-400 transition`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          <div>
            {activeTab === 1 && (
              <div className="w-full p-1">
                {msgImages.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {msgImages.map((url, index) => (
                      <img
                        src={url}
                        alt="url"
                        className="rounded-lg"
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2">
                    <img src={noData} alt="no data" className="w-16" />
                    <p className=" text-lg">No Images Shared</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 2 && (
              <div className="w-full p-1">
                {msgImages.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {msgImages.map((url, index) => (
                      <img
                        src={url}
                        alt="url"
                        className="rounded-lg"
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2">
                    <img src={noData} alt="no data" className="w-16" />
                    <p className=" text-lg">No Documents Shared</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 3 && (
              <div className="w-full p-1">
                {msgImages.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {msgImages.map((url, index) => (
                      <img
                        src={url}
                        alt="url"
                        className="rounded-lg"
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2">
                    <img src={noData} alt="no data" className="w-16" />
                    <p className=" text-lg">No Audio Shared</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 4 && (
              <div className="w-full p-1">
                {msgImages.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {msgImages.map((url, index) => (
                      <img
                        src={url}
                        alt="url"
                        className="rounded-lg"
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2">
                    <img src={noData} alt="no data" className="w-16" />
                    <p className=" text-lg">No Link Shared</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 5 && (
              <div className="w-full p-1">
                {msgImages.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {msgImages.map((url, index) => (
                      <img
                        src={url}
                        alt="url"
                        className="rounded-lg"
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2">
                    <img src={noData} alt="no data" className="w-16" />
                    <p className=" text-lg">No Location Shared</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SenderProfleTab;
