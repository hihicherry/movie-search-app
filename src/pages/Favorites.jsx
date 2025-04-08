import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";
import { useState } from "react";

function Favorites() {
	const { favorites } = useMovieContext();
	const [filter, setFilter] = useState("all");

	const filteredFavorites = favorites.filter((item) => {
		if (filter === "all") return true;
		return item.mediaType === filter;
	});

	const filterButtons = [
		{label: "全部", value: "all"},
		{label: "電影", value: "movie"},
		{label: "電視劇", value: "tv"}
	];

	const renderFavorites = () => (
		<div className="p-8 w-full box-border">
			<h2 className="mb-4 text-center text-4xl text-navbar-start">
				我的最愛
			</h2>
			<div className="flex justify-center gap-4 mb-8">
				{filterButtons.map((btn) => (
					<button
						key={btn.value}
						className={`px-4 py-2 rounded-lg text-white transition-all duration-300 ${
							filter === btn.value
								? "bg-button-gradient scale-105"
								: "bg-gray-400 hover:bg-filter-btn-hover hover:scale-105"
						}`}
						onClick={() => setFilter(btn.value)}
					>
						{btn.label}
					</button>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredFavorites.map((item) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, borderRadius: "8px" }}
						animate={{ opacity: 1 }}
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

  const renderEmpty = () => (
    <div className="text-center p-16 bg-[#ffffff0d] rounded-xl mx-auto my-8 max-w-[600px]">
      <h2 className="mb-4 text-3xl text-navbar-start">
        {filter === "all"
          ? "尚未新增任何作品至我的最愛"
          : `尚未新增任何${filter === "movie" ? "電影" : "電視"}至我的最愛`}
      </h2>
      <p className="text-[#657b96] text-lg leading-6">
        開始加入你喜愛的{filter === "movie" ? "電影" : "電視"}吧！
      </p>
    </div>
  );

  return filteredFavorites.length > 0 ? renderFavorites() : renderEmpty();


	

}

export default Favorites;
