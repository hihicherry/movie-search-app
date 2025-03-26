import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/DetailPage.css";

const APIKEY = "29c03fd685daf100af0e688cdd6a3315";
const BASE_URL = "https://api.themoviedb.org/3";

const DetailPage = () => {
	const { id, mediaType } = useParams(); //從路徑取得類型 (movie/tv) 和 id
	const [data, setData] = useState(null);
	const [cast, setCast] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	//匯入加入最愛功能
	const { addToFavorites, removeFromFavorites, isFavorites } =
		useMovieContext();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}/${mediaType}/${id}?api_key=${APIKEY}&language=zh-TW`
				);
				const json = await res.json();
				setData(json);
			} catch (err) {
				console.error(err);
				setError("詳細資訊讀取失敗");
			} finally {
				setLoading(false);
			}
		};

		const fetchCast = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}/${mediaType}/${id}/credits?api_key=${APIKEY}&language=zh-TW`
				);
				const json = await res.json();
				setCast(json.cast.slice(0, 5));
			} catch (err) {
				console.error(err);
				setError("獲取演員資訊失敗");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		fetchCast();
	}, [id, mediaType]);

	// 設定是否為最愛
	const handleFavoriteClick = () => {
		if (isFavorites(data.id, mediaType)) {
			removeFromFavorites(data.id, mediaType); // 移除最愛
		} else {
			addToFavorites(data, mediaType); // 新增最愛
		}
	};

	if (loading) return <p>載入中...</p>;
	if (!data) return <p>查無此內容</p>;
	if (error) return <p>{error}</p>;

	return (
		<motion.div
			className="detail-page"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="detail-title">{data.title || data.name}</h1>
			<img
				className="detail-poster"
				src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
				alt={data.title || data.name}
			/>

			<div className="detail-content">
				<h2>主要演員：</h2>
				<ul className="detail-castlist">
					{cast.map((actor) => (
						<li key={actor.id}>
							{actor.name} - {actor.character}
						</li>
					))}
				</ul>

				<h2>內容簡介：</h2>
				<p>{data.overview || "無簡介"}</p>

				<p>
					<strong>🎬 類型：</strong>{" "}
					{data.genres?.map((genre) => (
						<span key={genre.id}>{genre.name} </span>
					))}
				</p>
				<p>
					<strong>⭐ 評分：</strong> {data.vote_average}
				</p>

				{mediaType === "movie" && (
					<p>
						<strong>📅 上映日期： </strong>
						<span>
							{data.release_date
								? `${data.release_date.split("-")[0]}年${
										data.release_date.split("-")[1]
								  }月${data.release_date.split("-")[2]}日`
								: "無資料"}
						</span>
					</p>
				)}

				{mediaType === "tv" && (
					<>
						<p>
							<strong>📅 首播日期：</strong>
							<span>
								{data.first_air_date
									? `${data.first_air_date.split("-")[0]}年${
											data.first_air_date.split("-")[1]
									  }月${data.first_air_date.split("-")[2]}日`
									: "無資料"}
							</span>
						</p>
						<p>
							<strong>📺 季數：</strong> {data.number_of_seasons}{" "}
							季
						</p>
						<p>
							<strong>📺 集數：</strong> {data.number_of_episodes}{" "}
							集
						</p>
					</>
				)}
			</div>

			<div className="detail-buttons">
				<button
					className={`detail-favorite-btn ${
						isFavorites(data.id, mediaType) ? "active" : ""
					}`}
					onClick={handleFavoriteClick}
				>
					{isFavorites(data.id, mediaType)
						? "♡ 從我的最愛移除"
						: "♥ 加入我的最愛"}
				</button>
				<button onClick={() => navigate(-1)} className="back-btn">
					返回
				</button>
			</div>
		</motion.div>
	);
};

export default DetailPage;
