import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";

function Favorites() {
	const { favorites } = useMovieContext();

	if (favorites &&  favorites.length !== 0) {
		return (
			<div className="p-8 w-full box-border">
				<h2 className="mb-8 text-center text-4xl text-navbar-start">
					我的最愛
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{favorites.map((item) => (
						<motion.div
							key={item.id}
							initial={{ borderRadius: "8px" }}
							whileHover={{
								scale: 1.05,
								boxShadow: "0px 5px 15px #4612a1",
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
			<div className="text-center p-16 bg-[#ffffff0d] rounded-xl mx-auto my-8 max-w-[600px]">
				<h2 className="mb-4 text-3xl text-navbar-start">
					尚未新增任何作品至我的最愛
				</h2>
				<p className="text-[#657b96] text-lg leading-6">
					開始加入你喜愛的電影吧！
				</p>
			</div>
		);
	}

}

export default Favorites;
