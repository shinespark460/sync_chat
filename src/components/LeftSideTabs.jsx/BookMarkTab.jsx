import React, { useEffect, useState } from "react";
import {
  X, // For the close button
  FileText,
  Images,
  Headphones,
  Link,
  MapPin,
} from "lucide-react";
import noData from "../../assets/icons/no_data.png";
import ImagePreviewDialog from "../../lib/ImageModel";
import { ChatContext } from "../../context/ChatContext";
const BookMarkTab = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const [msgImages, setMsgImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bookmarkedFiles");
    if (stored) {
      try {
        setMsgImages(JSON.parse(stored));
      } catch {
        setMsgImages([]);
      }
    }
  }, []);
   
    

  // Function that will be called on image click
  const openImageDialog = (url) => {
    setSelectedImageUrl(url); // Set the URL of the clicked image
    setDialogOpen(true); // Open the dialog
  };

  // Function to close the dialog
  const closeImageDialog = () => {
    setDialogOpen(false);
    setSelectedImageUrl(null); // Optional: clear the URL when closing
  };
  return (
    <div className="  h-screen overflow-y-auto flex flex-col py-4 md:border-r ">
      <div className=" w-full  h-screen overflow-y-auto flex flex-col pb-16 ">
        {/* Header */}
        <div className="flex justify-between items-center px-4 mb-8">
          <h2 className="text-base-600 text-xl font-semibold">Bookmark</h2>
        </div>
        {/* Search Bar */}

        <div>
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
                  activeTab === index + 1 ? "text-green-400" : "text-gray-500"
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
                {msgImages?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 p-2">
                    {msgImages.map((url, index) => (
                      <div
                        key={index}
                        onClick={() => openImageDialog(url)}
                        className="overflow-hidden rounded-xl cursor-pointer bg-base-100 shadow-sm hover:shadow-md duration-200"
                      >
                        <img
                          src={url}
                          alt="bookmark"
                          className="w-full h-48 object-cover rounded-xl hover:scale-105 duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2 py-10">
                    <img
                      src={noData}
                      alt="no data"
                      className="w-16 opacity-70"
                    />
                    <p className="text-gray-500 text-lg font-medium">
                      No Images Shared
                    </p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 2 && (
              <div className="w-full p-1">
                {msgImages.length > 1000 ? (
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
                    <p className="text-gray-600 text-lg">No Documents Shared</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 3 && (
              <div className="w-full p-1">
                {msgImages.length > 1000 ? (
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
                    <p className="text-gray-600 text-lg">No Audio Shared</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 4 && (
              <div className="w-full p-1">
                {msgImages.length > 1000 ? (
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
                    <p className="text-gray-600 text-lg">No Link Shared</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 5 && (
              <div className="w-full p-1">
                {msgImages.length > 1000 ? (
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
                    <p className="text-gray-600 text-lg">No Location Shared</p>
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

export default BookMarkTab;
