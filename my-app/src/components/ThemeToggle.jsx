import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Quản lý trạng thái theme
  const [theme, setTheme] = useState(
    localStorage.theme === 'dark' ? 'dark' : 'light'
  );

  // Cập nhật theme vào thẻ <html> và lưu vào localStorage
  useEffect(() => {
    const root = document.documentElement; // Thẻ <html>
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Hàm chuyển đổi chế độ
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className="p-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
