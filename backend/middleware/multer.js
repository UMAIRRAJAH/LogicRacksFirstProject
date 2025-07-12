import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads';

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ dest: 'uploads/' }); // or multer.diskStorage if needed


export default upload;
