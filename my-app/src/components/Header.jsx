import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <div className="p-4 flex bg-white dark:bg-gray-900 items-center justify-between transition-all duration-300">
      <div className="flex items-center space-x-4">
        <h1 className="text-black dark:text-white text-[27px] font-bold items-center justify-center mb-2">CoinMarketCap</h1>
        <nav className="flex text-black dark:text-gray-300 font-bold items-center space-x-4 ">
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400">Cryptocurrencies</a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400">DexScan</a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400">Exchanges</a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400">Community</a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400">Products</a>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="h-8 p-4 border border-gray-300 dark:border-gray-500 rounded text-black dark:text-gray-300 dark:bg-gray-700"
        />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
