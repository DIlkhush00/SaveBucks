const express = require('express');
const router = require('./routes/router');
const cors = require('cors');
const http = require('http');

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
}));

// Setup socket
app.set('socketio', io);

let socket_id = [];

io.on("connection", socket => {
  console.log("New client connected: ", socket.id);

  socket_id.push(socket.id);
  if (socket_id[0] === socket.id) {
    io.removeAllListeners('connection'); 
  }

  socket.on("disconnect", () => {
      console.log("Client disconnected: ", socket.id);
  });
});

// Middleware for routes
app.use('/api', router);

// Server listening
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export server for testing
module.exports = server;
