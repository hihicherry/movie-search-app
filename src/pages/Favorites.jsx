import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";

function Favorites() {
	const { favorites } = useMovieContext();

	if (favorites &&  favorites.length !== 0) {
		return (
			<div className="favorites">
				<h2>我的最愛</h2>
				<div className="movies-grid">
					{favorites.map((item) => (
						<motion.div
							key={item.id}
							initial={{ borderRadius: "8px" }} // 預設邊角大小
							whileHover={{
								scale: 1.05,
								boxShadow: "0px 10px 20px #000000",
								borderRadius: "10px",
								backgroundColor: "#7776B3",
							}}
							transition={{ duration: 0.3 }}
						>
							<MovieCard item={item} mediaType={item.mediaType} />
						</motion.div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<div className="favorites-empty">
				<h2>尚未新增任何作品至我的最愛</h2>
				<p>
					開始加入你喜愛的電影吧！
				</p>
			</div>
		);
	}

}

export default Favorites;
