var Snake = (function () {
  const LEFT = "LEFT";
  const RIGHT = "RIGHT";
  const UP = "UP";
  const DOWN = "DOWN";

  var process = null,
  music = null,
  isPaused = false,
  fps = 60,
  moveBuffer = [],
  canvas = null,
  context = null,
  points = 0,
  ptsPerFood = 100,
  tileCountWidth = 20,
  tileCountHeight = 20,
  x = 10,
  y = 10,
  foodX = 15,
  foodY = 15,
  velocityX = 0,
  velocityY = 0,
  snake = [],
  snakeTail = 5,

  _allowPress = function (direction) {
    var lastMove = moveBuffer[moveBuffer.length - 1];

    switch (direction) {
      case LEFT:
      case RIGHT:
        return lastMove !== LEFT && lastMove !== RIGHT;
      case UP:
      case DOWN:
        return lastMove !== UP && lastMove !== DOWN;
    }
  },

  _onKeyDown = function (event) {
    switch (event.keyCode) {
      // left arrow key
      case 37:
        if (_allowPress(LEFT)) {
          velocityX = -1;
          velocityY = 0;
          moveBuffer.push(LEFT);
        }
        break;
      // up arrow key
      case 38:
        if (_allowPress(UP)) {
          velocityX = 0;
          velocityY = -1;
          moveBuffer.push(UP);
        }
        break;
      // right arrow key
      case 39:
        if (_allowPress(RIGHT)) {
          velocityX = 1;
          velocityY = 0;
          moveBuffer.push(RIGHT);
        }
        break;
      // down arrow key
      case 40:
        if (_allowPress(DOWN)) {
          velocityX = 0;
          velocityY = 1;
          moveBuffer.push(DOWN);
        }
        break;
      // G
      case 71:
        _unpause();
        break;
      // P
      case 80:
        _pause();
        break;
    }

    if (moveBuffer.length > 10) {
      moveBuffer.splice(0, moveBuffer.length - 1);
    }
  },

  _pause = function () {
    if (isPaused) { return; }

    isPaused = true;
    clearInterval(process);
  }

  _unpause = function () {
    if (!isPaused) { return; }

    isPaused = false;
    _render();
  },

  _renderFrame = function () {
    x += velocityX;
    y += velocityY;

    resetPos = tileCountWidth - 1;

    // if colides with boundaries
    if (x < 0) { x = resetPos; }
    if (x > resetPos) { x = 0; }
    if (y < 0) { y = resetPos; }
    if (y > resetPos) { y = 0; }

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "white";

    for (var i = 0; i < snake.length; i++) {
      context.fillRect(snake[i].x * tileCountHeight, snake[i].y * tileCountHeight, tileCountWidth - 2, tileCountWidth - 2);

      // colisão
      if (snake[i].x == x && snake[i].y == y) {
        snakeTail = 5;
      }
    }

    snake.push({x: x, y: y});
    while (snake.length > snakeTail) {
      snake.shift();
    }

    if (foodX == x && foodY == y) {
      snakeTail++;
      points += ptsPerFood;

      document.getElementById("snake-points").innerText = points;

      foodX = Math.floor(Math.random() * tileCountHeight);
      foodY = Math.floor(Math.random() * tileCountHeight);
    }

    context.fillStyle = "red";
    context.fillRect(foodX * tileCountHeight, foodY * tileCountHeight, tileCountWidth - 2, tileCountWidth - 2);
  },

  _render = function () {
    process = setInterval(_renderFrame, fps);
  },

  _boot = function () {
    canvas = document.getElementById("snake-canvas");
    context = canvas.getContext("2d");

    document.addEventListener("keydown", _onKeyDown);

    music = new Audio('lib/audio/snake-audio.ogg');
    music.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    music.play();

    _render();
  },

  _exit = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    clearInterval(process);
    music.pause();

    process = null;
    music = null;
    velocityX = 0;
    velocityY = 0;
    snake = [];
    snakeTail = 5;
  },

  setup = function () {
    var $snake = $('#open-snake');

    $snake.magnificPopup({
      type: 'inline',
      midClick: true,
    });

    $snake.on('mfpOpen', _boot);
    $snake.on('mfpClose', _exit);
  };

  return {
    setup: setup,
  };
}());
