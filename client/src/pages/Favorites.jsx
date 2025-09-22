import { useEffect, useState } from 'react';
import ImageGrid from '../components/ImageGrid.jsx';
import { getFavorites, removeFavorite, trackDownload } from '../api.js';

export default function Favorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getFavorites().then(setItems);
  }, []);

  const toggleFav = async (item) => {
    await removeFavorite(item.imageId);
    setItems(items.filter(i => i.imageId !== item.imageId));
  };

  const doDownload = async (item) => {
    await trackDownload(item);
    const a = document.createElement('a');
    a.href = item.url;
    a.download = `${item.imageId}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main className="container">
      <h2>Favorites</h2>
      {items.length===0 ? <p className="empty">No favorites yet.</p> :
        <ImageGrid items={items} favorites={items} onFavToggle={toggleFav} onDownload={doDownload} />
      }
    </main>
  );
}
