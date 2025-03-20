import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({movie}){
 const {addToFavorites, removeFromFavorites, isFavorites} = useMovieContext();
 const favorite = isFavorites(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if(favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }


    return (
		<div className="movie-card">
			<div className="movie-poster">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>
				<div className="movie-overlay">
					<button
						className={`favorite-btn ${favorite ? "active" : ""}`}
						onClick={onFavoriteClick}
					>
						♥
					</button>
				</div>
			</div>
			<div className="movie-info">
				<h3>{movie.title}</h3>
				<p>{movie.release_date}</p>
				<Link className="movie-link" to={`/movie/${movie.id}`}>
					more info
				</Link>
			</div>
		</div>
	);
}

export default MovieCard