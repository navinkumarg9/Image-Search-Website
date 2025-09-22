export default function ImageCard({ item, isFav, onFavToggle, onDownload }) {
  const { thumb, author } = item;
  return (
    <div className="card">
      <img src={thumb} alt={author || 'image'} loading="lazy" />
      <div className="card-actions">
        <button className={`heart ${isFav?'active':''}`} title="Add to favorites" onClick={onFavToggle}>
          ♥
        </button>
        <button className="btn" onClick={onDownload}>Download</button>
      </div>
      {author && <div className="meta">by {author}</div>}
    </div>
  );
}
