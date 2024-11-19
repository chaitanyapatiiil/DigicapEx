import React from "react";

const Home = () => {
  const cryptoData = [
    { name: "Bitcoin", symbol: "BTC", price: "$91,512.24", marketCap: "$1.81T", volume: "$67.4B", circulatingSupply: "737,114 BTC", supply: "19,783,996 BTC", oneHour: "0.00%", twentyFourHours: "1.03%", sevenDays: "8.17%" },
    { name: "Ethereum", symbol: "ETH", price: "$3,175.46", marketCap: "$382.4B", volume: "$31.4B", circulatingSupply: "9,908,885 ETH", supply: "120,424,008 ETH", oneHour: "0.37%", twentyFourHours: "2.26%", sevenDays: "3.55%" },
    { name: "Tether", symbol: "USDT", price: "$1.00", marketCap: "$127.6B", volume: "$148.1B", circulatingSupply: "147,990,294,684 USDT", supply: "127,539,192,698 USDT", oneHour: "0.04%", twentyFourHours: "0.07%", sevenDays: "0.07%" },
    { name: "Solana", symbol: "SOL", price: "$239.24", marketCap: "$113.5B", volume: "$8.5B", circulatingSupply: "35,761,593 SOL", supply: "474,584,332 SOL", oneHour: "0.10%", twentyFourHours: "2.12%", sevenDays: "8.69%" },
    { name: "Binance Coin", symbol: "BNB", price: "$621.15", marketCap: "$88.5B", volume: "$2.18B", circulatingSupply: "3,513,442 BNB", supply: "142,587,719 BNB", oneHour: "0.11%", twentyFourHours: "0.39%", sevenDays: "2.60%" },
    { name: "XRP", symbol: "XRP", price: "$1.13", marketCap: "$64.3B", volume: "$9.7B", circulatingSupply: "8,595,536,909 XRP", supply: "56,931,242,174 XRP", oneHour: "0.17%", twentyFourHours: "5.25%", sevenDays: "90.27%" },
    { name: "Dogecoin", symbol: "DOGE", price: "$0.374", marketCap: "$54.9B", volume: "$7.86B", circulatingSupply: "21,020,933,288 DOGE", supply: "146,844,906,384 DOGE", oneHour: "1.41%", twentyFourHours: "1.77%", sevenDays: "15.62%" },
    { name: "USDC", symbol: "USDC", price: "$1.00", marketCap: "$37.2B", volume: "$10.05B", circulatingSupply: "10,053,381,441 USDC", supply: "37,198,583,605 USDC", oneHour: "0.01%", twentyFourHours: "0.01%", sevenDays: "0.01%" },
    { name: "Cardano", symbol: "ADA", price: "$0.7465", marketCap: "$26.2B", volume: "$2.3B", circulatingSupply: "3,083,053,721 ADA", supply: "35,033,776,787 ADA", oneHour: "0.86%", twentyFourHours: "1.15%", sevenDays: "24.76%" },
    { name: "TRON", symbol: "TRX", price: "$0.2057", marketCap: "$17.8B", volume: "$931M", circulatingSupply: "4,529,182,272 TRX", supply: "86,370,681,332 TRX", oneHour: "0.69%", twentyFourHours: "4.07%", sevenDays: "23.43%" },
    { name: "Shiba Inu", symbol: "SHIB", price: "$0.00002485", marketCap: "$14.6B", volume: "$1.3B", circulatingSupply: "52,368,810,392,181 SHIB", supply: "589,260,502,680,805 SHIB", oneHour: "0.20%", twentyFourHours: "1.20%", sevenDays: "10.78%" },
    { name: "Avalanche", symbol: "AVAX", price: "$35.48", marketCap: "$14.5B", volume: "$877M", circulatingSupply: "24,741,973 AVAX", supply: "409,031,186 AVAX", oneHour: "0.09%", twentyFourHours: "1.40%", sevenDays: "3.43%" },
    { name: "Toncoin", symbol: "TON", price: "$5.53", marketCap: "$14.1B", volume: "$296M", circulatingSupply: "53,688,216 TON", supply: "2,546,014,952 TON", oneHour: "0.72%", twentyFourHours: "0.90%", sevenDays: "1.70%" },
    { name: "Sui", symbol: "SUI", price: "$3.73", marketCap: "$10.6B", volume: "$1.6B", circulatingSupply: "441,972,091 SUI", supply: "2,845,750,696 SUI", oneHour: "0.33%", twentyFourHours: "4.58%", sevenDays: "16.28%" },
    { name: "Chainlink", symbol: "LINK", price: "$15.30", marketCap: "$9.59B", volume: "$895M", circulatingSupply: "58,543,222 LINK", supply: "626,849,970 LINK", oneHour: "1.35%", twentyFourHours: "8.83%", sevenDays: "4.12%" },
    { name: "Polkadot", symbol: "DOT", price: "$5.90", marketCap: "$8.97B", volume: "$593M", circulatingSupply: "100,575,599 DOT", supply: "1,520,155,375 DOT", oneHour: "1.38%", twentyFourHours: "5.74%", sevenDays: "12.27%" },
    { name: "Pepe", symbol: "PEPE", price: "$0.00002094", marketCap: "$8.8B", volume: "$4.7B", circulatingSupply: "222,981,055,599,525 PEPE", supply: "420,689,899,999,995 PEPE", oneHour: "0.03%", twentyFourHours: "5.75%", sevenDays: "59.32%" },
    { name: "Bitcoin Cash", symbol: "BCH", price: "$445.28", marketCap: "$8.81B", volume: "$509M", circulatingSupply: "1,148,716 BCH", supply: "19,789,991 BCH", oneHour: "0.11%", twentyFourHours: "1.43%", sevenDays: "1.01%" },
    { name: "NEAR Protocol", symbol: "NEAR", price: "$6.08", marketCap: "$7.41B", volume: "$681M", circulatingSupply: "111,967,516 NEAR", supply: "1,217,906,155 NEAR", oneHour: "0.27%", twentyFourHours: "2.77%", sevenDays: "11.03%" },
    { name: "UNUS SED LEO", symbol: "LEO", price: "$7.67", marketCap: "$7.1B", volume: "$1.23M", circulatingSupply: "161,310 LEO", supply: "924,841,471 LEO", oneHour: "0.18%", twentyFourHours: "0.66%", sevenDays: "6.12%" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Coin</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Market Cap</th>
                <th className="px-4 py-2 text-left">Volume (24h)</th>
                <th className="px-4 py-2 text-left">Circulating Supply</th>
                <th className="px-4 py-2 text-left">1h %</th>
                <th className="px-4 py-2 text-left">24h %</th>
                <th className="px-4 py-2 text-left">7d %</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto, index) => (
                <tr key={index} className="border-b hover:bg-gray-700">
                  <td className="px-4 py-2">{crypto.name} ({crypto.symbol})</td>
                  <td className="px-4 py-2">{crypto.price}</td>
                  <td className="px-4 py-2">{crypto.marketCap}</td>
                  <td className="px-4 py-2">{crypto.volume}</td>
                  <td className="px-4 py-2">{crypto.circulatingSupply}</td>
                  <td className="px-4 py-2">{crypto.oneHour}</td>
                  <td className="px-4 py-2">{crypto.twentyFourHours}</td>
                  <td className="px-4 py-2">{crypto.sevenDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-4">
        <p>&copy; 2024 DigicapEx. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
