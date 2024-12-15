let boxes = document.querySelectorAll('.box');
let resetbox = document.querySelector('.reset');
let newbtn = document.querySelector(".newgame");
let wincont = document.querySelector(".cont");
let massege = document.querySelector(".msg");
let turnO = true;

// Winning patterns for Tic Tac Toe
const winningpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

// Reset the game
const resetgame = (event) => {
  if (event) event.preventDefault(); // Prevent default behavior if triggered by a button
  turnO = true;
  enableBoxes();
  wincont.classList.add("hidden");
  massege.innerText = ""; // Clear the message
};

// Add click listeners to each box
boxes.forEach((box) => {
  box.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent any default browser behavior

    // Prevent overwriting existing moves
    if (box.innerText !== '') return;

    // Update box content and toggle turn
    if (turnO) {
      box.innerHTML = 'O';
      turnO = false;
    } else {
      box.innerText = 'X';
      turnO = true;
    }

    box.disabled = true; // Disable the clicked box
    checkwinner(); // Check if there is a winner or a draw
  });
});

// Disable all boxes
const disabledboxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes (for resetting the game)
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = ""; // Clear box content
  });
};

// Show the winner
const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  wincont.classList.remove("hidden");
  disabledboxes();
};

// Check for a winner or draw
const checkwinner = () => {
  for (let pattern of winningpattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    // Check if the current pattern matches
    if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1); // Display the winner
      return; // Exit the function if there is a winner
    }
  }

  // Check for a draw
  if ([...boxes].every((box) => box.innerText !== '')) {
    msg.innerText = "It's a Draw!";
    wincont.classList.remove("hidden");
  }
};

// Add event listeners for reset and new game buttons
newbtn.addEventListener("click", resetgame);
resetbox.addEventListener("click", resetgame);
