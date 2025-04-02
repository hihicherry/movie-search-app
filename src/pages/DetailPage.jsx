import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMovieContext } from "../contexts/MovieContext";

const APIKEY = "29c03fd685daf100af0e688cdd6a3315";
const BASE_URL = "https://api.themoviedb.org/3";

const DetailPage = () => {
	const { id, mediaType } = useParams();
	const [data, setData] = useState(null);
	const [cast, setCast] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const { favorites, addToFavorites, removeFromFavorites, isFavorites } =
		useMovieContext();
	const [isFav, setIsFav] = useState(false);

	useEffect(() => {
		const isAlreadyFav = favorites.some(
			(item) => item.id === parseInt(id) && item.mediaType === mediaType
		);
		setIsFav(isAlreadyFav);
	}, [favorites, id, mediaType]);

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
			}
		};

		fetchData();
		fetchCast();
	}, [id, mediaType]);

	const handleFavoriteClick = (e) => {
		e.preventDefault();
		if (isFav) {
			removeFromFavorites(data.id, mediaType);
		} else {
			addToFavorites(data, mediaType);
		}
	};

	if (loading)
		return (
			<p className="text-center text-xl font-bold text-[#533670] animate-blink">
				載入中...
			</p>
		);
	if (!data)
		return <p className="text-center text-xl text-gray-500">查無此內容</p>;
	if (error)
		return <p className="text-center text-xl text-red-500">{error}</p>;

	return (
		<motion.div
			className="p-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="text-3xl font-bold text-navbar-start">
				{data.title || data.name}
			</h1>
			<img
				className="my-4 w-full"
				src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
				alt={data.title || data.name}
			/>
			<div
				className="flex-1 bg-card-gradient text-white rounded-xl p-4 shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
				style={{ backdropFilter: "blur(10px)" }}
			>
				<h2 className="text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
					主要演員：
				</h2>
				<ul className="mb-2 list-none">
					{cast.map((actor) => (
						<li key={actor.id} className="text-text-muted">
							{actor.name} - {actor.character}
						</li>
					))}
				</ul>
				<h2 className="text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
					內容簡介：
				</h2>
				<p className="mb-2 text-text-muted">
					{data.overview || "無簡介"}
				</p>
				<p className="mb-2 text-text-muted">
					<strong className="font-bold text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
						🎬 類型：
					</strong>{" "}
					{data.genres?.map((genre) => (
						<span key={genre.id}>{genre.name} </span>
					))}
				</p>
				<p className="mb-2 text-text-muted">
					<strong className="font-bold text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
						⭐ 評分：
					</strong>{" "}
					{data.vote_average}
				</p>
				{mediaType === "movie" && (
					<p className="mb-2 text-text-muted">
						<strong className="font-bold text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
							📅 上映日期：
						</strong>
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
						<p className="mb-2 text-text-muted">
							<strong className="font-bold text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
								📅 首播日期：
							</strong>
							<span>
								{data.first_air_date
									? `${data.first_air_date.split("-")[0]}年${
											data.first_air_date.split("-")[1]
									  }月${data.first_air_date.split("-")[2]}日`
									: "無資料"}
							</span>
						</p>
						<p className="mb-2 text-text-muted">
							<strong className="font-bold text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
								📺 季數：
							</strong>{" "}
							{data.number_of_seasons} 季
						</p>
						<p className="mb-2 text-text-muted">
							<strong className="font-bold text-[#F8D1FF] [text-shadow:2px_2px_4px_rgba(0,0,0,0.158)]">
								📺 集數：
							</strong>{" "}
							{data.number_of_episodes} 集
						</p>
					</>
				)}
			</div>
			<div className="flex gap-2 mt-2">
				<button
					className={`bg-favorite-btn text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-favorite-btn-hover ${
						isFav ? "bg-favorite-btn-active" : ""
					}`}
					onClick={handleFavoriteClick}
				>
					{isFav ? "♡ 從我的最愛移除" : "♥ 加入我的最愛"}
				</button>
				<button
					className="bg-back-btn text-text-light px-4 py-2 rounded-lg hover:bg-back-btn-hover"
					onClick={() => navigate(-1)}
				>
					返回
				</button>
			</div>
		</motion.div>
	);
};

export default DetailPage;
