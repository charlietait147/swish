import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadsDir = path.join(__dirname, '../../uploads'); // Adjust the path if needed
      cb(null, uploadsDir); // Set the destination
    },
    filename: (req, file, cb) => { // Set the file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique name for the file
      cb(null, uniqueSuffix + '-' + file.originalname); // Append the original name
    }
});

const upload = multer({ storage: storage});

export default upload;