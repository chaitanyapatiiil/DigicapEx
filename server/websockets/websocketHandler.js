const WebSocket = require('ws');
const axios = require('axios');

const setupWebSocket = (server, io) => {
  const wss = new WebSocket.Server({ server });

  // Connect to CoinCap WebSocket API for real-time price updates
  const coinCapSocket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,binancecoin,xrp,dogecoin,usdc,cardano,tron,shiba,avax,toncoin,sui,chainlink,polkadot,pepe,bitcoin-cash,near-protocol,leo');

  // Store detailed crypto data from REST API
  let cryptoDetails = {};

  // Fetch details from REST API
  const fetchCryptoDetails = async () => {
    try {
      const response = await axios.get('https://api.coincap.io/v2/assets', {
        params: {
          ids: 'bitcoin,ethereum', // Add other cryptocurrencies as needed
        },
      });
      response.data.data.forEach((crypto) => {
        cryptoDetails[crypto.id] = {
          name: crypto.name,
          marketCap: crypto.marketCapUsd,
          volume: crypto.volumeUsd24Hr,
          circulatingSupply: crypto.supply,
          change1h: crypto.changePercent1Hr,
          change24h: crypto.changePercent24Hr,
          change7d: crypto.changePercent7D,
        };
      });
      console.log('Updated crypto details from REST API:', cryptoDetails);
    } catch (error) {
      console.error('Error fetching crypto details:', error.message);
    }
  };

  // Fetch data from REST API initially and refresh every 60 seconds
  fetchCryptoDetails();
  setInterval(fetchCryptoDetails, 60000);

  // Handle incoming price updates from WebSocket
  coinCapSocket.on('message', (data) => {
    //console.log('Received data type:', typeof data);
    //console.log('Raw data:', data);

    // Check if the received data is binary (Buffer)
    if (Buffer.isBuffer(data)) {
      try {
        // Convert binary data to a UTF-8 string
        const textData = data.toString('utf-8');
        //console.log('Converted Binary Data to String:', textData);

        // Now parse the JSON data
        const priceUpdates = JSON.parse(textData);
        processPriceUpdates(priceUpdates);
      } catch (error) {
        console.error('Error processing binary data:', error.message);
      }
      return;  // Skip further processing if data was binary
    }

    // If the data is already a string, directly parse it
    try {
      const priceUpdates = JSON.parse(data.toString());
      processPriceUpdates(priceUpdates);
    } catch (error) {
      console.error('Error processing CoinCap data:', error.message);
    }
  });

  // Function to process price updates and enrich with crypto details
  const processPriceUpdates = (priceUpdates) => {
    const enrichedData = {};

    for (const [crypto, price] of Object.entries(priceUpdates)) {
      enrichedData[crypto] = {
        price,
        ...(cryptoDetails[crypto] || {}), // Add detailed data if available
      };
    }

    //console.log('Enriched Data:', enrichedData);

    // Broadcast enriched data to WebSocket clients using Socket.io
    io.emit('cryptoUpdate', enrichedData); // This sends the data to all connected clients
  };

  coinCapSocket.on('error', (error) => {
    console.error('CoinCap WebSocket error:', error.message);
  });

  coinCapSocket.on('close', () => {
    console.log('CoinCap WebSocket closed.');
  });

  wss.on('connection', (client) => {
    console.log('Client connected to WebSocket');
    
    client.on('close', () => {
      console.log('Client disconnected');
    });

    client.on('error', (error) => {
      console.error('Client WebSocket error:', error.message);
    });
  });

  console.log('WebSocket server is set up');
};

module.exports = setupWebSocket;
