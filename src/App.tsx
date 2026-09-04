import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import DetailPage from './pages/DetailPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { queryClient } from './query/client';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FavoritesProvider>
          <div className="min-h-screen bg-purple-gradient theme-blue:bg-blue-gradient transition-colors duration-300">
            <NavBar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/:mediaType/:id" element={<DetailPage />} />
              </Routes>
            </main>
          </div>
        </FavoritesProvider>
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
