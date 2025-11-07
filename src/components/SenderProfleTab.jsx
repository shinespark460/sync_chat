import React, { useContext } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
import { AppContext } from "../context/AppContext";
import {
  X, // For the close button
  MessageSquare,
  Heart,
  Mic,
  Video,
  MoreHorizontal,
} from "lucide-react";

const SenderProfleTab = () => {
  // Added onClose prop for the X button
  const { selectedUser } = useContext(ChatContext);
  const { onlineUsers, setOpenProfileUser, openProfileUser } =
    useContext(AppContext); // Removed 'logout' as it's not needed in this layout

  // Mock data based on the image structure
  const mockInfo = {
    name: selectedUser?.fullName || "Tonia Clay",
    email: "adc@123.com", // Placeholder
    location: "California, USA", // Placeholder
    status: "If several languages coalesce, the grammar of the resulting.", // Placeholder
    groups: ["Landing Design", "Design Phase 2"], // Placeholder
  };

  const isUserOnline = onlineUsers.includes(selectedUser?._id);

  return (
    selectedUser && (
      <div
        // Match the clean, white background look of the reference image
        className={`bg-white text-gray-800 z-20 overflow-y-auto h-screen relative 
                shadow-2xl border-l border-gray-200 
                transition-all duration-300`}
      >
        {/* Profile Header Image and Info */}
        <div className="relative w-full h-52 sm:h-64 bg-gray-200">
          {/* Background Image (Replace with a dynamic image if available) */}
          <img
            src={selectedUser.profilePic || assets.avatar_icon} // Assuming coverPhoto exists or use a default
            className="w-full h-full object-cover bg-white"
            alt="cover"
          />

          {/* Close Button (X) */}
          <button
            onClick={() => setOpenProfileUser(!openProfileUser)}
            className="absolute top-4 left-4 p-2 rounded-full cursor-pointer hover:bg-black/60 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Name and Active Status Overlay */}
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-xl font-bold text-white">
              {selectedUser?.fullName || "Tonia Clay"}
            </h2>
            <div className="flex items-center gap-1 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  isUserOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              <span className="text-sm text-white/90">
                {isUserOnline ? "Active" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* --- Action Buttons (Message, Favourite, Audio, Video, More) --- */}
        <div className="flex justify-around py-5 border-b border-gray-100">
          {/* Replicated action buttons */}
          {[
            { icon: MessageSquare, label: "MESSAGE" },
            { icon: Heart, label: "FAVOURITE" },
            { icon: Mic, label: "AUDIO" },
            { icon: Video, label: "VIDEO" },
            { icon: MoreHorizontal, label: "MORE" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-indigo-600 transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{item.label}</span>
            </div>
          ))}
        </div>

        {/* --- Content Sections --- */}
        <div className="p-5 space-y-6">
          {/* STATUS */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-500 mb-2">
              STATUS
            </h3>
            <p className="text-sm text-gray-700">
              {selectedUser?.bio || mockInfo.status}
            </p>
          </div>

          {/* INFO */}
          <div>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Name</p>
                <p className="text-gray-700">{mockInfo.name}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Email</p>
                <p className="text-gray-700">{selectedUser?.email}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Location</p>
                <p className="text-gray-700">{mockInfo.location}</p>
              </div>
            </div>
          </div>

          {/* GROUP IN COMMON */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-500 mb-2">
              GROUP IN COMMON
            </h3>
            <div className="space-y-1">
              {mockInfo.groups.map((group, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-700 flex items-center gap-2"
                >
                  <span className="text-indigo-500 font-extrabold">#</span>
                  {group}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SenderProfleTab;
