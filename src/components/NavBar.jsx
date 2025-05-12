import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovieContext } from '../contexts/MovieContext';

function NavBar() {
  const { theme, toggleTheme } = useMovieContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="bg-navbar-gradient dark:bg-dark-navbar-gradient p-4 md:px-6 flex justify-between items-center shadow-[0_5px_5px_-5px_#414040] h-[50px] font-navbar text-white transition-colors duration-300">
      <div className="text-2xl font-bold">
        <Link className="hover:text-white" to="/movie-search-app/">
          MovieSearch
        </Link>
      </div>
      {/* 桌面端導航 */}
      <div className="hidden md:flex gap-2 items-center">
        <Link
          className="text-light text-base px-4 py-2 rounded hover:text-hover relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-hover after:transition-all after:duration-300 hover:after:w-full"
          to="/movie-search-app/"
        >
          Home
        </Link>
        <Link
          className="text-light text-base px-4 py-2 rounded hover:text-hover relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-hover after:transition-all after:duration-300 hover:after:w-full"
          to="/movie-search-app/favorites"
        >
          Favorites
        </Link>
        <button
          onClick={toggleTheme}
          className="text-light text-xl px-2 py-2 rounded hover:text-hover"
          aria-label={theme === 'dark' ? '切換到淺色模式' : '切換到深色模式'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      {/* 行動端漢堡選單 */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-light text-xl px-2 py-2 rounded hover:text-hover"
          aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
        >
          ☰
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[50px] left-0 w-full bg-navbar-gradient dark:bg-dark-navbar-gradient shadow-md md:hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              <Link
                className="text-light text-base px-4 py-2 rounded hover:text-hover"
                to="/movie-search-app/"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                className="text-light text-base px-4 py-2 rounded hover:text-hover"
                to="/movie-search-app/favorites"
                onClick={toggleMenu}
              >
                Favorites
              </Link>
              <button
                onClick={() => {
                  toggleTheme();
                  toggleMenu();
                }}
                className="text-light text-base px-4 py-2 rounded hover:text-hover text-left"
                aria-label={
                  theme === 'dark' ? '切換到淺色模式' : '切換到深色模式'
                }
              >
                {theme === 'dark' ? '☀️ 淺色模式' : '🌙 深色模式'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavBar;
