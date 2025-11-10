import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import assets from "../../assets/assets";
import { X } from "lucide-react";
const ProfileTab = () => {
  const {authUser} = useContext(AppContext)
  return (
     <div className=" w-full bg-white h-screen overflow-y-auto flex flex-col py-4 border-r border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-green-600 text-xl font-semibold">My Profile</h2>
      </div>
      <div className="relative w-full h-52 sm:h-64 bg-gray-200">
          {/* Background Image (Replace with a dynamic image if available) */}
          <img
            src={authUser?.profilePic || assets.avatar_icon} // Assuming coverPhoto exists or use a default
            className="w-full h-full object-cover bg-white"
            alt="cover"
          />

          {/* Close Button (X) */}
          <button
            // onClick={() => setOpenProfileUser(!openProfileUser)}
            className="absolute top-4 left-4 p-2 rounded-full cursor-pointer hover:bg-black/10 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Name and Active Status Overlay */}
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-xl font-bold text-white">
              {authUser?.fullName || "Tonia Clay"}
            </h2>
            <div className="flex items-center gap-1 mt-1">
              <span
                className={`w-2 h-2 rounded-full 
                 bg-green-500
                `}
              ></span>
              <span className="text-sm text-white/90">
                Active
              </span>
            </div>
          </div>
        </div>
    

      {/* Chat list */}

      <div className="flex flex-col">
        
      </div>
    </div>
  );
};

export default ProfileTab;
