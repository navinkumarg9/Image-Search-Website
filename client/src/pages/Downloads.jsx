import { useEffect, useState } from 'react';
import { getDownloads, trackDownload } from '../api.js';
import ImageGrid from '../components/ImageGrid.jsx';

export default function Downloads() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getDownloads().then(setItems);
  }, []);

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
      <h2>Downloads</h2>
      {items.length===0 ? <p className="empty">No downloads yet.</p> :
        <ImageGrid items={items} favorites={[]} onFavToggle={()=>{}} onDownload={doDownload} />
      }
    </main>
  );
}
