import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const isVercel = !!process.env.VERCEL;
const uploadDir = isVercel
  ? '/tmp/uploads'
  : path.resolve(process.cwd(), 'uploads');

try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`✅ Upload directory created at: ${uploadDir}`);
  }
} catch (err) {
  console.error(`❌ Failed to create upload directory: ${err}`);
  throw err;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

export default upload;
