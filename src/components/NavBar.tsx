import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovieContext } from '../contexts/MovieContext';
import { HeartIcon, StarIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

function NavBar() {
  const { theme, toggleTheme } = useMovieContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="bg-theme-purple-nav-gradient theme-blue:bg-theme-blue-nav-gradient p-4 md:px-6 flex justify-between items-center h-[50px] font-navbar text-purple theme-blue:text-blue transition-colors duration-300 z-50">
      <div className="text-l font-bold">
        <Link
          className="hover:text-violet-500 theme-blue:hover:text-sky-500"
          to="/movie-search-app/"
        >
          MovieSearch
        </Link>
      </div>
      {/* 桌面端導航 */}
      <div className="hidden md:flex gap-2 items-center ">
        <Link
          className="text-base font-pixel px-4 py-2 rounded hover:text-violet-500 theme-blue:hover:text-sky-500 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-violet-500 theme-blue:after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full"
          to="/movie-search-app/"
        >
          Home
        </Link>
        <Link
          className="text-base font-pixel px-4 py-2 rounded hover:text-violet-500 theme-blue:hover:text-sky-500 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-violet-500 theme-blue:after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full"
          to="/movie-search-app/favorites"
        >
          Favorites
        </Link>
        <button
          onClick={toggleTheme}
          className="text-xl px-2 py-2 rounded hover:text-violet-500 theme-blue:hover:text-sky-500"
          aria-label={theme === 'purple' ? '切換到藍色主題' : '切換到紫色主題'}
        >
          {theme === 'purple' ? <StarIcon /> : <HeartIcon />}
        </button>
      </div>
      {/* 行動端漢堡選單 */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="font-pixel text-purple theme-blue:text-blue text-xl px-2 py-2 rounded hover:text-fuchsia-500 theme-blue:hover:text-sky-500"
          aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
        >
          <HamburgerMenuIcon />
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[50px] left-0 w-full bg-purple-gradient theme-blue:bg-blue-gradient shadow-md md:hidden z-50"
          >
            <div className="flex flex-col p-4 gap-2">
              <Link
                className="font-pixel text-purple theme-blue:text-blue text-base px-4 py-2 rounded hover:text-fuchsia-500 theme-blue:hover:text-sky-500"
                to="/movie-search-app/"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                className="font-pixel text-purple theme-blue:text-blue text-base px-4 py-2 rounded hover:text-fuchsia-500 theme-blue:hover:text-sky-500"
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
                className="font-pixel text-purple theme-blue:text-blue text-base px-4 py-2 rounded hover:text-fuchsia-500 theme-blue:hover:text-sky-500 text-left"
                aria-label={
                  theme === 'purple' ? '切換至藍色主題' : '切換至紫色主題'
                }
              >
                {theme === 'purple' ? '切換至藍色主題' : '切換至紫色主題'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavBar;
