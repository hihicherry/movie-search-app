import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({item, mediaType}){
	const { addToFavorites, removeFromFavorites, isFavorites } =
		useMovieContext();
	const favorite = isFavorites(item.id, mediaType);

	function onFavoriteClick(e) {
		e.preventDefault();
		if (favorite) {
			removeFromFavorites(item.id, mediaType);
		}
		else {
			addToFavorites(item, mediaType);
		}
	}

	const title = mediaType === "movie" ? item.title : item.name; 
	const releaseDate =
		mediaType === "movie" ? item.release_date : item.first_air_date; 

	return (
		<div className="movie-card">
			<div className="movie-poster">
				<img
					src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
					alt={title}
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
				<h3>{title}</h3>
				<p>{releaseDate ? releaseDate.slice(0, 4) : "未知"}</p>
				<Link
					className="movie-link"
					to={`/movie-search-app/${mediaType === "movie" ? "movie" : "tv"}/${item.id}`}
				>
					詳細資訊
				</Link>
			</div>
		</div>
	);
}

export default MovieCard