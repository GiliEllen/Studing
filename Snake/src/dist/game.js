console.log("Connected!");
// Get canvas from html
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var SnakePart = /** @class */ (function () {
    function SnakePart(x, y) {
        this.x = x;
        this.y = y;
    }
    return SnakePart;
}());
// Declared veriables
var speed = 7; // Define speed of game. ++faster, --slower
var tileCount = 20; // Defines size of tile
var tileSize = canvas.width / tileCount - 2; // Define size of snake = smaller
var headX = 10; // Defines head of snake X location
var headY = 10; // Defines head of snake Y location
var snakeParts = [];
var tailLength = 2;
var changeXPosition = 0; // Var to help reposition snake
var changeYPosition = 0; // Var to help reposition snake
var appleX = 5;
var appleY = 5;
var moveDirection = null; // Current moving direction
var requestedMoveDirection = null; // Requested moving direction
var pointsCounter = 0;
// Object that defines moving directions numbers
var movingDirection = {
    right: 0,
    down: 1,
    left: 2,
    up: 3
};
// The functions that runs the game, 
// 1) clears the screen to black
// 2) draws snake
// 3) if the game is not over allow the snake to move
//    and get new moving directions from player
// 4) Checks for collisions - incomplete!
function gameLoop() {
    changeSnakePosition();
    var result = isGameOver();
    if (result) {
        ctx.fillStyle = 'red';
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 7, canvas.height / 2);
        ctx.font = "30px Verdana";
        ctx.fillText("Your score is: " + pointsCounter, canvas.width / 5, canvas.height / 1.5);
        return;
    }
    clearScreen();
    checkApplecollision();
    drawApple();
    drawSnake();
    checkTailHeadCollision();
    drawScore();
    setTimeout(gameLoop, 1000 / speed);
}
function isGameOver() {
    var gameOver = false;
    if (changeXPosition === 0 && changeYPosition === 0) {
        return false;
    }
    if (headX < 0 || headX > tileCount - 1 || headY < 0 || headY > tileCount - 1) {
        gameOver = true;
    }
    for (var i = 0; i < snakeParts.length; i++) {
        if (headX === snakeParts[i].x && headY === snakeParts[i].y) {
            gameOver = true;
            break;
        }
    }
    return gameOver;
}
// Function:fill the screen in black rectengle
function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Function: Draw the snake via given location
function drawSnake() {
    ctx.fillStyle = 'purple';
    for (var i = 0; i < snakeParts.length; i++) {
        var part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = 'pink';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
// Function:
// Checks moving direction
// Changes X or Y acordenly
function changeSnakePosition() {
    headX = headX + changeXPosition;
    headY = headY + changeYPosition;
}
document.body.addEventListener('keydown', moveSnake);
function moveSnake(event) {
    if (event.key === 'ArrowRight') {
        if (changeXPosition === -1) {
            return;
        }
        else {
            changeXPosition = 1;
            changeYPosition = 0;
        }
    }
    else if (event.key === 'ArrowLeft') {
        if (changeXPosition === 1) {
            return;
        }
        else {
            changeXPosition = -1;
            changeYPosition = 0;
        }
    }
    else if (event.key === 'ArrowUp') {
        if (changeYPosition === 1) {
            return;
        }
        else {
            changeYPosition = -1;
            changeXPosition = 0;
        }
    }
    else if (event.key === 'ArrowDown') {
        if (changeYPosition === -1) {
            return;
        }
        else {
            changeYPosition = 1;
            changeXPosition = 0;
        }
    }
}
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
function checkApplecollision() {
    if (appleX === headX && appleY === headY) {
        pointsCounter++;
        appleX = randomNumber(0, tileCount);
        appleY = randomNumber(0, tileCount);
        snakeParts.forEach(function (part) {
            if (part.x === appleX && part.y === appleY) {
                appleX = randomNumber(0, tileCount);
                appleY = randomNumber(0, tileCount);
            }
        });
        tailLength++;
    }
}
function checkTailHeadCollision() {
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max + min) - min);
}
function addTail() {
    ctx.fillStyle = "purple";
    ctx.fillRect(headX * (tileCount - 1), headY * (tileCount - 1), tileSize, tileSize);
}
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText("Score is " + pointsCounter, canvas.width - 100, 10);
}
// Run the game
gameLoop();
