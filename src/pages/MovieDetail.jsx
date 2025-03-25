import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetail.css";
import { motion } from "framer-motion";

const APIKEY = "29c03fd685daf100af0e688cdd6a3315";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [cast, setCast] = useState([]);
	const [genres, setGenres] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	//匯入加入最愛功能
	const { addToFavorites, removeFromFavorites, isFavorites } =
		useMovieContext();

	useEffect(() => {
		//取得電影基本資訊
		const fetchMovie = async () => {
			try {
				const response = await fetch(
					`${BASE_URL}/movie/${id}?api_key=${APIKEY}&language=zh-TW`
				);
				const data = await response.json();
				setMovie(data);
			} catch (err) {
				console.log(err);
				setError("電影詳細資訊讀取失敗");
			} finally {
				setLoading(false);
			}
		};

		//獲取演員資訊
		const fetchMovieCast = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}/movie/${id}/credits?api_key=${APIKEY}&language=zh-TW`
				);
				const data = await res.json();
				setCast(data.cast.slice(0, 5)); // 只取前5名主要演員
			} catch (err) {
				console.error(err);
				setError("獲取演員資訊失敗");
			} finally {
				setLoading(false);
			}
		};

		//獲取電影分類
		const fetchMovieGenres = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}/movie/${id}/list?api_key=${APIKEY}&language=zh-TW`
				);
				const data = await res.json();
				setGenres(data.genres);
			} catch (err) {
				console.error(err);
				setError("查詢電影種類失敗");
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
		fetchMovieCast();
		fetchMovieGenres();
	}, [id]);

	if (loading) return <p>載入中...</p>;
	if (!movie) return <p>查無此電影</p>;
	if (error) return <p>{error}</p>;

	return (
		<motion.div
			className="movie-detail"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="movie-detail-title">{movie.title}</h1>
			<img
				className="movie-detail-poster"
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
			<div className="movie-detail-content">
				<h2>
					<strong>主要演員：</strong>
				</h2>
				<ul className="movie-detail-castlist">
					{cast.map((actor) => (
						<li key={actor.id}>
							{actor.name} - {actor.character}
						</li>
					))}
				</ul>
				<h2>電影簡介：</h2>
				<p>{movie.overview}</p>
				<p>
					<strong>🎬 類型：</strong>
					{movie.genres.map((genre) => (
						<span key={genre.id}> {genre.name} </span>
					))}
				</p>
				<p>
					<strong>⭐ 評分： </strong>
					<span>{movie.vote_average}</span>
				</p>
				<p>
					<strong>📅 上映日期： </strong>
					<span>
						{movie.release_date
							? `${movie.release_date.split("-")[0]}年${
									movie.release_date.split("-")[1]
							  }月${movie.release_date.split("-")[2]}日`
							: "無資料"}
					</span>
				</p>
			</div>
			<div className="movie-detail-buttons">
				<button
					className={`movie-detail-favorite ${
						isFavorites(movie.id) ? "active" : ""
					}`}
					onClick={() => {
						if (isFavorites(movie.id)) {
							removeFromFavorites(movie.id);
						} else {
							addToFavorites(movie);
						}
					}}
				>
					{isFavorites(movie.id)
						? "♡ 從我的最愛移除"
						: "♥ 加入我的最愛"}
				</button>
				<button
					onClick={() => navigate(-1)}
					className="movie-detail-back"
				>
					返回
				</button>
			</div>
		</motion.div>
	);
};

export default MovieDetail