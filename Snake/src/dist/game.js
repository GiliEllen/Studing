console.log("Connected!");
// Get canvas from html
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
// Declared veriables
var speed = 5; // Define speed of game. ++faster, --slower
var tileCount = 20; // Defines size of tile
var tileSize = canvas.width / tileCount - 2; // Define size of snake = smaller
var headX = 10; // Defines head of snake X location
var headY = 10; // Defines head of snake Y location
var changeXPosition = 0; // Var to help reposition snake
var changeYPosition = 0; // Var to help reposition snake
var moveDirection = null; // Current moving direction
var requestedMoveDirection = null; // Requested moving direction
var gameover = false; // Is game over?
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
    clearScreen();
    drawSnake();
    if (!gamePause()) {
        setMoveDirection();
        moveSnake();
    }
    checkCollision();
    setTimeout(gameLoop, 1000 / speed);
}
// Function:fill the screen in black rectengle
function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Function: Draw the snake via given location
function drawSnake() {
    ctx.fillStyle = 'pink';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
// Function :
// check for keyboard event;
// readjust requested moving direction
// if requested moving direction is either opposite or same, returns
// if avleble, change the moving direction to requested.
function setMoveDirection() {
    addEventListener('keydown', function (ev) {
        ev.preventDefault();
        if (ev.key === "ArrowUp") {
            requestedMoveDirection = movingDirection.up;
            if (moveDirection === requestedMoveDirection ||
                moveDirection === movingDirection.down) {
                return;
            }
            else {
                moveDirection = requestedMoveDirection;
            }
        }
        else if (ev.key === "ArrowRight") {
            requestedMoveDirection = movingDirection.right;
            if (moveDirection === requestedMoveDirection ||
                moveDirection === movingDirection.left) {
                return;
            }
            else {
                moveDirection = requestedMoveDirection;
            }
        }
        else if (ev.key === "ArrowDown") {
            requestedMoveDirection = movingDirection.down;
            if (moveDirection === requestedMoveDirection ||
                moveDirection === movingDirection.up) {
                return;
            }
            else {
                moveDirection = requestedMoveDirection;
            }
        }
        else if (ev.key === "ArrowLeft") {
            requestedMoveDirection = movingDirection.left;
            if (moveDirection === requestedMoveDirection ||
                moveDirection === movingDirection.right) {
                return;
            }
            else {
                moveDirection = requestedMoveDirection;
            }
        }
    });
}
// Function:
// Checks moving direction
// Changes X or Y acordenly
function moveSnake() {
    headX = headX + changeXPosition;
    headY = headY + changeYPosition;
    if (moveDirection === movingDirection.right) {
        changeXPosition = 1;
        changeYPosition = 0;
    }
    else if (moveDirection === movingDirection.left) {
        changeXPosition = -1;
        changeYPosition = 0;
    }
    else if (moveDirection === movingDirection.up) {
        changeYPosition = -1;
        changeXPosition = 0;
    }
    else if (moveDirection === movingDirection.down) {
        changeYPosition = 1;
        changeXPosition = 0;
    }
}
// Function: 
// Checks if game is over 
// If false, returns it
// if true, return it
// Incomplete!!
function gamePause() {
    if (gameover === false) {
        return false;
    }
    else if (gameover === true) {
        return true;
    }
}
// Incomplete Function!
function checkCollision() {
}
// Run the game
gameLoop();
