const socket = io();
const sendMessage = document.getElementById('sendMessage');
const messageInput = document.getElementById('messageInput');
const messageList = document.getElementById('messageList');
const scoreList = document.getElementById('scoreList');
let username = '';

window.onload = () => {
  username = prompt('Username:');
};

sendMessage.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('newMessage', {
    message: messageInput.value,
    username: username,
    userScore: snake.tail.length + 1,
  });

  messageInput.value = '';
});

socket.on('newMessage', (data) => {
  const msg = document.createElement('li');

  if (data.message === '/up') {
    snake.move(0, -1);
  } else if (data.message === '/down') {
    snake.move(0, 1);
  } else if (data.message === '/right') {
    snake.move(1, 0);
  } else if (data.message === '/left') {
    snake.move(-1, 0);
  }

  msg.innerHTML = `${data.username}: ${data.message}`;
  messageList.append(msg);
});

socket.on('scoreUpdate', (data) => {
  const sortedUsersByScore = Object.entries(data).sort((a, b) => b[1] - a[1]);

  scoreList.innerHTML = '';

  sortedUsersByScore.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = `${user[0]}: ${user[1]}`;
    scoreList.append(li);
  });
});

setInterval(function() {
  socket.emit('scoreUpdate', {
    username: username,
    userScore: snake.tail.length + 1,
  });
}, 1000);
