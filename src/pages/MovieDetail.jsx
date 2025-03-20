import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext, MovieProvider } from "../contexts/MovieContext";

const MovieDetail = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
	
    const { addToFavorites, removeFromFavorites, isFavorite } =
			useMovieContext();

    useEffect(() => {
        const fetchMovie = async() => {
            try{
                const response = await fetch(
					`https://api.themoviedb.org/3/movie/${id}?api_key=29c03fd685daf100af0e688cdd6a3315`);
                 const data = await response.json();
				 setMovie(data);
            }catch(err){
                console.log(err);
                setError("Failed to fetch movie details");
            }finally{
                setLoading(false);
            }
        };
        fetchMovie();
    },[id]);

    if(loading) return <p>loading...</p>
    if(!movie) return <p>Can't find the movie</p>
    if (error) return <p>{error}</p>;

    return (
		<div className="movie-detail">
			<h1 className="movie-title">{movie.title}</h1>
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
			<p>{movie.overview}</p>
			<p>
				<strong>Release Date: </strong>
				{movie.release_date}
			</p>
			<p>
				<strong>Rate: </strong> ⭐
			 {movie.vote_average}</p>
		</div>
	);

};

export default MovieDetail