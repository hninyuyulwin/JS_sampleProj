let fruits = [
  "APPLE",
  "GUAVA",
  "MANGO",
  "ORANGE",
  "WATERMELON",
  "LYCHEE",
  "LIME",
  "MELON",
  "AVOGADO",
  "PEACH",
  "LEMON"
];


let keyboard = document.getElementById("keyboard");
let chance = 6;

let answer = "";

let guessAns = [];
let wordsStatus = "";

let picStatus = 0;

// keyboard generate
function btnDiv(){
  keyboard.innerHTML = "";
  let keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter)=>{
    keyboard.innerHTML += `<button id="${letter}" class="btn btn-outline-secondary m-2" onclick="checkAnswer('${letter}')">${letter}</button>`;
  });
}

document.getElementById("chance").innerText = chance;

// answer generate
function generateAnswer(){
  answer = fruits[Math.floor(Math.random()*fruits.length)];
  console.log(answer);
}

// answer Field Generate
function showAnswerField(){
  wordsStatus = answer
  .split("")
  .map((letter) => (guessAns.indexOf(letter) >= 0 ? letter  :" _ ")).join("");
  document.getElementById("answerField").innerHTML = wordsStatus;
}

// check keyboard click function
function checkAnswer(letter){
 guessAns.indexOf(letter) === -1 ? guessAns.push(letter) : null;
 document.getElementById(letter).setAttribute("disabled",true);
 if (answer.indexOf(letter) >= 0) {
  showAnswerField();
  setTimeout(checkWin,500);
 } else if(answer.indexOf(letter) === -1) {
    chance--;
    picStatus++;
    updateChance();
    checkHangMan();
    setTimeout(checkLose,500);
 }
}

function updateChance(){
  document.getElementById("chance").innerText = chance;
}

function checkWin(){
  if (wordsStatus == answer) {
    Swal.fire({
      title: 'Congragulation',
      text: 'You won the game',
      imageUrl: './images/Congratulations.gif',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Congragulation Image',
      confirmButtonText : "Play Again"
    }).then(()=>{
      restart();
    });
  }
}

function checkLose(){
  if (chance == 0) {
    Swal.fire({
      title: 'Try Again',
      text: 'Answer is : '+answer,
      imageUrl: './images/lost.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Lose Image',
      confirmButtonText : "Play Again"
    }).then(()=>{
      restart();
    });
  }
}

function checkHangMan(){
  document.getElementById("hangman").src = `./images/${picStatus}.jpg`;
}

function restart(){
  chance = 6;
  answer = "";
  wordsStatus = null;
  guessAns = [];
  generateAnswer();
  showAnswerField();
  updateChance();
  btnDiv();
  picStatus = 0;
  document.getElementById("hangman").src = `./images/0.jpg`;
}

btnDiv();
generateAnswer();
updateChance();
showAnswerField();