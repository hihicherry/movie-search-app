import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
	return (
		<MovieProvider>
			<NavBar />
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/favorites" element={<Favorites />}></Route>
					<Route path="/movie/:id" element={<MovieDetail />}></Route>
				</Routes>
			</main>
		</MovieProvider>
	);
}

export default App;
