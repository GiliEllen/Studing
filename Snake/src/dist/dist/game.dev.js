"use strict";

console.log("Connected!");
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var speed = 5;
var tileCount = 20;
var tileSize = canvas.width / tileCount - 2;
var headX = 10;
var headY = 10;
var moveDirection = null;
var requestedMoveDirection = null;
var movingDirection = {
  right: 0,
  down: 1,
  left: 2,
  up: 3
};

function gameLoop() {
  clearScreen();
  drawSnake();
  setMoveDirection();
  moveSnake();
  setTimeout(gameLoop, 1000 / speed);
}

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = 'orange';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function setMoveDirection() {
  addEventListener('keydown', function (ev) {
    ev.preventDefault();

    if (ev.key === "ArrowUp") {
      requestedMoveDirection = movingDirection.up;

      if (moveDirection === requestedMoveDirection) {} else if (moveDirection === moveDirection.down) {} else {
        moveDirection = requestedMoveDirection;
      }
    } else if (ev.key === "ArrowRight") {
      requestedMoveDirection = movingDirection.right;

      if (moveDirection === requestedMoveDirection) {} else if (moveDirection === moveDirection.left) {} else {
        moveDirection = requestedMoveDirection;
      }
    } else if (ev.key === "ArrowDown") {
      requestedMoveDirection = movingDirection.down;

      if (moveDirection === requestedMoveDirection) {} else if (moveDirection === moveDirection.up) {} else {
        moveDirection = requestedMoveDirection;
      }
    } else if (ev.key === "ArrowLeft") {
      requestedMoveDirection = movingDirection.left;

      if (moveDirection === requestedMoveDirection) {} else if (moveDirection === movingDirection.right) {} else {
        moveDirection = requestedMoveDirection;
      }
    }
  });
}

function moveSnake() {
  if (moveDirection === movingDirection.right) {
    headX++;
  } else if (moveDirection === movingDirection.left) {
    headX--;
  } else if (moveDirection === movingDirection.up) {
    headY--;
  } else if (moveDirection === movingDirection.down) {
    headY++;
  }
}

gameLoop();