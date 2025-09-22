import mongoose from 'mongoose';
const DownloadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  imageId: { type: String, required: true },
  url: String,
  thumb: String,
  author: String,
  source: { type: String, default: 'unsplash' },
  count: { type: Number, default: 1 },
  lastDownloadedAt: { type: Date, default: Date.now }
}, { timestamps: true });
DownloadSchema.index({ userId: 1, imageId: 1 }, { unique: true });
export default mongoose.model('Download', DownloadSchema);
