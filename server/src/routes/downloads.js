import express from 'express';
import Download from '../models/Download.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const items = await Download.find({ userId: req.user.id }).sort({ updatedAt: -1 });
  res.json({ items });
});

router.post('/', auth, async (req, res) => {
  const { imageId, url, thumb, author, source } = req.body;
  if (!imageId) return res.status(400).json({ error: 'imageId required' });
  const now = new Date();
  const doc = await Download.findOneAndUpdate(
    { userId: req.user.id, imageId },
    { $setOnInsert: { url, thumb, author, source }, $inc: { count: 1 }, $set: { lastDownloadedAt: now } },
    { new: true, upsert: true }
  );
  res.status(201).json({ item: doc });
});

export default router;
