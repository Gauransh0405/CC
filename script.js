var canvas;
var context;
var foodPos = [
  Math.floor(Math.random() * 100) * 10,
  Math.floor(Math.random() * 60) * 10
];
var snakePos = [100, 50];
var snakeBody = [[100, 50], [90, 50], [80, 50]];
var direction = "ArrowRight";
var speed;
var block = 10;
var over = false;
var score = 0;
var highscore = 0;
var framesPerSecond = 1000 / 30;




const death = document.getElementById('death');
const foodSound = document.getElementById('foodSound');
const music = document.getElementById('music');






function playdeath() {
  death.play(); 
}
function playfoodSound() {
  foodSound.play();
}
function playmusic() { 
  music.play(); 
} 
function pausemusic() { 
  music.pause(); 
} 



window.onload = () => {
  playmusic();
  
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  setInterval(() => {
    drawObjects();
    snakeAnimation();
    eatFood();
  }, framesPerSecond);
  document.addEventListener('keydown', snakeDirection, false);
  document.addEventListener('mousedown', () => {
    if (over) {
      resetGame();
      playmusic();
    }
  });
};

function drawObjects() {
  createRectangle(0, 0, canvas.width, canvas.height, 'rgb(0, 0, 0)');
  createRectangle(foodPos[0], foodPos[1], block, block, 'rgb(255, 0, 0)');
  snakeBody.splice(0, 0, [snakePos[0], snakePos[1]]);
  for (var i = 0; i < snakeBody.length; i++) {
    var body = snakeBody[i];
    createRectangle(body[0], body[1], block, block, 'rgb(255,255,255)');
  }
  context.font = '25px sans-serif';
  context.fillText('Score: ' + score, 20, 30);
  context.fillText('High Score: ' + highscore, 20, 60);

  if (over) {
    displayMessage('Game Over');

  }
}

function snakeDirection(event) {
  changeTo = event.key;
  switch (changeTo) {
    case 'ArrowDown':
      if (direction != 'ArrowUp') {
        direction = 'ArrowDown';
      }
      break;
    case 'ArrowUp':
      if (direction != 'ArrowDown') {
        direction = 'ArrowUp';
      }
      break;
    case 'ArrowLeft':
      if (direction != 'ArrowRight') {
        direction = 'ArrowLeft';
      }
      break;
    case 'ArrowRight':
      if (direction != 'ArrowLeft') {
        direction = 'ArrowRight';
      }
      break;
    default:
      console.log('No matching direction');
      return;
  }
}

function snakeAnimation() {
  if (over) {
    return;
  }

  switch (direction) {
    case 'ArrowDown':
      snakePos[1] += 10;
      break;
    case 'ArrowUp':
      snakePos[1] -= 10;
      break;
    case 'ArrowLeft':
      snakePos[0] -= 10;
      break;
    case 'ArrowRight':
      snakePos[0] += 10;
      break;
    default:
      console.log("Didn't animate");
      return;
  }

  gameOver();
}

function eatFood() {
  if (snakePos[0] == foodPos[0] && snakePos[1] == foodPos[1]) {
    foodPos = [
      Math.floor(Math.random() * 72) * 10,
      Math.floor(Math.random() * 48) * 10
    ];
    playfoodSound();
    score += 1;
    
    if(score>highscore){
      highscore = score;
      localStorage.setItem("highscore", JSON.stringify(highscore));
      highscore.innerHTML = "High SScore: " + highscore;
    }  
   
    
   
  } else {
    snakeBody.pop();
  }
}

function gameOver() {
  if (snakePos[0] > canvas.width - 10 || snakePos[0] < 0) {
    over = true;
  } else if (snakePos[1] > canvas.height - 10 || snakePos[1] < 0) {
    over = true;
  }

  for (var i = 3; i < snakeBody.length; i++) {
    var body = snakeBody[i];
    if (snakePos[0] == body[0] && snakePos[1] == body[1]) {
      over = true;
    }
  }

  if (over) {
    playdeath(); 
    pausemusic();
  }
}

function resetGame() {
  foodPos = [
    Math.floor(Math.random() * 72) * 10,
    Math.floor(Math.random() * 48) * 10
  ];
  snakePos = [100, 50];
  snakeBody = [[100, 50], [90, 50], [80, 50]];  
  over = false;
  score = 0;
  direction = 'ArrowRight';
}

function createRectangle(posX, posY, width, height, color) {
  context.fillStyle = color;
  context.fillRect(posX, posY, width, height);
}

function displayMessage(message) {
  context.fillStyle = 'rgb(255,255,255)';
  context.font = '50px sans-serif';
  context.fillText(message, 365, 300);
  context.font = '25px sans-serif';
  context.fillText('Click to continue', 400, 350);
}
