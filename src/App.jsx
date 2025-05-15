
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Download, Play, Menu, Home as HomeIcon, Server, DownloadCloud } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import CustomCursor from '@/components/CustomCursor';
import HomePage from '@/pages/HomePage';
import OnlinePage from '@/pages/OnlinePage';
import DownloadsPage from '@/pages/DownloadsPage';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  const navLinkClasses = (path) => 
    `flex items-center space-x-2 text-foreground hover:bg-accent px-3 py-2 rounded-md transition-colors ${location.pathname === path ? 'bg-accent font-semibold' : ''}`;

  const mobileNavLinkClasses = (path) =>
    `flex items-center justify-start space-x-2 text-foreground hover:bg-muted w-full px-3 py-2 rounded-md transition-colors ${location.pathname === path ? 'bg-muted font-semibold' : ''}`;


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <CustomCursor theme={theme} />
      <header className="bg-card text-card-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-1">
              <Button 
                variant="ghost" 
                className="md:hidden text-foreground hover:bg-accent" 
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/" className={navLinkClasses("/")}>
                  <HomeIcon className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link to="/downloads" className={navLinkClasses("/downloads")}>
                  <Download className="h-4 w-4" />
                  <span>Downloads</span>
                </Link>
                <Link to="/online" className={navLinkClasses("/online")}>
                  <Play className="h-4 w-4" />
                  <span>Online</span>
                </Link>
              </div>
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold tracking-wider">
              <Link to="/" className="flex items-center">
                <span className="text-green-500">Eagler</span>
                <span className="text-blue-500">craft</span>
              </Link>
            </div>

            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
        
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border px-2 py-2 absolute w-full shadow-lg"
            onClick={closeMobileMenu}
          >
            <div className="flex flex-col space-y-1">
              <Link to="/" className={mobileNavLinkClasses("/")} onClick={closeMobileMenu}>
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link to="/downloads" className={mobileNavLinkClasses("/downloads")} onClick={closeMobileMenu}>
                <Download className="h-5 w-5" />
                <span>Downloads</span>
              </Link>
              <Link to="/online" className={mobileNavLinkClasses("/online")} onClick={closeMobileMenu}>
                <Play className="h-5 w-5" />
                <span>Online</span>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/online" element={<OnlinePage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
        </Routes>
      </AnimatePresence>
      
      <footer className="bg-card text-muted-foreground py-6 border-t border-border mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>Eaglercraft Portal - Play Minecraft in your browser</p>
          <p className="text-sm mt-2">Not affiliated with Mojang or Microsoft</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default App;
