import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './DarkModeToggle.css';

// Accessible toggle showing emoji icons. When in light mode the button shows
// 🔆; in dark mode it shows 🌙. Clicking toggles the theme stored in context.
const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="theme-toggle"
    >
      {theme === 'dark' ? '🌙' : '🔆'}
    </button>
  );
};

export default DarkModeToggle;
