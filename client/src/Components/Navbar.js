import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
      window.location.href = `/search?q=${searchQuery}`;
    } else {
      alert("Please enter a search query!");
    }
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>

            {/* Search Bar in the Center */}
            <div className="flex-grow flex justify-center">
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 rounded-r-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Navbar Links */}
            <div className="hidden sm:block">
              <div className="flex space-x-8">
                <a href="/buysell" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  Wallet
                </a>
                <a href="/Futures" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  Futures
                </a>
                <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  <a href="/news">News</a>
                </button>
                <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  <a href="/login">Account</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Status Bar Below Navbar */}
      <StatusBar />
    </div>
  );
};

// StatusBar Component with WebSocket Integration
const StatusBar = () => {
  const [statusData, setStatusData] = useState({
    
    
    exchanges: '7',
    marketCap: '$3.25T',
    marketCapChange: '+5.31%',
    volume: '$235.54B',
    volumeChange: '+27.07%',
    dominance: {
      btc: '59.8%',
      eth: '12.4%',
    },
    ethGas: '22.87 Gwei',
    fearGreed: '87/100',
  });

  // WebSocket connection
  useEffect(() => {
    // Replace this URL with the WebSocket endpoint you are using
    const socket = new WebSocket('wss://ws-api.binance.com:443/ws-api/v3'); // Replace with your WebSocket URL

    // Handle incoming WebSocket messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Assuming the data is JSON formatted
      setStatusData(data); // Update state with new data
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup on component unmount
    return () => socket.close();
  }, []);

  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center text-sm font-medium">
        <div className="flex items-center space-x-4">
          <div className="text-blue-400">Cryptos: {statusData.cryptos}</div>
          <div className="text-blue-400">Exchanges: {statusData.exchanges}</div>
          <div className="text-green-500">Market Cap: {statusData.marketCap} {statusData.marketCapChange}</div>
          <div className="text-green-500">24h Vol: {statusData.volume} {statusData.volumeChange}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-blue-400">Dominance: BTC: {statusData.dominance.btc} ETH: {statusData.dominance.eth}</div>
          <div className="text-gray-300">ETH Gas: {statusData.ethGas}</div>
          <div className="text-blue-400">Fear & Greed: {statusData.fearGreed}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
