import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import bgImage from "../../assets/images/chatBox/bg_img.jpg";
import assets from "../../assets/assets";
import {
  CircleUserRound,
  Mail,
  History,
  SquarePen,
  ChevronDown,
  ChevronUp,
  Contrast,
  Lock,
  MessageCircleQuestionMark,
} from "lucide-react";
const SettingTab = () => {
  const { authUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    bio: authUser?.bio || "",
    profilePic: authUser?.profilePic || "",
    backgroundPic: authUser?.backgroundPic || "",
  })
  // State to track if the dialog is open and which image URL to display
  // Function that will be called on image click

  const [open, setOpen] = useState({
    personal: false,
    themes: false,
    account: false,
    help: false,
  });
  return (
    <div className="w-full h-screen bg-white flex flex-col border-r border-gray-200">
      {/* Header Section */}
      <div className="relative w-full h-40 2xl:h-56  flex-shrink-0">
        <img
          src={authUser?.backgroundPic || bgImage}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* Overlay Title */}
        <div
        
          className="absolute top-0 cursor-pointer left-0 w-full h-full bg-black/20 flex items-start justify-between px-4 py-3"
        >
          <h2 className="text-white text-xl font-semibold tracking-wide drop-shadow">
            Settings
          </h2>
        </div>

        {/* Profile Picture */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 cursor-pointer">
            <img
              src={formData.profilePic || assets.avatar_icon}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* User Info (Static - Not Scrollable) */}
      <div className="mt-20 flex flex-col items-center px-4 text-center flex-shrink-0 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {authUser?.fullName.split(" ")[0] || "Tonia Clay"}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-600">Active now</span>
        </div>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto pb-10">

        <div className="mt-2">
          {/* 1️⃣ Personal Info */}
          <div className="border-b-[1px] border-[#8b8b8b94] px-4">
            <button
              onClick={() => setOpen({ ...open, personal: !open.personal })}
              className="w-full flex items-center justify-between  py-4 text-left  transition-all duration-200"
            >
              <h3 className="font-medium text-gray-800 flex flex-row items-center gap-2"><span><CircleUserRound size={20} /></span> Personal Info</h3>
              {open.personal ? (
                <ChevronUp className="text-green-600 transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-gray-500 transition-transform duration-300" />
              )}
            </button>
            <form
              className={`overflow-hidden transition-all duration-500 ease-in-out ${open.personal
                  ? "max-h-40 opacity-100 py-3"
                  : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-sm text-gray-600">
                Update your name, profile photo, or contact info.
              </p>
              <p className="text-sm text-gray-600">
                Change your display details easily here.
              </p>
            </form>
          </div>

          {/* 2️⃣ Themes */}
          <div className="border-b-[1px] border-[#8b8b8b94] px-4">
            <button
              onClick={() => setOpen({ ...open, themes: !open.themes })}
              className="w-full flex items-center justify-between  py-4 text-left  transition-all duration-200"
            >
              <h3 className="font-medium text-gray-800 flex flex-row items-center gap-2"><span><Contrast size={20} /></span> Themes</h3>
              {open.themes ? (
                <ChevronUp className="text-green-600 transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-gray-500 transition-transform duration-300" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${open.themes ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-sm text-gray-600">
                Switch between light, dark, or system themes.
              </p>
              <p className="text-sm text-gray-600">
                Personalize your chat look with custom colors.
              </p>
            </div>
          </div>

          {/* 3️⃣ Account */}
          <div className="border-b-[1px] border-[#8b8b8b94] px-4">
            <button
              onClick={() => setOpen({ ...open, account: !open.account })}
              className="w-full flex items-center justify-between py-4 text-left  transition-all duration-200"
            >
              <h3 className="font-medium text-gray-800 flex flex-row items-center gap-2"><span><Lock size={20} /></span> Security</h3>
              {open.account ? (
                <ChevronUp className=" transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-gray-500 transition-transform duration-300" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${open.account ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-sm text-gray-600">
                Manage login sessions, password, and privacy settings.
              </p>
              <p className="text-sm text-gray-600">
                Enable two-step verification for enhanced security.
              </p>
            </div>
          </div>

          {/* 4️⃣ Help */}
          <div className="px-4">
            <button
              onClick={() => setOpen({ ...open, help: !open.help })}
              className="w-full flex items-center justify-between  py-4 text-left transition-all duration-200"
            >
              <h3 className="font-medium text-gray-800 flex flex-row items-center gap-2"><span><MessageCircleQuestionMark size={20} /></span> Help</h3>
              {open.help ? (
                <ChevronUp className=" transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-gray-500 transition-transform duration-300" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${open.help ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-sm text-gray-600">Find answers to FAQs.</p>
              <p className="text-sm text-gray-600">
                Contact our support team for more help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingTab;
