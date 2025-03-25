import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import TVDetail from "./pages/TVDetail"; 
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
	return (
		<MovieProvider>
			<NavBar />
			<main className="main-content">
				<Routes>
					<Route path="/movie-search-app/" element={<Home />}></Route>
					<Route
						path="/movie-search-app/favorites"
						element={<Favorites />}
					></Route>
					<Route
						path="/movie-search-app/movie/:id"
						element={<MovieDetail />}
					></Route>
					<Route
						path="/movie-search-app/tv/:id"
						element={<TVDetail />}
					></Route>
				</Routes>
			</main>
		</MovieProvider>
	);
}

export default App;
