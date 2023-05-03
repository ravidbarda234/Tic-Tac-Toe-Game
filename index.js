let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let X_INPUT = document.getElementById("x-input");
let O_INPUT = document.getElementById("o-input");
const SUBMIT_BTN = document.getElementById("submit");

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

function submitForm() {
  const input1Value = document.getElementById("x-input").value;
  const input2Value = document.getElementById("o-input").value;
  document.getElementById(
    "output"
  ).innerHTML = `x:${input1Value} V.S o:${input2Value}`;
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";
  input1Value.style.display = "none";
}

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

startGame();
