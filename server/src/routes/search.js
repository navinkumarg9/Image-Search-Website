import express from 'express';
import axios from 'axios';
import { UNSPLASH_ACCESS_KEY } from '../config.js';

const router = express.Router();

// GET /search?q=cats&page=1&per_page=24
router.get('/', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ results: [] });
    if (!UNSPLASH_ACCESS_KEY) return res.status(500).json({ error: 'Missing UNSPLASH_ACCESS_KEY' });
    const page = Number(req.query.page || 1);
    const per_page = Number(req.query.per_page || 24);
    const resp = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: q, page, per_page },
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
    });
    const results = (resp.data.results || []).map((r) => ({
      imageId: r.id,
      url: r.urls.full,
      thumb: r.urls.small,
      author: r.user && r.user.name,
      source: 'unsplash'
    }));
    res.json({ results });
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
