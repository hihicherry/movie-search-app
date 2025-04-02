import { Link } from "react-router-dom";

function NavBar() {
	return (
		<nav className="bg-navbar-gradient p-4 md:px-6 flex justify-between items-center shadow-[0_5px_5px_-5px_#414040] h-[50px] font-navbar text-white">
			<div className="text-2xl font-bold">
				<Link className="hover:text-white" to="/movie-search-app/">
					MovieSearch
				</Link>
			</div>
			<div className="flex gap-2">
				<Link
					className="text-text-light text-base px-4 py-2 rounded hover:text-[#645a89] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#645a89] after:transition-all after:duration-300 hover:after:w-full"
					to="/movie-search-app/"
				>
					Home
				</Link>
				<Link
					className="text-text-light text-base px-4 py-2 rounded hover:text-[#645a89] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#645a89] after:transition-all after:duration-300 hover:after:w-full"
					to="/movie-search-app/favorites"
				>
					Favorites
				</Link>
			</div>
		</nav>
	);
}

export default NavBar;
