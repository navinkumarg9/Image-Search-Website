import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';

export const connectDB = async () => {
  if (!MONGO_URI) throw new Error('MONGO_URI not set');
  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected');
};
