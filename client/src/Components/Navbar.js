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
      window.location.href = `/${searchQuery}`;
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
                  <a href="/new">News</a>
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
    btc: 'Loading...',
    eth: 'Loading...',
    sol: 'Loading...',
    trx: 'Loading...',
    matic: 'Loading...',
    xrp: 'Loading...',
    marketCap: 'Loading...',
    volume: 'Loading...',
    dominance: {
      btc: 'Loading...',
      eth: 'Loading...',
    }
  });

  useEffect(() => {
    // WebSocket for BTC/ETH prices
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,tron,polygon,ripple');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setStatusData((prevState) => ({
        ...prevState,
        btc: data.bitcoin ? `${parseFloat(data.bitcoin).toFixed(2)}` : prevState.btc,
        eth: data.ethereum ? `${parseFloat(data.ethereum).toFixed(2)}` : prevState.eth,
        sol: data.solana ? `${parseFloat(data.solana).toFixed(2)}` : prevState.sol,
        trx: data.tron ? `${parseFloat(data.tron).toFixed(2)}` : prevState.trx,
        matic: data.polygon ? `${parseFloat(data.polygon).toFixed(2)}` : prevState.matic,
        xrp: data.ripple ? `${parseFloat(data.ripple).toFixed(2)}` : prevState.xrp,
      }));
    };

    const fetchLiveData = async () => {
      try {
        // Fetch global market data
        const marketResponse = await fetch('https://api.coincap.io/v2/global');
        const marketData = await marketResponse.json();

        // Fetch ETH gas prices
        const ethGasResponse = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle');
        const ethGasData = await ethGasResponse.json();

        // Calculate dominance based on market cap data
        const btcMarketCap = marketData.data.bitcoin_market_cap_usd;
        const ethMarketCap = marketData.data.ethereum_market_cap_usd;
        const totalMarketCap = marketData.data.total_market_cap_usd;

        const btcDominance = (btcMarketCap / totalMarketCap) * 100;
        const ethDominance = (ethMarketCap / totalMarketCap) * 100;

        setStatusData((prevState) => ({
          ...prevState,
          cryptos: marketData.data.active_cryptocurrencies || prevState.cryptos,
          exchanges: marketData.data.active_exchanges || prevState.exchanges,
          marketCap: `$${(marketData.data.total_market_cap_usd / 1e12).toFixed(2)}T`,
          volume: `$${(marketData.data.total_volume_usd / 1e9).toFixed(2)}B`,
          dominance: {
            btc: `${btcDominance.toFixed(2)}%`,
            eth: `${ethDominance.toFixed(2)}%`,
          },
          ethGas: ethGasData.result.ProposeGasPrice ? `${ethGasData.result.ProposeGasPrice} Gwei` : 'N/A',
        }));
      } catch (error) {
        console.error('Error fetching live data:', error);
      }
    };

    // Fetch live data initially and every 10 seconds
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 10000);

    // Cleanup
    return () => {
      socket.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center text-sm font-medium">
        <div className="flex items-center space-x-4">
          <div className="text-blue-400">BTC: {statusData.btc}</div>
          <div className="text-blue-400">ETH: {statusData.eth}</div>
          <div className="text-blue-400">SOL: {statusData.sol}</div>
          <div className="text-blue-400">TRX: {statusData.trx}</div>
          <div className="text-blue-400">MATIC: {statusData.matic}</div>
          <div className="text-blue-400">XRP: {statusData.xrp}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-green-500">Market Cap: {statusData.marketCap}</div>
          <div className="text-green-500">Volume: {statusData.volume}</div>
          <div className="text-green-500">Dominance: BTC: {statusData.dominance.btc} ETH: {statusData.dominance.eth}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
