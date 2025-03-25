import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState([]);  //控制載入動畫
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
				const popularmovies = await getPopularMovies();
				setMovies(popularmovies);
                setVisibleMovies([]); //先清空動畫狀態
                //依序顯示動畫
                popularmovies.forEach((movie, index)=>{
                    setTimeout(() => { //控制動畫順序
                       setVisibleMovies((prev) => [...prev, movie.id]);
                    }, index * 150);
                });
			} catch (err) {
                console.log(err);
                setError("讀取電影失敗...");
			} finally {
				setLoading(false);
			}
        }
        loadPopularMovies();
    },[]);


    const handleSearch = async (e) =>{
        e.preventDefault();
        if(!searchQuery.trim()) return 
        if(loading) return

        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }
        catch(err){
            console.log(err);
            setError("電影查詢失敗...");
        }
        finally{
            setLoading(false);
        }
        
        setSearchQuery("");
    };

    return (
		<div className="home">
			<form className="search-form" onSubmit={handleSearch}>
				<input
					className="search-input"
					type="text"
					placeholder="請輸入欲查詢的電影名稱"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button className="search-btn" type="submit">
					查詢
				</button>
			</form>

			{error && <div className="error-message">{error}</div>}
			{loading ? (
				<div className="loading">🎬 載入中...</div>
			) : (
				<div className="movies-grid">
					{movies.map((movie) => (
						<MovieCard
							movie={movie}
							key={movie.id}
							className={
								visibleMovies.includes(movie.id)
									? "fade-in"
									: "hidden"
							}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default Home