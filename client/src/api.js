import axios from 'axios';

export async function searchImages(q, page = 1) {
  const { data } = await axios.get('/search', { params: { q, page } });
  return data.results;
}

export async function getFavorites() {
  const { data } = await axios.get('/favorites');
  return data.items;
}

export async function addFavorite(item) {
  const { data } = await axios.post('/favorites', item);
  return data.item;
}

export async function removeFavorite(imageId) {
  await axios.delete(`/favorites/${imageId}`);
}

export async function getDownloads() {
  const { data } = await axios.get('/downloads');
  return data.items;
}

export async function trackDownload(item) {
  const { data } = await axios.post('/downloads', item);
  return data.item;
}
