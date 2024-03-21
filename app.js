const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;

let xDirection = -4;
let yDirection = 4;

let timerId;
let score = 0;

const userStart = [230, 10];
let currentUserPosition = userStart;

const ballStart = [270, 40];
let currentBallPosition = ballStart;

//my block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// addingBlocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// drawing blocks
function drawBlocks() {
  blocks.forEach((bl) => {
    const block = document.createElement("div");
    block.classList.add("block");
    grid.appendChild(block);
    block.style.left = bl.bottomLeft[0] + "px";
    block.style.bottom = bl.bottomLeft[1] + "px";
  });
}

drawBlocks();

// add user
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
drawUser();

function drawUser() {
  user.style.left = currentUserPosition[0] + "px";
  user.style.bottom = currentUserPosition[1] + "px";
}

// add ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

function drawBall() {
  ball.style.left = currentBallPosition[0] + "px";
  ball.style.bottom = currentBallPosition[1] + "px";
}

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentUserPosition[0] > 0) {
        currentUserPosition[0] -= 10;
        drawUser();
      }
      break;

    case "ArrowRight":
      if (currentUserPosition[0] < boardWidth - blockWidth) {
        currentUserPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

// move ball
function moveBall() {
  currentBallPosition[0] += xDirection;
  currentBallPosition[1] += yDirection;
  drawBall();
  checkForCollision();
}

timerId = setInterval(moveBall, 30);

// check for Collision
function checkForCollision() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      currentBallPosition[0] > blocks[i].bottomLeft[0] &&
      currentBallPosition[0] < blocks[i].bottomRight[0] &&
      currentBallPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      currentBallPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = document.querySelectorAll(".block");
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = "YOU WIN!🎆😍";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  // check for wall hits
  if (
    currentBallPosition[0] >= boardWidth - ballDiameter ||
    currentBallPosition[0] <= 0 ||
    currentBallPosition[1] >= boardHeight - ballDiameter
  ) {
    changeDirection();
  }

  //   check for user collision
  if (
    currentBallPosition[0] > currentUserPosition[0] &&
    currentBallPosition[0] < currentUserPosition[0] + blockWidth &&
    currentBallPosition[1] > currentUserPosition[1] &&
    currentBallPosition[1] < currentUserPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  //   GAME OVER
  if (currentBallPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You Lose!";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 4 && yDirection == 4) {
    yDirection = -4;
    return;
  }
  if (xDirection === 4 && yDirection == -4) {
    xDirection = -4;
    return;
  }
  if (xDirection === -4 && yDirection == -4) {
    yDirection = 4;
    return;
  }
  if (xDirection === -4 && yDirection == 4) {
    xDirection = 4;
    return;
  }
}
