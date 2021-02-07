const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, getUser, removeUser, getUserInRoom} = require( './users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(router); 

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback
         ) => {
        const { error, user } = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined!!`});

        socket.join(user.room);

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User left!!');
    });
},)

app.use(router);

server.listen(PORT, () => console.log(`Server Started at ${PORT}`));