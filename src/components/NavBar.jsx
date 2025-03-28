import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link className="navbar-name" to="/movie-search-app/">MovieSearch</Link>
        </div>
        <div className="navbar-links">
            <Link className="navbar-link" to="/movie-search-app/">Home</Link>
            <Link className="navbar-link" to="/movie-search-app/favorites">Favorites</Link>
        </div>
    </nav>
}

export default NavBar;