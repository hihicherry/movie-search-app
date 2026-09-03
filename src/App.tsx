import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import DetailPage from './pages/DetailPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import { queryClient } from './query/client';
import './css/index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
