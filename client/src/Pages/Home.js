import React, { useEffect, useState } from 'react';

// WebSocket URL for real-time price updates for the coins (modify as needed)
const websocketURL = 'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,binancecoin,xrp,dogecoin,usdc,cardano,tron,shiba,avax,toncoin,sui,chainlink,polkadot,pepe,bitcoin-cash,near-protocol,leo,litecoin,monero,uniswap,chainlink,stellar,cosmos,tezos,polkadot,matic,algorand,vechain,fiat,trust-wallet-token,aave,compound,lido,dai,thunder-token,flow,polygon,shiba-inu,cosmos-hub,mana,bitcoin-cash,defichain,fantom,bitfinex,celo,bnb,bittorrent,hedera,harmony,ravencoin,neo,zk-rollups';


const CryptoPrices = () => {
  const [coinData, setCoinData] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [previousChanges, setPreviousChanges] = useState({
    hour: {},
    day: {},
    week: {},
  });

  // Establish WebSocket connection to fetch live data
  useEffect(() => {
    const socket = new WebSocket(websocketURL);

    // On receiving new data, update the state with the latest prices
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);



      // Compare and update previous prices and current prices
      setCoinData((prevData) => {
        const newData = { ...prevData, ...data };
        setPreviousPrices((prevPrices) => {
          const updatedPrices = { ...prevPrices };
          Object.keys(data).forEach((coin) => {
            if (newData[coin] !== prevPrices[coin]) {
              updatedPrices[coin] = prevData[coin] || newData[coin];
            }
          });
          
          return updatedPrices;
        });
        return newData;
      });

      // For 1h, 24h, and 7d changes, compare the values and store the previous ones
      setPreviousChanges((prevChanges) => {
        const updatedChanges = { ...prevChanges };

        Object.keys(data).forEach((coin) => {
          const hourChange = (Math.random() * 10).toFixed(2); // Replace with real data
          const dayChange = (Math.random() * 20).toFixed(2);  // Replace with real data
          const weekChange = (Math.random() * 30).toFixed(2); // Replace with real data

          updatedChanges.hour[coin] = hourChange;
          updatedChanges.day[coin] = dayChange;
          updatedChanges.week[coin] = weekChange;
        });

        return updatedChanges;
      });
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup WebSocket when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  // Helper function to format large numbers (like Market Cap, Volume)
  const formatNumber = (num) => {
    return num ? new Intl.NumberFormat().format(num) : 'N/A';
  };

  // Sort coins by price in descending order before rendering
  const sortedCoins = Object.keys(coinData).sort((a, b) => {
    const priceA = parseFloat(coinData[a]);
    const priceB = parseFloat(coinData[b]);
    return priceB - priceA; // Sort in descending order
  });

  // Helper function to determine the price change color
  const getPriceChangeColor = (coin) => {
    if (!previousPrices[coin]) return 'black'; // Initial state when there's no previous price
    const currentPrice = parseFloat(coinData[coin]);
    const previousPrice = parseFloat(previousPrices[coin]);
    return currentPrice > previousPrice ? 'green' : currentPrice < previousPrice ? 'red' : 'black';
  };

  // Helper function to determine the change color for 1h, 24h, and 7d
  const getChangeColor = (coin, timePeriod) => {
    const currentChange = parseFloat(previousChanges[timePeriod][coin]);
    const previousChange = parseFloat(previousChanges[timePeriod][coin]);

    return currentChange > previousChange
      ? 'green'
      : currentChange < previousChange
      ? 'red'
      : 'black';
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
      </header>

      <div style={styles.mainContent}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Coin</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>1h %</th>
              <th style={styles.th}>24h %</th>
              <th style={styles.th}>7d %</th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins.map((coin) => {
              const price = parseFloat(coinData[coin]).toFixed(5); // Price
              const hourChange = (Math.random() * 10).toFixed(2); // Replace with real data
              const dayChange = (Math.random() * 20).toFixed(2);  // Replace with real data
              const weekChange = (Math.random() * 30).toFixed(2); // Replace with real data

              return (
                <tr key={coin}>
                  <td style={styles.td}>{coin}</td>
                  <td style={{ ...styles.td, color: getPriceChangeColor(coin) }}>
                    {`$${price}`}
                  </td>
                  <td
                    style={{ ...styles.td, color: getChangeColor(coin, 'hour') }}
                  >{`${hourChange}%`}</td>
                  <td
                    style={{ ...styles.td, color: getChangeColor(coin, 'day') }}
                  >{`${dayChange}%`}</td>
                  <td
                    style={{ ...styles.td, color: getChangeColor(coin, 'week') }}
                  >{`${weekChange}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>©2024 DigicapEx</p>
      </footer>
    </div>
  );
};

// Styles for the full-page layout
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    color: '#333',
  },
  header: {
    backgroundColor: '#2D2D2D',
    color: '#FFF',
    textAlign: 'center',
    padding: '25px 0',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    borderBottom: '5px solid #1C1C1C',
  },
  headerText: {
    fontSize: '3rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    margin: 0,
    textTransform: 'uppercase',
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '30px',
    background: 'linear-gradient(135deg, #f8f8f8, #e0e0e0)',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    backgroundColor: '#4C4C4C',
    color: '#FFF',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontSize: '1rem',
  },
  tdPrice: {
    padding: '12px',
    textAlign: 'left',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  footer: {
    backgroundColor: '#2D2D2D',
    color: '#FFF',
    textAlign: 'center',
    padding: '15px 0',
    boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.1)',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: '1.1rem',
    margin: 0,
    letterSpacing: '0.5px',
  },
  tableRow: {
    transition: 'background-color 0.3s ease',
  },
  tableRowHover: {
    backgroundColor: '#f1f1f1',
  },
};


export default CryptoPrices;
