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
          backgroundColor: "#0b0b0f",
          color: "#fff",
          borderRadius: fullScreen ? 0 : 8,
        },
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b ">
        <h2 className="text-lg font-semibold ">Image Preview</h2>
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      </div>

      {/* Image Content */}
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         
        }}
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
          justifyContent: "center",
          gap: 2,
          py: 2,
          borderTop: "1px solid #222",
        }}
      >
        {/* Download Button */}
        <Button
          variant="contained"
          onClick={handleDownload}
          startIcon={<DownloadIcon />}
          sx={{
            backgroundColor: "",
            "&:hover": { backgroundColor: "#3e915b" },
          }}
        >
          Download
        </Button>

        {/* Bookmark Button */}
        <Button
          variant="outlined"
          onClick={handleBookmark}
          startIcon={<BookmarkBorderIcon />}
          sx={{
            borderColor: "",
            color: "",
            "&:hover": { borderColor: "#3e915b", color: "#3e915b" },
          }}
        >
          Bookmark
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePreviewDialog;
