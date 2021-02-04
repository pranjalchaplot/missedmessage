const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('join', () => {
        console.log(name, room); 
    });

    socket.on('disconnect', () => {
        console.log('User left!!');
    });
},)

app.use(router);

server.listen(PORT, () => console.log(`Server Started at ${PORT}`));