/**
 * Mock Socket.io Server for Real-Time Chat
 * This is a development server that simulates customer chat responses.
 * Replace with production Socket.io server when available.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

// Mock customer data
const mockCustomers = {
  ORDER_001: {
    customerId: 'CUST_123',
    customerName: 'Sarah Johnson',
    customerAvatar: 'https://i.pravatar.cc/150?img=1',
    orderId: 'ORDER_001',
    deliveryAddress: '123 Main Street, Apt 4B',
  },
  ORDER_002: {
    customerId: 'CUST_456',
    customerName: 'Michael Chen',
    customerAvatar: 'https://i.pravatar.cc/150?img=2',
    orderId: 'ORDER_002',
    deliveryAddress: '456 Oak Avenue, Suite 200',
  },
};

// Mock customer auto-responses
const mockResponses = [
  "Thanks for the update! I'll be ready.",
  "Could you please hurry? I'm in a rush.",
  "No problem, take your time!",
  "Please call me when you arrive.",
  "Thank you! See you soon.",
  "Can you leave it at the door?",
  "I'm in the lobby waiting.",
];

io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);
  socket.emit('customer_info', mockCustomers.ORDER_001);

  // Send initial connection success with customer data
  socket.on('join_chat', (data) => {
    const { orderId } = data;
    console.log(`[Socket.io] Rider joined chat for order: ${orderId}`);

    // Send customer info
    const customerData = mockCustomers[orderId] || {
      customerId: 'CUST_DEFAULT',
      customerName: 'Customer',
      customerAvatar: null,
      orderId: orderId,
      deliveryAddress: 'Unknown Address',
    };

    socket.emit('customer_info', customerData);
    
    // Send initial welcome message from customer
    setTimeout(() => {
      socket.emit('receive_message', {
        id: `msg_${Date.now()}_welcome`,
        text: "Hi! I'm tracking my order. Please let me know when you're nearby.",
        sender: 'customer',
        timestamp: new Date().toISOString(),
        orderId: orderId,
      });
    }, 1000);
  });

  // Handle incoming messages from rider
  socket.on('send_message', (data) => {
    console.log(`[Socket.io] Message received from rider:`, data);

    // Broadcast the rider message back to client
    socket.emit('receive_message', {
      id: data.id,
      text: data.text,
      sender: 'rider',
      timestamp: data.timestamp,
      orderId: data.orderId,
    });

    socket.emit('message_sent', {
      id: data.id,
      text: data.text,
      sender: 'rider',
      timestamp: data.timestamp,
      orderId: data.orderId,
      status: 'delivered',
    });

    // Simulate customer reply after 2 seconds
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      socket.emit('receive_message', {
        id: `msg_${Date.now()}_customer`,
        text: randomResponse,
        sender: 'customer',
        timestamp: new Date().toISOString(),
        orderId: data.orderId,
      });
    }, 2000);
  });

  // Handle typing indicators (optional for future enhancement)
  socket.on('typing_start', (data) => {
    console.log(`[Socket.io] Rider is typing for order ${data.orderId}`);
    // In production, broadcast to customer
  });

  socket.on('typing_stop', (data) => {
    console.log(`[Socket.io] Rider stopped typing for order ${data.orderId}`);
    // In production, broadcast to customer
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mock Socket.io server is running' });
});

// Root endpoint to prevent "Cannot GET /" error
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Delivery Panda Mock Socket.io Server is running.',
    instructions: 'To run the frontend app, open a new terminal and run: npm run web (or npm run ios / npm run android)'
  });
});

server.listen(PORT, () => {
  console.log(`\n✅ Mock Socket.io server running on http://localhost:${PORT}`);
  console.log(`   Use this URL in your app: http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health\n`);
});
