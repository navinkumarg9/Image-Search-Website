import ImageCard from './ImageCard.jsx';

export default function ImageGrid({ items, onFavToggle, favorites, onDownload }) {
  return (
    <div className="grid">
      {items.map(item => (
        <ImageCard
          key={item.imageId}
          item={item}
          isFav={!!favorites?.find(f=>f.imageId===item.imageId)}
          onFavToggle={()=>onFavToggle(item)}
          onDownload={()=>onDownload(item)}
        />
      ))}
    </div>
  );
}
