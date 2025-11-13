import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CloseIcon from "@mui/icons-material/Close";
import { X } from "lucide-react"
import toast from "react-hot-toast";
const ImagePreviewDialog = ({ open, imageUrl, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  if (!open || !imageUrl) return null;
  // 👉 download function
  const handleDownload = async () => {
    try {
      // 1. Fetch the image data
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // 2. Create a local URL for the Blob
      const blobUrl = URL.createObjectURL(blob);

      // 3. Create the anchor tag and set properties
      const link = document.createElement("a");
      link.href = blobUrl;

      // Use the file extension from the URL if possible, otherwise use a default
      const filenameMatch = imageUrl.split("/").pop();
      link.download = filenameMatch || "chat-image.jpg";
      toast.success("Download started!");

      // 4. Programmatically click the link
      document.body.appendChild(link);
      link.click();

      // 5. Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl); // Important for memory management

    } catch (error) {
      console.error("Error downloading image:", error);
      // You can add a toast notification here if the download fails
      // toast.error("Failed to download image.");
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "bg-base-100 shadow-xl border border-base-300 rounded-xl",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b  bg-base-100 bg-base border border-base-300 text-base-content ">
        <X size={24} className="cursor-pointer" onClick={onClose} />
      </div>
      {/* Image */}
      <DialogContent className="flex justify-center items-center bg-base-100">
        <img
          src={imageUrl} crossOrigin="anonymous"
          alt="preview"
          className="max-h-[60vh] w-auto rounded-lg object-contain pointer-events-none"
        />
      </DialogContent>
      {/* Actions */}
      <div className="flex justify-center gap-3 items-center w-full bg-base-100 p-4">
        <button onClick={handleDownload} className="btn btn-outline btn-lg bg-base border border-base-300 text-base-content hover:bg-base-200">
          <DownloadIcon /> Download
        </button>
        <button className="btn btn-outline btn-lg bg-base border border-base-300 text-base-content hover:bg-base-200">
          <BookmarkBorderIcon /> Bookmark
        </button>
      </div>
    </Dialog>
  );
};

export default ImagePreviewDialog;
