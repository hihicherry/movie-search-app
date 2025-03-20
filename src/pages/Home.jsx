import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
				const popularmovies = await getPopularMovies();
				setMovies(popularmovies);
			} catch (err) {
                console.log(err);
                setError("Failed to load movies");
			} finally {
				setLoading(false);
			}
        }
        loadPopularMovies();
    },[]);

    const handleSearch = async (e) =>{
        e.preventDefault();
        if(!searchQuery.trim()) return 
        if(loading) return

        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }
        catch(err){
            console.log(err);
            setError("failed to search movies...");
        }
        finally{
            setLoading(false);
        }
        
        setSearchQuery("");
    };

    return (
		<div className="home">
			<form className="search-form" onSubmit={handleSearch}>
				<input
					className="search-input"
					type="text"
					placeholder="Search for movies..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button className="search-btn" type="submit">
					Search
				</button>
			</form>

            {error && <div className="error-message">{error}</div> }
			{loading ? (
				<div className="loading">Loading</div>
			) : (
				<div className="movies-grid">
					{movies.map((movie) => (
						<MovieCard movie={movie} key={movie.id} />
					))}
				</div>
			)}
		</div>
	);
}

export default Home