import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import bgImage from "../../assets/images/chatBox/bg_img.jpg";
import assets from "../../assets/assets";
import {
  CircleUserRound,
  Mail,
  History,
  SquarePen,
  FileText,
  Images,
  Headphones,
  Link,
  MapPin,
} from "lucide-react";

import useFormatDate from "../../hooks/useFormatDate";
import ImagePreviewDialog from "../../lib/ImageModel";
import noData from "../../assets/icons/no_data.png";
const ProfileTab = () => {
  const { authUser } = useContext(AppContext);
  // State to track if the dialog is open and which image URL to display
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [activeTab, setActiveTab] = React.useState(1);
  const [msgImages, setMsgImages] = useState([]);
  // Function that will be called on image click
  const openImageDialog = (url) => {
    setSelectedImageUrl(url); // Set the URL of the clicked image
    setDialogOpen(true); // Open the dialog
    setMsgImages([]);
  };

  // Function to close the dialog
  const closeImageDialog = () => {
    setDialogOpen(false);
    setSelectedImageUrl(null); // Optional: clear the URL when closing
  };

  return (
    <div className="w-full h-screen  overflow-y-auto flex flex-col md:border-r lg:pb-0 pb-20">
      {/* Header Section */}
      <div className="relative w-full h-40 2xl:h-56 shrink-0">
        <img
          src={authUser?.backgroundPic || bgImage}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* Overlay Title */}
        <div
          onClick={() => openImageDialog(authUser?.backgroundPic || bgImage)}
          className="absolute top-0 cursor-pointer left-0 w-full h-full flex items-start justify-between px-4 py-3"
        >
          <h2 className="text-base-500 text-xl font-semibold tracking-wide drop-shadow">
            My Profile
          </h2>
        </div>

        {/* Profile Picture */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-32 h-32 rounded-full border-4  shadow-md overflow-hidden  cursor-pointer">
            <img
              src={authUser?.profilePic || assets.avatar_icon}
              alt="profile"
              className="w-full h-full object-cover"
              onClick={() =>
                openImageDialog(authUser?.profilePic || assets.avatar_icon)
              }
            />
          </div>
        </div>
      </div>

      {/* User Info (Static - Not Scrollable) */}
      <div className="mt-20 flex flex-col items-center px-4 text-center shrink-0 border-b  pb-4">
        <h2 className="text-2xl font-semibold ">
          {authUser?.fullName.split(" ")[0] || "Tonia Clay"}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm">Active now</span>
        </div>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 lg:overflow-y-auto 2xl:px-6 px-4 mt-3 pb-10">
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-sm t leading-relaxed">
          {authUser?.bio || "Hey there! I am using Synk"}
        </p>

        <div className="mt-2">
          <h3 className="text-lg font-semibold  mb-4">
            Contact Info
          </h3>
          <p className="flex flex-row gap-4 items-center mb-2 ">
            <span>
              <CircleUserRound size={20} />
            </span>
            <span>{authUser?.fullName || "Tony Stark"}</span>
          </p>
          <a
            href={`mailto:${authUser?.email}`}
            className="flex flex-row gap-4 items-center mb-2 "
          >
            <span>
              <Mail size={20} />
            </span>
            <span>{authUser?.email || "Tony Stark"}</span>
          </a>
          <p className="flex flex-row gap-4 items-center mb-2 ">
            <span>
              <History size={20} />
            </span>
            <span>{useFormatDate(authUser?.createdAt) || "Tony Stark"}</span>
          </p>
          <p className="flex flex-row gap-4 items-center mb-2 ">
            <span className="">
              <SquarePen size={20} />
            </span>
            <span>{useFormatDate(authUser?.updatedAt) || "--_--_--"}</span>
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold  mb-2">
            Bookmarks
          </h3>
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
                  activeTab === index + 1 ? "text-base-1000" : "text-[#878a92]"
                }  hover:text-green-400 transition`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
          <div>
            {activeTab === 1 && (
              <div className="w-full py-1">
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
      <ImagePreviewDialog
        open={dialogOpen}
        imageUrl={selectedImageUrl}
        onClose={closeImageDialog}
      />
    </div>
  );
};

export default ProfileTab;
