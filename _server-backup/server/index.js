import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {Module} from 'node:module';
import http from "http";

export const require = Module.createRequire(import.meta.url); // instead use require() of commonJs
export const __filename = fileURLToPath(import.meta.url); // instead __filename & __dirname of commonJs
export const __dirname = dirname(__filename);


// const host = 'localhost';
// const server = http.createServer(app);

//////////server

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//   res.send('<h1>Form Builder</h1>');
//   //res.sendFile(__dirname + '/client.html');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ////////////web socket service
//
// const socketApp = express();
// const socketServer = http.createServer(socketApp);
// const io = new Server(socketServer, {
//   cors: {
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
//     credentials: true
//   }
// });
//
// io.on('connection', (socket) => {
//   console.log('socket connected');
//   socket.on('disconnect', () => {
//     console.log('client disconnected');
//   });
//   socket.on('message', (data) => {
//     console.log('message received! ' + data.toString());
//   });
//   // setInterval(() => {
//   //   socket.emit('notification', notifications[Math.floor(Math.random()*notifications.length)])
//   // }, 5000)
// });
//
// socketServer.listen(socketPort, () => {
//   console.log(`socket triggering on *:${socketPort}`);
// });




