require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const http = require('http'); // HTTP module for WebSocket server
const socketIo = require('socket.io');

const userRoutes = require('./routes/userRoutes');
const coincapRoutes = require('./routes/coincapRoutes');
const setupWebSocket = require('./websockets/websocketHandler');

const app = express();
const port = 8000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use('/user', userRoutes);
app.use('/coincap', coincapRoutes);

// MongoDB Connection and Server Setup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');

    // Create HTTP server and integrate WebSocket
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
          origin: true,  // Allow connection from the frontend
          methods: ['GET', 'POST'],
          credentials: true,  // Allow credentials (cookies, etc.)
        },
      });

    // Pass the io object to your websocket handler
    setupWebSocket(server, io);  // Make sure to pass io

    // Start the server
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error.message}`);
  });
