import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { useState, useEffect } from "react";
import { searchMovies, searchTVShows, getPopularMovies, getPopularTVShows } from "../services/api";
import "../css/Home.css";
import * as Select from "@radix-ui/react-select"; //下拉選單ui套件
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion"; //hover動畫套件


function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [items, setItems] = useState([]); // 儲存搜尋或熱門結果
	const [visibleMovies, setVisibleMovies] = useState([]); //控制載入動畫
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [mediaType, setMediaType] = useState("movie"); // 默認為電影

	useEffect(() => {
		const loadItems = async () => {
			try {
				setLoading(true);
				let fetchedItems;

				if (mediaType === "movie") {
					fetchedItems = await getPopularMovies();
				} else if (mediaType === "tv") {
					fetchedItems = await getPopularTVShows();
				}
				setItems(fetchedItems || []);
				setVisibleMovies([]); //先清空動畫狀態
				//依序顯示動畫
				if (mediaType === "movie") {
					fetchedItems.forEach((movie, index) => {
						setTimeout(() => {
							//控制動畫順序
							setVisibleMovies((prev) => [...prev, movie.id]);
						}, index * 150);
					});
				} else if (mediaType === "tv") {
					fetchedItems.forEach((tv, index) => {
						setTimeout(() => {
							//控制動畫順序
							setVisibleMovies((prev) => [...prev, tv.id]);
						}, index * 150);
					});
				}
			} catch (err) {
				console.log(err);
				setError("資料讀取失敗...");
			} finally {
				setLoading(false);
			}
		};
		loadItems();
	}, [mediaType]);

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return; //搜尋框未輸入資料則不進行搜尋
		if (loading) return; //若正在載入中則不能進行搜尋

		setLoading(true);
		try {
			let searchResults = [];
			if (mediaType === "movie") {
				searchResults = await searchMovies(searchQuery);
			} else if(mediaType === "tv") {
				searchResults = await searchTVShows(searchQuery);
			}
			setItems(Array.isArray(searchResults) ? searchResults : []);
			setError(null);
		} catch (err) {
			console.log(err);
			setError("查詢失敗...");
		} finally {
			setLoading(false);
		}

		setSearchQuery(""); //清空搜尋框
	};

    //媒體類型選擇 套用radix ui
	const MediaSelect = () => {
		return (
			<div className="media-select">
				<Select.Root
					value={mediaType || "movie"}
					onValueChange={setMediaType}
					aria-hidden={false}
				>
					<Select.Trigger className="select-trigger">
						<span className="select-label">
							{mediaType === "movie" ? "電影" : "電視劇"}
						</span>
						<Select.Icon className="select-icon">
							<ChevronDownIcon />
						</Select.Icon>
					</Select.Trigger>
					<Select.Content className="select-content">
						<Select.Item value="movie" className="select-item">
							<Select.ItemText>電影</Select.ItemText>
						</Select.Item>
						<Select.Item value="tv" className="select-item">
							<Select.ItemText>電視劇</Select.ItemText>
						</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		);
	};

	return (
		<div className="home">
			<form className="search-form" onSubmit={handleSearch}>
				<input
					className="search-input"
					type="text"
					placeholder="請輸入欲查詢的電影或電視劇名稱"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					aria-hidden="false"
				/>
				<div className="search-actions">
					<MediaSelect />
					<button className="search-btn" type="submit">
						查詢
					</button>
				</div>
			</form>

			{error && <div className="error-message">{error}</div>}
			{loading ? (
				<div className="movies-grid">
					{Array(6)
						.fill(0)
						.map((_, i) => (
							<SkeletonCard key={i} />
						))}
				</div>
			) : (
				<div className="movies-grid">
					{Array.isArray(items) && items.length > 0 ? (
						items.map((item) => (
							//用frame-motion的功能包住moviecard
							<motion.div
								key={item.id}
								initial={{ borderRadius: "8px" }} // 預設邊角大小
								whileHover={{
									scale: 1.05,
									boxShadow: "0px 5px 15px #4612a1",
									borderRadius: "10px",
									backgroundColor: "#7776B3",
									
								}}
								transition={{ duration: 0.3 }}
							>
								<MovieCard item={item} mediaType={mediaType} />
							</motion.div>
						))
					) : (
						<div className="no-results">沒有搜尋結果</div> // 當 items 為空時顯示提示訊息
					)}
				</div>
			)}
		</div>
	);
}

export default Home