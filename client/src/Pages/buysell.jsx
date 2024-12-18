import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderBook = () => {
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [livePrice, setLivePrice] = useState(0);
  const [newOrder, setNewOrder] = useState({ type: "", price: "", size: "" });
  const [userPnL, setUserPnL] = useState(0); // PnL for the user
  const [orderHistory, setOrderHistory] = useState([]); // Stores order history

  // Fetch live price from CoinCap API
  useEffect(() => {
    const fetchLivePrice = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets/bitcoin");
        setLivePrice(parseFloat(response.data.data.priceUsd));
      } catch (error) {
        console.error("Error fetching live price", error);
      }
    };

    fetchLivePrice();

    const interval = setInterval(fetchLivePrice, 1000); // Update price every second
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Function to add orders (buy or sell)
  const handlePlaceOrder = () => {
    if (!newOrder.price || !newOrder.size) {
      alert("Please enter a price and size");
      return;
    }

    const order = {
      price: parseFloat(newOrder.price),
      size: parseFloat(newOrder.size),
      type: newOrder.type,
      timestamp: new Date().toISOString(), // Store the time of order
    };

    if (order.type === "buy") {
      setBuyOrders((prevOrders) => [...prevOrders, order]);
    } else if (order.type === "sell") {
      setSellOrders((prevOrders) => [...prevOrders, order]);
    }

    // Save order to history
    setOrderHistory((prevHistory) => [...prevHistory, order]);

    setNewOrder({ type: "", price: "", size: "" });
  };

  // Match orders from buy and sell
  useEffect(() => {
    // Sort orders by price (buy orders highest, sell orders lowest)
    const matchedOrders = [];
    const sortedBuyOrders = [...buyOrders].sort((a, b) => b.price - a.price);
    const sortedSellOrders = [...sellOrders].sort((a, b) => a.price - b.price);

    while (sortedBuyOrders.length && sortedSellOrders.length) {
      const buyOrder = sortedBuyOrders[0];
      const sellOrder = sortedSellOrders[0];

      // Check if there is a match (Buy price should be >= Sell price)
      if (buyOrder.price >= sellOrder.price) {
        const executedSize = Math.min(buyOrder.size, sellOrder.size);

        // Update PnL for the user using the live price
        const executedPnL = executedSize * (livePrice - buyOrder.price);
        setUserPnL((prevPnL) => prevPnL + executedPnL);

        // Update order sizes
        buyOrder.size -= executedSize;
        sellOrder.size -= executedSize;

        // Remove completed orders
        if (buyOrder.size === 0) sortedBuyOrders.shift();
        if (sellOrder.size === 0) sortedSellOrders.shift();

        matchedOrders.push({
          buyOrder,
          sellOrder,
          executedSize,
          executedPnL,
        });
      } else {
        break;
      }
    }

    setBuyOrders(sortedBuyOrders);
    setSellOrders(sortedSellOrders);

    // Optionally, handle matched orders display
    // setMatchedOrders(matchedOrders);
  }, [buyOrders, sellOrders, livePrice]);

  // Function to update PnL every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      let newPnL = 0;

      // Calculate PnL for each order based on live price
      buyOrders.forEach((order) => {
        newPnL += order.size * (livePrice - order.price);
      });
      sellOrders.forEach((order) => {
        newPnL -= order.size * (livePrice - order.price);
      });

      setUserPnL(newPnL); // Update PnL
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [buyOrders, sellOrders, livePrice]);

  return (
    <div>
      <h1>Crypto Exchange</h1>

      <h2>Live Price: ${livePrice.toFixed(2)}</h2>
      <h3>Your PnL: ${userPnL.toFixed(2)}</h3>

      <div>
        <h3>Place Order</h3>
        <select
          value={newOrder.type}
          onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={newOrder.price}
          onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
        />

        <input
          type="number"
          placeholder="Size"
          value={newOrder.size}
          onChange={(e) => setNewOrder({ ...newOrder, size: e.target.value })}
        />

        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>

      <div>
        <h3>Buy Orders</h3>
        <ul>
          {buyOrders.map((order, index) => (
            <li key={index}>
              {order.type} | Price: ${order.price} | Size: {order.size} | Time: {order.timestamp}
            </li>
          ))}
        </ul>

        <h3>Sell Orders</h3>
        <ul>
          {sellOrders.map((order, index) => (
            <li key={index}>
              {order.type} | Price: ${order.price} | Size: {order.size} | Time: {order.timestamp}
            </li>
          ))}
        </ul>

        <h3>Order History</h3>
        <ul>
          {orderHistory.map((order, index) => (
            <li key={index}>
              {order.type} | Price: ${order.price} | Size: {order.size} | Time: {order.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBook;
