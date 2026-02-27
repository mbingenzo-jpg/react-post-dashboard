import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <header className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
          POST<span className="text-red-600">DASHBOARD</span>
        </h1>
      </div>
      
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        {mode === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-red-600" />
        )}
      </button>
    </header>
  );
};