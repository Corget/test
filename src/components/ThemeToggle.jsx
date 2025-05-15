
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch'; 
import { cn } from "@/lib/utils";

const ThemeToggle = ({ theme, setTheme }) => {
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-gray-500' : 'text-yellow-500'}`} />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        className={cn(
          'data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-300', 
          'relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        )}
        aria-label="Toggle theme"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={cn(
            isDarkMode ? 'translate-x-6 bg-gray-900' : 'translate-x-1 bg-white',
            'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow-lg ring-0 transition-transform duration-200 ease-in-out mt-[2px]'
          )}
        />
      </Switch>
      <Moon className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-blue-500' : 'text-gray-500'}`} />
    </div>
  );
};

export default ThemeToggle;
