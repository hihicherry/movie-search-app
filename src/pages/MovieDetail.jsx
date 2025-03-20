import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetail.css";
import { motion } from "framer-motion";

const MovieDetail = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
	
    const { addToFavorites, removeFromFavorites, isFavorite } =
			useMovieContext();

    const navigate = useNavigate();

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
		<motion.div
			className="movie-detail"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="movie-title">{movie.title}</h1>
			<img
				className="movie-poster"
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
			<div className="movie-content">
				<p>{movie.overview}</p>
				<p>
					<strong>Release Date: </strong>
					{movie.release_date}
				</p>
				<p>
					<strong>Rate: </strong> ⭐{movie.vote_average}
				</p>
			</div>
			<button onClick={() => navigate(-1)} className="movie-back">
				Back
			</button>
		</motion.div>
	);

};

export default MovieDetail