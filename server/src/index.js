import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';
import { PORT, CLIENT_URL } from './config.js';
import authRoutes from './routes/auth.js';
import searchRoutes from './routes/search.js';
import favRoutes from './routes/favorites.js';
import dlRoutes from './routes/downloads.js';

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (_req, res) => res.send('API OK'));

app.use('/auth', authRoutes);
app.use('/search', searchRoutes);
app.use('/favorites', favRoutes);
app.use('/downloads', dlRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error' });
});

connectDB()
  .then(() => app.listen(PORT, () => console.log(`🚀 Server listening on :${PORT}`)))
  .catch((e) => {
    console.error('DB connection failed', e);
    process.exit(1);
  });
