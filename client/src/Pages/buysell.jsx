import React, { useEffect, useState } from 'react';

const BuySellWindow = () => {
  const [crypto, setCrypto] = useState('Bitcoin'); // Selected cryptocurrency
  const [orderType, setOrderType] = useState('buy'); // Buy or Sell
  const [amount, setAmount] = useState(''); // Amount to trade
  const [currentPrice, setCurrentPrice] = useState(null); // Real-time price
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch real-time price of Bitcoin
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
        const data = await response.json();
        setCurrentPrice(parseFloat(data.data.priceUsd)); // Set price in USD
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice(); // Initial fetch
    const interval = setInterval(fetchPrice, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleOrder = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const orderDetails = {
      type: orderType,
      crypto,
      amount: parseFloat(amount),
      price: currentPrice,
    };

    alert(`Order placed successfully:\n${JSON.stringify(orderDetails, null, 2)}`);
    setAmount(''); // Reset the amount field
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '20px',
        maxWidth: '800px',
        margin: '20px auto',
      }}
    >
      {/* Buy/Sell Window */}
      <div
        style={{
          flex: '1',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2>Buy/Sell Cryptocurrency</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Select Cryptocurrency:
            <select
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
              disabled
            >
              <option value="Bitcoin">Bitcoin</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Order Type:
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={{
                marginLeft: '10px',
                padding: '5px',
                width: '100px',
              }}
            />
          </label>
        </div>

        <button
          onClick={handleOrder}
          disabled={loading || !currentPrice}
          style={{
            padding: '10px 20px',
            backgroundColor: orderType === 'buy' ? '#4CAF50' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {orderType === 'buy' ? 'Buy' : 'Sell'} {crypto}
        </button>
      </div>

      {/* Live Price Section */}
      <div
        style={{
          flex: '1',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <h2>Live Price</h2>
        <p>
          Current Price:{' '}
          {loading ? (
            <span>Loading...</span>
          ) : (
            <strong>${currentPrice ? currentPrice.toFixed(2) : 'Error'}</strong>
          )}
        </p>

      </div>
    </div>
  );
};

export default BuySellWindow;
