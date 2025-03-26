import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
	const { favorites } = useMovieContext();

	if (favorites &&  favorites.length !== 0) {
		return (
			<div className="favorites">
				<h2>我的最愛</h2>
				<div className="movies-grid">
					{favorites.map((item) => (
						<MovieCard
							item={item}
							key={item.id}
							mediaType={item.mediaType}
						/>
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
