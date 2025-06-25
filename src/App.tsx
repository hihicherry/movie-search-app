import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import DetailPage from './pages/DetailPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import './css/index.css';

function App() {
  return (
    <Provider store={store}>
      <MovieProvider>
        <div className="min-h-screen bg-purple-gradient theme-blue:bg-blue-gradient transition-colors duration-300">
          <NavBar />
          <main>
            <Routes>
              <Route path="/movie-search-app/" element={<Home />} />
              <Route
                path="/movie-search-app/favorites"
                element={<Favorites />}
              />
              <Route
                path="/movie-search-app/:mediaType/:id"
                element={<DetailPage />}
              />
            </Routes>
          </main>
        </div>
      </MovieProvider>
    </Provider>
  );
}

export default App;
