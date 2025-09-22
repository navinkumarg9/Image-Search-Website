import { useState } from 'react';

export default function SearchBar({ onSearch, initialQuery='' }) {
  const [q, setQ] = useState(initialQuery);
  return (
    <div className="searchbar">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search images..." />
      <button className="btn" onClick={()=>onSearch(q)}>Search</button>
    </div>
  );
}
