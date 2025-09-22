import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import ImageGrid from '../components/ImageGrid.jsx';
import { addFavorite, removeFavorite, searchImages, trackDownload, getFavorites } from '../api.js';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(()=>{
    getFavorites().then(setFavorites).catch(()=>{});
  },[]);

  const doSearch = async (q) => {
    setQuery(q);
    const data = await searchImages(q);
    setResults(data);
  };

  const toggleFav = async (item) => {
    const isFav = favorites.some(f=>f.imageId===item.imageId);
    if (isFav) {
      await removeFavorite(item.imageId);
      setFavorites(favorites.filter(f=>f.imageId!==item.imageId));
    } else {
      const created = await addFavorite(item);
      setFavorites([created, ...favorites]);
    }
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
      <div className="top-center">
        <h2>Image Search Website</h2>
      </div>
      <SearchBar onSearch={doSearch} initialQuery={query} />
      {results.length===0 ? <p className="empty">Search to see images.</p> :
        <ImageGrid items={results} favorites={favorites} onFavToggle={toggleFav} onDownload={doDownload} />
      }
    </main>
  );
}
