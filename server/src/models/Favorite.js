import mongoose from 'mongoose';
const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  imageId: { type: String, required: true },
  url: String,
  thumb: String,
  author: String,
  source: { type: String, default: 'unsplash' },
}, { timestamps: true });
FavoriteSchema.index({ userId: 1, imageId: 1 }, { unique: true });
export default mongoose.model('Favorite', FavoriteSchema);
