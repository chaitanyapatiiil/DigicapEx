exports.crypto = async (req,res) => {
  try {
    console.log("heelo")
  } catch (error) {
    return res.json(error)
  }
}


// controllers/cryptoController.js
const axios = require('axios');

// Fetch data from the CoinCap API
exports.getCryptoData = async (req, res) => {
  try {
    // Base URL of CoinCap API
    const apiUrl = 'https://api.coincap.io/v2/assets';
    
    // Make the request
    const response = await axios.get(apiUrl);
    
    // Send the JSON response
    res.status(200).json({
      success: true,
      data: response.data.data, // CoinCap wraps the main data in a `data` property
    });
  } catch (error) {
    console.error('Error fetching data from CoinCap:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data from CoinCap API',
      error: error.message,
    });
  }
};


