import React, { useEffect, useState } from 'react';

// WebSocket URL for real-time price updates
const websocketURL = 'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,binancecoin,xrp,dogecoin,usdc,cardano,tron,shiba,avax,toncoin,sui,chainlink,polkadot,pepe,bitcoin-cash,near-protocol,leo,litecoin,monero,uniswap,stellar,cosmos,tezos,matic,algorand,vechain,flow,mana';

const CryptoPrices = () => {
  const [coinData, setCoinData] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});

  useEffect(() => {
    const socket = new WebSocket(websocketURL);

    // Update coin prices and track previous values
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setCoinData((prevData) => {
        setPreviousPrices(prevData);
        return { ...prevData, ...data };
      });
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const getPriceChangeColor = (coin) => {
    if (!previousPrices[coin]) return '#ffffff'; // Initial state
    const currentPrice = parseFloat(coinData[coin]);
    const previousPrice = parseFloat(previousPrices[coin]);
    return currentPrice > previousPrice ? '#00ff00' : currentPrice < previousPrice ? '#ff0000' : '#ffffff';
  };

  const sortedCoins = Object.keys(coinData).sort((a, b) => {
    const priceA = parseFloat(coinData[a]);
    const priceB = parseFloat(coinData[b]);
    return priceB - priceA; // Sort by descending price
  });

  return (
    <div style={styles.pageContainer}>
    

      <div style={styles.mainContent}>
        {sortedCoins.map((coin) => {
          const price = parseFloat(coinData[coin]).toFixed(6);

          return (
            <div key={coin} style={styles.card}>
              <div style={styles.coinName}>{coin.toUpperCase()}</div>
              <div style={{ ...styles.coinPrice, color: getPriceChangeColor(coin) }}>
                {`$${price}`}
              </div>
            </div>
          );
        })}
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>@ DigicapEx</p>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212', // Dark background
    color: '#ffffff', // Light text for better contrast
  },
  header: {
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    textAlign: 'center',
    padding: '20px 0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  },
  headerText: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Spacing between cards
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
  },
  coinName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  coinPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    textAlign: 'center',
    padding: '10px',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
  },
  footerText: {
    fontSize: '1rem',
    margin: 0,
  },
};

export default CryptoPrices;
