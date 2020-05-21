const characters = 'abcdefghijklmnopqrstuvwxyz';
let state, wordIndex, wordsTyped, timeElapsed, word, timer = null, timeVal, allowCapitals;
state = 'menu';

// use cookie to auto-select use capitals
(() => {
  const cookies = document.cookie.split(';');
  for(let cookie of cookies) {
    console.log(typeof cookie);
    if(cookie.includes('capitals')) {
      allowCapitals = cookie.split('=')[1] === 'true' ? true : false;
      document.getElementById('allowCapitals').checked = allowCapitals;
    }
  }
})();


// Generates a nonsense words. global for allow capitals defines whether or not
// a character is converted to upper case. 50% chance hardcoded into code.
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

// update UI, remove timer if it exists and create a new one, generate the word
// that the user has to type, and update UI.
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

// state update, UI update, global variable update, and then start the game.
function runGame() {
  state = 'game';
  timeElapsed = 0;
  wordsTyped = -1;

  allowCapitals = document.getElementById('allowCapitals').checked; 
  document.cookie = `capitals=${allowCapitals};`;

  document.getElementById('words').focus();
  setUpNextWord();
}

// Will update state, end timer, then make UI updates including putting in the
// player's results from game play.
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

// on click to start button in start menu, UI updates and then state update.
document.getElementById('startButton').onclick = () => {
  document.getElementById('menu').style.display = "none";
  document.getElementById('game').style.display = "";

  runGame();
};

// On click to restart button, UI updates and then state updates.
document.getElementById('restartButton').onclick = () => {
  document.getElementById('end').style.display = "none";
  document.getElementById('game').style.display = "";

  runGame();
};

// When a character is input into the words input field, this will auto-check
// whether or not the key is valid and either allow the user to continue 
// typing or end the game.
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

// On key press for enter, the user will auto play the game if either in the menu
// or end game state.
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
