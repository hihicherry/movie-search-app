import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link className="navbar-name" to="/">Movie Search App</Link>
        </div>
        <div className="navbar-links">
            <Link className="navbar-link" to="/">Home</Link>
            <Link className="navbar-link" to="/favorites">Favorites</Link>
        </div>
    </nav>
}

export default NavBar;