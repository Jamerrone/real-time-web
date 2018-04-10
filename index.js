const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const scoreBoard = {};

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('newMessage', function(data) {
    io.emit('newMessage', {
      message: data.message,
      username: data.username || 'Anonymous',
      userScore: data.userScore,
    });
  });
  socket.on('scoreUpdate', function(data) {
    scoreBoard[data.username] = data.userScore;
    io.emit('scoreUpdate', scoreBoard);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
