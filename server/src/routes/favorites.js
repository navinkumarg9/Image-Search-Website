import express from 'express';
import Favorite from '../models/Favorite.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const items = await Favorite.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ items });
});

router.post('/', auth, async (req, res) => {
  const { imageId, url, thumb, author, source } = req.body;
  if (!imageId) return res.status(400).json({ error: 'imageId required' });
  try {
    const fav = await Favorite.create({ userId: req.user.id, imageId, url, thumb, author, source });
    res.status(201).json({ item: fav });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'Already in favorites' });
    console.error(e);
    res.status(500).json({ error: 'Could not add favorite' });
  }
});

router.delete('/:imageId', auth, async (req, res) => {
  const { imageId } = req.params;
  await Favorite.deleteOne({ userId: req.user.id, imageId });
  res.json({ ok: true });
});

export default router;
