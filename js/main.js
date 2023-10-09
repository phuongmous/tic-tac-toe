/*----- constants -----*/
const colors = {
    null: "white",
    "1": "rgb(246, 207, 147)",
    "-1": "rgb(3, 126, 112)"
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const squares = document.querySelectorAll(".square");
const message = document.getElementById("message");
const replayButton = document.getElementById("replayButton");

/*----- event listeners -----*/
squares.forEach(square => square.addEventListener("click", handleSquareClick));
replayButton.addEventListener("click", initializeGame);

/*----- functions -----*/
initializeGame ();
 // Initialize the game
function initializeGame () {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render ();
}
// Handle square click
function handleSquareClick (event) {
    const squareIndex = parseInt(event.target.id);
    if (board[squareIndex] || winner !== null) {
        return;
    }

    board[squareIndex] = turn;
    turn *= -1;

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            break;
        }
    }

    if (!winner && board.indexOf(null) === -1) {
        winner = "T";
    }

    render();
}
 // Render the game state
function render() {
    squares.forEach((square, index) => {
        square.style.backgroundColor = colors[board[index]];
        square.textContent = board[index] === 1 ? "X" : board[index] === -1 ? "O" : "";
    });

    if (winner === "T") {
        message.textContent = "Wow! It's a tie!";
    } else if (winner !== null) {
        message.textContent = `${winner === 1 ? "X" : "O"} wins!`;
    } else {
        message.textContent = `${turn === 1 ? "X" : "O"}'s turn`;
    }
}


