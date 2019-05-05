const socket = io();
const messageInput = document.getElementById('messageInput');
const messageList = document.getElementById('messageList');
const scoreList = document.getElementById('scoreList');
const sendMessage = document.getElementById('sendMessage');
const colors = [
  'color-1',
  'color-2',
  'color-3',
  'color-4',
  'color-5',
  'color-6',
  'color-7',
  'color-8',
  'color-9',
  'color-10',
  'color-11',
  'color-12',
  'color-13',
  'color-14',
  'color-15',
];
let username = '';
let userColor = '';

const getRandomColor = () => {
  const randomI = Math.floor(Math.random() * colors.length);
  return colors[randomI];
};

const commands = (msg) => {
  switch (msg) {
    case '/up':
      return '↑';
    case '/down':
      return '↓';
    case '/left':
      return '←';
    case '/right':
      return '→';
    default:
      const newMsg = msg
        .replace(':)', '😸')
        .replace(':(', '😿')
        .replace('<3', '😻');
      return newMsg;
  }
};

sendMessage.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('newMessage', {
    message: messageInput.value,
    username: username,
    userScore: snake.tail.length + 1,
    userColor: userColor,
  });

  messageInput.value = '';
});

socket.on('newMessage', (data) => {
  const msg = document.createElement('li');
  const user = document.createElement('span');
  const text = document.createTextNode(`: ${commands(data.message)}`);
  user.classList.add(data.userColor);

  if (data.message === '/up') {
    snake.move(0, -1);
  } else if (data.message === '/down') {
    snake.move(0, 1);
  } else if (data.message === '/right') {
    snake.move(1, 0);
  } else if (data.message === '/left') {
    snake.move(-1, 0);
  }

  user.textContent = `${data.username}`;
  msg.append(user);
  msg.append(text);
  if (data.message.indexOf(`@${username}`) !== -1) {
    msg.classList.add('tagged');
  }
  messageList.append(msg);
});

socket.on('scoreUpdate', (data) => {
  const sortedUsersByScore = Object.entries(data).sort((a, b) => b[1] - a[1]);

  scoreList.innerHTML = '';

  sortedUsersByScore.forEach((user) => {
    const li = document.createElement('li');
    li.addEventListener('click', () => {
      messageInput.value += `@${li.textContent.split(':')[0]}`;
    });
    li.innerHTML = `${user[0]}: ${user[1]}`;
    scoreList.append(li);
  });
});

setInterval(function() {
  const element = document.getElementById('messageList');
  element.scrollTop = element.scrollHeight - element.clientHeight;
  socket.emit('scoreUpdate', {
    username: username,
    userScore: snake.tail.length + 1,
  });
}, 500);

window.onload = () => {
  username =
    prompt('Username:') || `Anonymous#${Math.floor(Math.random() * 9999) + 1}`;
  userColor = getRandomColor();
};
