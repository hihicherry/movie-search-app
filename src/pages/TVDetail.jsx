
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/TVDetail.css";
import { motion } from "framer-motion";

const APIKEY = "29c03fd685daf100af0e688cdd6a3315";
const BASE_URL = "https://api.themoviedb.org/3";

const TVDetail = () => {
	const { id } = useParams();
	const [tvshow, setTVShows] = useState(null);
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
		const fetchTVShow = async () => {
			try {
				const response = await fetch(
					`${BASE_URL}/tv/${id}?api_key=${APIKEY}&language=zh-TW`
				);
				const data = await response.json();
				setTVShows(data);
			} catch (err) {
				console.log(err);
				setError("電視劇詳細資訊讀取失敗");
			} finally {
				setLoading(false);
			}
		};

		//獲取電視劇分類
		const fetchTVShowGenres = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}/tv/${id}/list?api_key=${APIKEY}&language=zh-TW`
				);
				const data = await res.json();
				setGenres(data.genres);
			} catch (err) {
				console.error(err);
				setError("查詢電視劇種類失敗");
			} finally {
				setLoading(false);
			}
		};

		fetchTVShow();
		fetchTVShowGenres();
	}, [id]);

	if (loading) return <p>載入中...</p>;
	if (!tvshow) return <p>查無此電影</p>;
	if (error) return <p>{error}</p>;

	return (
		<motion.div
			className="tv-detail"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="tv-detail-title">{tvshow.title}</h1>
			<img
				className="tv-detail-poster"
				src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
				alt={tvshow.name}
			/>
			<div className="tv-detail-content">
				<h2>簡介：</h2>
				<p>{tvshow.overview}</p>
				<p>
					<strong>📺 類型：</strong>
					{tvshow.genres.map((genre) => (
						<span key={genre.id}> {genre.name} </span>
					))}
				</p>
				<p>
					<strong>⭐ 評分： </strong>
					<span>{tvshow.vote_average}</span>
				</p>
				<p>
					<strong>📅 首播日： </strong>
					<span>
						{tvshow.release_date
							? `${tvshow.release_date.split("-")[0]}年${
									tvshow.release_date.split("-")[1]
							  }月${tvshow.release_date.split("-")[2]}日`
							: "無資料"}
					</span>
				</p>
			</div>
			<div className="tv-detail-buttons">
				<button
					className={`tv-detail-favorite ${
						isFavorites(tvshow.id) ? "active" : ""
					}`}
					onClick={() => {
						if (isFavorites(tvshow.id)) {
							removeFromFavorites(tvshow.id);
						} else {
							addToFavorites(tvshow);
						}
					}}
				>
					{isFavorites(tvshow.id)
						? "♡ 從我的最愛移除"
						: "♥ 加入我的最愛"}
				</button>
				<button
					onClick={() => navigate(-1)}
					className="tv-detail-back"
				>
					返回
				</button>
			</div>
		</motion.div>
	);
};

export default TVDetail;