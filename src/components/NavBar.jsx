import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link className="navbar-name" to="/movie-search-app/">MovieSearch</Link>
        </div>
        <div className="navbar-links">
            <Link className="navbar-link" to="/movie-search-app/">首頁</Link>
            <Link className="navbar-link" to="/movie-search-app/favorites">我的最愛</Link>
        </div>
    </nav>
}

export default NavBar;