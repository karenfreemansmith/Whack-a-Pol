const scoreboard1 = document.querySelector('.redScore');
const scoreboard2 = document.querySelector('.blueScore');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const starter = document.querySelector('#startGame');
let timeUp = false;
let lastHole;
let scoreBlue = 0;
let scoreRed = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max-min) + min);
}

function randomHole(holes) {
  const idx = Math.round(Math.random() * (holes.length-1));
  const hole = holes[idx];
  if(hole===lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(500,1000);
  const hole = randomHole(holes);

  hole.classList.add('up');
  setTimeout(()=> {
    hole.classList.remove('up');
    if(!timeUp) peep();
  }, time);
}

function startGame() {
  scoreRed=0;
  scoreBlue=0;
  scoreboard1.textContent = 0;
  scoreboard2.textContent = 0;
  timeUp = false;
  peep();
  setTimeout(()=> timeUp = true, 30000);
}

function bonk(e) {
  if(!e.isTrusted) return; //to prevent cheating
  // apparently you can also click on the invisible mole,
  // or click more than once while it's "up"
  // if classList.contains('up') did not help...

  this.classList.remove('up');
  if(e.target.classList.contains('mole2')) {
    scoreRed++;
    scoreboard1.textContent = scoreRed;
  }
  if(e.target.classList.contains('mole1')) {
    scoreBlue++;
    scoreboard2.textContent = scoreBlue;
  }

}

moles.forEach(mole => mole.addEventListener('click', bonk));
starter.addEventListener('click', startGame);
