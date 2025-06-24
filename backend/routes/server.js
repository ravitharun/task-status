const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
});

// ✅ Middleware to inject io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Register routes AFTER io injection
app.use('/', routes);

io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
