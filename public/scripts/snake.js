let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d', {
  alpha: true,
});
let cellSize = canvas.width / 20;
let fps = 10;

let snake = {
  x: 10 * cellSize,
  y: 10 * cellSize,
  xSpeed: 0,
  ySpeed: 0,
  tail: [],

  move: function(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  },

  update: function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i].x = this.tail[i + 1].x || this.x;
      this.tail[i].y = this.tail[i + 1].y || this.y;
    }

    if (this.tail.length > 0) {
      this.tail[this.tail.length - 1].x = this.x;
      this.tail[this.tail.length - 1].y = this.y;
    }

    this.x = this.x + this.xSpeed * cellSize;
    this.y = this.y + this.ySpeed * cellSize;

    if (
      this.x > canvas.width - cellSize ||
      this.x < 0 ||
      this.y > canvas.height - cellSize ||
      this.y < 0
    ) {
      this.xSpeed = this.xSpeed * -1;
      this.ySpeed = this.ySpeed * -1;
    }
  },

  show: function() {
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, cellSize, cellSize);
    }
    ctx.fillRect(this.x, this.y, cellSize, cellSize);
  },
};

let fruit = {
  x: Math.floor(Math.random() * 20 + 1) * cellSize - cellSize,
  y: Math.floor(Math.random() * 20 + 1) * cellSize - cellSize,

  getNewPos: function() {
    this.x = Math.floor(Math.random() * 20 + 1) * cellSize - cellSize;
    this.y = Math.floor(Math.random() * 20 + 1) * cellSize - cellSize;
  },

  show: function() {
    ctx.fillRect(this.x, this.y, cellSize, cellSize);
  },
};

const setup = () => {
  canvas.width = 300;
  canvas.height = 300;
  ctx.font = '20px monospace';
};

const draw = () => {
  setTimeout(function() {
    window.requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (
      !(
        snake.x > fruit.x ||
        snake.x < fruit.x ||
        snake.y > fruit.y ||
        snake.y < fruit.y
      )
    ) {
      fruit.getNewPos();
      snake.tail.push({
        x: snake.x,
        y: snake.y,
      });
    }
    ctx.fillStyle = '#EC412F';
    fruit.show();
    ctx.fillStyle = '#000000';
    snake.update();
    snake.show();
  }, 1000 / fps);
};

setup();
draw();
