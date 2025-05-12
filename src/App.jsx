import './css/App.css';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import DetailPage from './pages/DetailPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';

function App() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/movie-search-app/" element={<Home />} />
            <Route path="/movie-search-app/favorites" element={<Favorites />} />
            <Route
              path="/movie-search-app/:mediaType/:id"
              element={<DetailPage />}
            />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
