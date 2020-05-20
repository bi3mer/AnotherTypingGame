const characters = 'abcdefghijklmnopqrstuvwxyz';
let state, wordIndex, wordsTyped, timeElapsed, word, timer = null, timeVal, allowCapitals;
state = 'menu';

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
  document.getElementById('words').value = '';

  if(timer !== null) {
    clearInterval(timer);
  }

  wordIndex = 0;
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
  state = 'game';
  allowCapitals = document.getElementById('allowCapitals').checked;
  timeElapsed = 0;
  wordsTyped = -1;

  document.getElementById('words').focus();
  setUpNextWord();
}

function endGame() {
  state = 'end';
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

document.getElementById('words').oninput = (data) => {
  if(word[wordIndex] === data.data) {
    ++wordIndex;
    if(wordIndex >= word.length) {
      setUpNextWord();
    }
  } else {
    endGame();
  }
};

document.addEventListener('keypress', (key) => {
  if(key.key === 'Enter') {
    if(state === 'menu') {
      document.getElementById('menu').style.display = "none";
      document.getElementById('game').style.display = "";

      runGame();
    } else if(state === 'end') {
      document.getElementById('end').style.display = "none";
      document.getElementById('game').style.display = "";

      runGame();
    }
  }
});