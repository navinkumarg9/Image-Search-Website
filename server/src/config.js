import 'dotenv/config';

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL || '*';
export const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
