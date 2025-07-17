import express from 'express';
import fs from 'fs';
import { upload } from '../utils/upload.js';
import cloudinary from '../utils/cloudinary.js'; // ✅ use the initialized version

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileStream = fs.createReadStream(filePath);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      fileStream.pipe(stream);
    });

    fs.unlinkSync(filePath); // Delete local temp file
    res.json({ success: true, url: result.secure_url });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

export default router;
