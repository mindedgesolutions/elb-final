import multer from "multer";
import { fileTypeFromBuffer } from "file-type";

// Use memory storage to access file buffer
const storage = multer.memoryStorage(); // Use memory storage to access file buffer

const fileFilter = async (req, file, cb) => {
  const validMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];

  try {
    if (!file) {
      console.error("File buffer is missing");
      return cb(new Error("File buffer is missing"), false);
    }

    // Check MIME type from buffer
    const type = await validMimeTypes.includes(file.mimetype);

    if (type) {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Invalid file type"), false); // Reject file
    }
  } catch (error) {
    cb(error, false); // Handle errors
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 500 * 1024 }, // Limit file size to 5 MB
});

export default upload;
