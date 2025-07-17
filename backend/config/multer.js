import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Check if we're running on Vercel
const isVercel = !!process.env.VERCEL;

// Use /tmp/uploads for Vercel; use local uploads otherwise
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

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

export default upload;
