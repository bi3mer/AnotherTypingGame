const characters = 'abcdefghijklmnopqrstuvwxyz';
let wordsTyped, timeElapsed, word, timer = null, timeVal, allowCapitals;

function currentTime() {
  return (new Date()).getTime();
}

function generateNonsenseWord(size) {
  let string = '';
  for(var i = 0; i < size; ++i) {
    let char = characters[Math.floor(Math.random() * characters.length)];
    if(allowCapitals === true && Math.random() > 0.5) {
      char = char.toUpperCase()
    }
    
    string += char;
  }

  return string;
}

function setUpNextWord() {
  if(timer !== null) {
    clearInterval(timer);
  }

  timeVal = 5;
  document.getElementById('timer').innerText = timeVal;

  timer = setInterval(() => {
    timeVal -= 1;
    timeElapsed += 1;
    document.getElementById('timer').innerText = timeVal;

    if(timeVal <= 0) {
      endGame();
    }
  }, 1000);

  wordsTyped += 1;
  word = generateNonsenseWord(wordsTyped + 1, true);
  document.getElementById('textHere').innerText = word;
};

function runGame() {
  allowCapitals = document.getElementById('allowCapitals').checked;
  console.log(allowCapitals);
  timeElapsed = 0;
  wordsTyped = -1;

  document.getElementById('words').focus();
  setUpNextWord();
}

function endGame() {
  if(timer !== null) {
    clearInterval(timer);
  }

  document.getElementById('game').style.display = "none";

  const resultText = `You successfully typed ${wordsTyped} nonsense words in ${timeElapsed} seconds without any errors!`
  document.getElementById('endResults').innerText = resultText;
  document.getElementById('end').style.display = "";
}

document.getElementById('startButton').onclick = () => {
  document.getElementById('menu').style.display = "none";
  document.getElementById('game').style.display = "";

  runGame();
};

document.getElementById('restartButton').onclick = () => {
  document.getElementById('end').style.display = "none";
  document.getElementById('game').style.display = "";

  runGame();
};