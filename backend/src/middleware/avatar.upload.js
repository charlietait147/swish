import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const avatarsDir = path.join(__dirname, '../../uploads/avatars');

const allowedTypes = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(avatarsDir, { recursive: true }); // multer doesn't create the folder when destination is a function
      cb(null, avatarsDir);
    },
    filename: (req, file, cb) => { // Name the file after the user so it can't clash, extension from the mimetype
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${req.user._id}-${uniqueSuffix}${allowedTypes[file.mimetype]}`);
    }
});

const upload = multer({
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB limit
    },
    fileFilter: (req, file, cb) => {
      if (allowedTypes[file.mimetype]) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, PNG or WEBP images are allowed"));
      }
    },
  }).single('avatar');

// Wrap multer so file type / size errors come back as a 400 JSON response
const avatarUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: "Avatar must be 2MB or smaller" });
        }
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

export default avatarUpload;
