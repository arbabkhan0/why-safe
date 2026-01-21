const express = require('express');
const router = express.Router();
const multer = require('multer');
const qrDecoder = require('../services/qrDecoder');

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/scan-qr', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const result = await qrDecoder.decodeQr(req.file.buffer);
  
  if (result.error) {
    return res.status(400).json(result);
  }
  
  res.json(result);
});

module.exports = router;
