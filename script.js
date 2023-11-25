import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("comet"))
const playerwall = new Paddle(document.getElementById("playerwall"))
const computerwall = new Paddle(document.getElementById("computerwall"))
const playerScoreElem = document.getElementById("playerpoints")
const computerScoreElem = document.getElementById("computerpoints")

let lastTime


function lost() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

let score=0

function Lose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    handleGameEnd()
    localStorage.setItem("scoreCard",parseInt(playerScoreElem.textContent) )

  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  ball.reset()
  computerwall.reset()
}
function handleGameEnd() {

    if (parseInt(playerScoreElem.textContent) === 5) {
      console.log("Player won!");
      window.location.href = './gameover.html'
    } else {
      console.log("Computer won!");
      
    }
  
    
  }
  handleGameEnd()

document.addEventListener("mousemove", t => {
  playerwall.position = (t.y / window.innerHeight) * 100
})

window.requestAnimationFrame(start)
var timer = document.getElementById("timer")
var time = 60

var timerId;
function showtimer() {
    time = 60
    timer.innerText = time
    timerId = setInterval(() => {
        time--
        if (time == 0) window.location.href = './gameover.html'
        timer.innerText = time

    }, 1000)
}

showtimer()
var sound = new Audio("/music.mp3");
sound.loop=true;
sound.play();


let moveDirection = null;



function startMoving(direction) {
  moveDirection = direction;
}

function stopMoving() {
  moveDirection = null;
}


document.getElementById("up").addEventListener("touchstart", (event) => {
  event.preventDefault(); // Prevent default touch behavior
  startMoving('up');
});

document.getElementById("down").addEventListener("touchstart", (event) => {
  event.preventDefault(); // Prevent default touch behavior
  startMoving('down');
});

document.getElementById("up").addEventListener("touchend", stopMoving);
document.getElementById("down").addEventListener("touchend", stopMoving);

// Modify the start function to handle paddle movement based on the button press
function start(time) {
  if (lastTime != null) {
    const change = time - lastTime;
    ball.update(change, [playerwall.rect(), computerwall.rect()]);
    computerwall.update(change, ball.y);

    if (lost()) Lose();
  }

  // Move the player paddle based on the button press
  if (moveDirection === "up") {
    playerwall.position = Math.max(playerwall.position - 1, 0);
  } else if (moveDirection === "down") {
    playerwall.position = Math.min(playerwall.position + 1, 100);
  }

  lastTime = time;
  window.requestAnimationFrame(start);
}
var store = localStorage.getItem("nick");
var head = document.getElementsByClassName("nam");
head[0].innerHTML= store;
