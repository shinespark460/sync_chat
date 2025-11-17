import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import bgImage from "../../assets/images/chatBox/bg_img.jpg";
import assets from "../../assets/assets";
import ThemeToggle from "../ThemeChnage";
import {
  CircleUserRound,
  ChevronDown,
  ChevronUp,
  Contrast,
  Lock,
  Pencil,
  Save,
  MessageCircleQuestionMark,
  X,LogOut
} from "lucide-react";
import { CircularProgress } from "@mui/material";
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file || !(file instanceof File)) return resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const SettingTab = () => {
  const { authUser, updateProfile, loadingUpdate, logout } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    profilePic: authUser?.profilePic || assets.avatar_icon,
    backgroundPic: authUser?.backgroundPic || bgImage,
  });
  // State to hold the actual FILE OBJECTS selected by the user
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [backgroundPicFile, setBackgroundPicFile] = useState(null);

  // State for toggling accordion sections
  const [open, setOpen] = useState({
    personal: false, // Set to true by default for better UX on a settings tab
    themes: false,
    account: false,
    help: false,
  });

  // handle text change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle image file change
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // 1. Update formData for UI preview with the temporary URL
      setFormData((prev) => ({ ...prev, [field]: imageUrl }));

      // 2. Store the actual File object separately for base64 conversion on submit
      if (field === "profilePic") {
        setProfilePicFile(file);
      } else if (field === "backgroundPic") {
        setBackgroundPicFile(file);
      }
    } else {
      // Clear the file object if the user cancels selection
      if (field === "profilePic") {
        setProfilePicFile(null);
      } else if (field === "backgroundPic") {
        setBackgroundPicFile(null);
      }
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // If the user clicks "Save" (while in edit mode), the form handleSubmit will be called.
      // If you need a Cancel/Discard logic, you would implement it here or via a dedicated button.
    }
    setIsEditing((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;
    try {
      const base64ProfilePic = await fileToBase64(profilePicFile);
      const base64BackgroundPic = await fileToBase64(backgroundPicFile);
      const updateData = {
        fullName: formData.fullName,
        bio: formData.bio,
      };
      if (base64ProfilePic) updateData.profilePic = base64ProfilePic;
      if (base64BackgroundPic) updateData.backgroundPic = base64BackgroundPic;
      await updateProfile(updateData);
      setProfilePicFile(null);
      setBackgroundPicFile(null);
      setIsEditing(false);
    } catch (error) {
      console.error(" Error updating profile:", error);
    }
  };
  const resetData = () => {
    setProfilePicFile(null);
    setBackgroundPicFile(null);
    setIsEditing(false);
    setFormData({
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
      profilePic: authUser?.profilePic || assets.avatar_icon,
      backgroundPic: authUser?.backgroundPic || bgImage,
    });
  };
  return (
    <div className="w-full h-screen overflow-y-auto  flex flex-col md:border-r ">
      {/* Header Section */}
      <div className="relative w-full h-40 2xl:h-56  shrink-0">
        <img
          src={formData.backgroundPic || authUser?.backgroundPic || bgImage}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* Overlay Title */}
        <div className="absolute top-0 cursor-pointer left-0 w-full h-full bg-black/30 flex items-start justify-between px-4 py-3">
          <h2 className="text-base-500 text-xl font-semibold tracking-wide drop-shadow">
            Settings
          </h2>
        </div>

        {/* Profile Picture */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-32 h-32 rounded-full border-4  shadow-md overflow-hidden  ">
            <img
              src={
                formData.profilePic ||
                authUser?.profilePic ||
                assets.avatar_icon
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* User Info (Static - Not Scrollable) */}
      <div className="mt-20 flex flex-col items-center px-4 text-center shrink-0 pb-4">
        <h2 className="text-2xl font-semibold ">
          {authUser?.fullName || "Tonia Clay"}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm ">Active now</span>
        </div>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 lg:overflow-y-auto pb-10">
        <div className="mt-2">
          {/* 1️⃣ Personal Info */}
          <div className="border-b   px-4">
            <button
              onClick={() => {
                setOpen({ ...open, personal: !open.personal });
              }}
              className="w-full flex items-center justify-between cursor-pointer py-4 text-left  transition-all duration-200"
            >
              <h3 className="font-medium  flex flex-row items-center gap-2">
                <span>
                  <CircleUserRound size={20} />
                </span>{" "}
                Personal Info
              </h3>
              {open.personal ? (
                <ChevronUp className=" transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-base-300 transition-transform duration-300" />
              )}
            </button>
          </div>
          <div
            className={`transition-all relative duration-200 z-0 ease-in-out 
            
            ${
              open.personal ? " opacity-100 py-3 block" : "h-0 hidden opacity-0"
            }
            `}
          >
            <form onSubmit={handleSubmit} className="relative py-6 px-3">
              {loadingUpdate && (
                <div className="top-0 left-0 w-full h-full bg-[#ffffffa8] absolute flex justify-center flex-col items-center  z-50">
                  <CircularProgress color="success" />
                  <p className="text-[#4eac6d] text-xl font-bold">
                    Updating Details....
                  </p>
                </div>
              )}
              {/* Header */}
              <div className="flex flex-row justify-between items-center mb-5">
                <div
                  // Use type="submit" when in editing mode, and type="button" otherwise
                  type={isEditing ? "submit" : "button"}
                  onClick={isEditing ? handleSubmit : handleEditToggle}
                  className="flex items-center cursor-pointer gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all duration-200
            hover:scale-105 shadow-md  font-medium"
                >
                  {isEditing ? (
                    <>
                      <Save size={16} /> Save
                    </>
                  ) : (
                    <>
                      <Pencil size={16} /> Edit
                    </>
                  )}
                </div>
                {isEditing && (
                  <div
                    onClick={resetData}
                    className="bg-linear-to-r cursor-pointer flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 border hover:scale-105 shadow-md font-medium"
                  >
                    <X size={16} /> Cancel
                  </div>
                )}
              </div>
              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div className="flex flex-col border-b pb-1">
                  <label className="text-sm font-medium  mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full py-2 px-3 rounded-lg outline-none transition-all duration-200 ${
                      isEditing
                        ? "border border-green-400/50 focus:ring-2 focus:ring-green-500"
                        : "border border-transparent cursor-default"
                    }`}
                  />
                </div>

                {/* Profile Pic */}
                <div className="flex flex-col border-b pb-1">
                  <label className="text-sm font-medium  mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={!isEditing}
                    onChange={(e) => handleImageChange(e, "profilePic")}
                    // Clear the file input if not in edit mode (optional reset, but good for cleanliness)
                    // key={isEditing ? "editing" : "not-editing"}
                    className="file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm
                         file:bg-green-600 hover:file:text-white hover:file:bg-green-700 cursor-pointer text-sm"
                  />
                </div>

                {/* Cover Image */}
                <div className="flex flex-col border-b pb-1">
                  <label className="text-sm font-medium mb-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={!isEditing}
                    onChange={(e) => handleImageChange(e, "backgroundPic")}
                    // key={isEditing ? "editing" : "not-editing"}
                    className="file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm  file:bg-green-600  hover:file:bg-green-700 hover:file:text-white cursor-pointer text-sm"
                  />
                </div>

                {/* Bio */}
                <div className="flex flex-col border-b pb-1">
                  <label className="text-sm font-medium  mb-1">Bio</label>
                  <textarea
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full py-1 px-3 rounded-lg outline-none transition-all duration-200 resize-none ${
                      isEditing
                        ? "border border-green-400/50 focus:ring-2 focus:ring-green-500"
                        : "border border-transparent cursor-default"
                    }`}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 2️⃣ Themes */}
        <div className="border-b  px-4">
          <button
            onClick={() => setOpen({ ...open, themes: !open.themes })}
            className="w-full flex items-center justify-between cursor-pointer py-4 text-left  transition-all"
          >
            <h3 className="font-medium  flex flex-row items-center gap-2">
              <span>
                <Contrast size={20} />
              </span>{" "}
              Themes
            </h3>
            {open.themes ? (
              <ChevronUp className=" transition-transform duration-300" />
            ) : (
              <ChevronDown className="text-base-300 transition-transform duration-300" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              open.themes ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
            }`}
          >
            <ThemeToggle />
          </div>
        </div>

        {/* 3️⃣ Account */}
        <div className="border-b  px-4">
          <button
            onClick={() => setOpen({ ...open, account: !open.account })}
            className="w-full flex items-center justify-between py-4 cursor-pointer text-left  transition-all "
          >
            <h3 className="font-medium flex flex-row items-center gap-2">
              <span>
                <Lock size={20} />
              </span>{" "}
              Security
            </h3>
            {open.account ? (
              <ChevronUp className=" transition-transform duration-300" />
            ) : (
              <ChevronDown className="text-base-300 transition-transform duration-300" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              open.account ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
            }`}
          >
            <div
              onClick={() => logout()}
              className="flex  hover:text-green-400 justify-between gap-4 px-8 text-[16px] items-center  cursor-pointer"
            >
              <span className="font-bold">Loagout</span>
              <span className="">
                <LogOut size={24} />
              </span>{" "}
            </div>
          </div>
        </div>

        {/* 4️⃣ Help */}
        <div className="px-4">
          <button
            onClick={() => setOpen({ ...open, help: !open.help })}
            className="w-full flex items-center justify-between cursor-pointer  py-4 text-left transition-all"
          >
            <h3 className="font-medium flex flex-row items-center gap-2">
              <span>
                <MessageCircleQuestionMark size={20} />
              </span>{" "}
              Help
            </h3>
            {open.help ? (
              <ChevronUp className=" transition-transform duration-300" />
            ) : (
              <ChevronDown className="text-base-300 transition-transform duration-300" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              open.help ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm ">Find answers to FAQs.</p>
            <p className="text-sm">Contact our support team for more help.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingTab;
