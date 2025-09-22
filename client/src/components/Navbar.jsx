import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { logout } = useAuth();
  const location = useLocation();
  return (
    <header className="navbar">
      <h1 className="title">Image Search Website</h1>
      <nav className="nav">
        <Link className={`btn ${location.pathname==='/'?'active':''}`} to="/">Home</Link>
        <Link className={`btn ${location.pathname==='/favorites'?'active':''}`} to="/favorites">Favorites</Link>
        <Link className={`btn ${location.pathname==='/downloads'?'active':''}`} to="/downloads">Downloads</Link>
        <button className="btn outline" onClick={logout}>Logout</button>
      </nav>
    </header>
  );
}
