'use client';

import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
   const [isDark, setIsDark] = useState(false);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
   }, []);

   const toggleTheme = () => {
      const html = document.documentElement;
      if (isDark) {
         html.classList.remove('dark');
         localStorage.setItem('theme', 'light');
         setIsDark(false);
      } else {
         html.classList.add('dark');
         localStorage.setItem('theme', 'dark');
         setIsDark(true);
      }
   };

   if (!mounted) return null;

   return (
      <button
         onClick={toggleTheme}
         className="fixed bottom-6 right-6 z-40 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
         aria-label="Toggle theme"
      >
         {isDark ? (
            <Sun className="w-5 h-5 text-amber-500" />
         ) : (
            <Moon className="w-5 h-5 text-slate-600" />
         )}
      </button>
   );
};
