import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CloseIcon from "@mui/icons-material/Close";

// Renamed and refactored to be a dialog-only component
const ImagePreviewDialog = ({ open, imageUrl, onClose }) => {
  const theme = useTheme();
  // Determine if the dialog should be full-screen on smaller devices
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Guard clause: Don't render if not open or no imageUrl
  if (!open || !imageUrl) return null;

  // 👉 download function
  const handleDownload = () => {
    const link = document.createElement("a");
    // Use the provided imageUrl
    link.href = imageUrl;
    // Attempt to derive filename from URL or use a fallback
    link.download = imageUrl.split("/").pop() || "chat-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 👉 bookmark placeholder (connect to backend later)
  const handleBookmark = () => {
    console.log("Bookmarked:", imageUrl);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose} // Use the provided onClose handler
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: fullScreen ? 0 : 8,
        },
      }}
    >
      {/* Header */}
      <div className="flex justify-between bg-base-100 items-center p-3 border-b ">
        <IconButton onClick={onClose}>
          <CloseIcon className="" />
        </IconButton>
      </div>

      {/* Image Content */}
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bg-base-100"
      >
        <img
          src={imageUrl}
          alt="preview"
          className="max-h-[80vh] w-auto rounded-lg object-contain pointer-events-none"
        />
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p:"0"
        }}
        className=" border-t-[1px]"
      >
        <div className="flex justify-center gap-3 items-center w-full bg-base-100 p-2">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className=" border-[1px] p-2 cursor-pointer"
          >
            <DownloadIcon /> Download
          </button>
          {/* Bookmark Button */}
          <button
            variant="outlined"
            onClick={handleBookmark}
            className="border-[1px] p-2 cursor-pointer"
          >
            <BookmarkBorderIcon /> Bookmark
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePreviewDialog;
