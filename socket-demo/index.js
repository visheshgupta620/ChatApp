const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = new socketIO.Server(server);

io.on('connection', (socket)=>{
    // console.log('User Connected with ID ', socket.id );

    socket.on('username', ({username})=>{

        socket.on('send-msg', (data)=>{
            io.emit('received-msg', {
                msg:data.msg,
                id:socket.id,
                username
            });
        })

    })
})

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4444;
server.listen(PORT, ()=>{
    console.log('Server is up at PORT', PORT);
})