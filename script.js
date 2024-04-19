let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let singlePlayerMode = false;

function makeMove(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;
        if (checkWinner()) {
            document.getElementById("result").innerText = `${currentPlayer} wins!`;
        } else if (!gameBoard.includes("")) {
            document.getElementById("result").innerText = "It's a draw!";
        } else {
            if (!singlePlayerMode) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            } else {
                makeAIMove();
            }
        }
    }
}


function makeAIMove() {
    // Simple AI logic: find the first empty cell and place opposite symbol there
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === "") {
        const opponentSymbol = currentPlayer === "X" ? "O" : "X";
        gameBoard[i] = opponentSymbol;
        document.getElementsByClassName("cell")[i].innerText = opponentSymbol;
  
        // Check winner using opponentSymbol (AI's move)
        if (checkWinner(opponentSymbol)) {
          document.getElementById("result").innerText = `${opponentSymbol} wins!`;
          break;
        } 
  
        // Check for draw after all cells are filled
        if (!gameBoard.includes("")) {
          document.getElementById("result").innerText = "It's a draw!";
        }
  
        // Update UI with current player symbol (X remains yours)
        document.getElementById("currentPlayer").innerText = currentPlayer;
  
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players after checking
        break;
      }
    }
  }
  
  
  




function switchToSinglePlayer() {
    singlePlayerMode = true;
    resetGame();
}

function switchToTwoPlayer() {
    singlePlayerMode = false;
    resetGame();
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("result").innerText = "";
    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerText = "";
    }
}

function undoMove() {
    const lastMoveIndex = gameBoard.lastIndexOf("X") !== -1 ? gameBoard.lastIndexOf("X") : gameBoard.lastIndexOf("O");
    if (lastMoveIndex !== -1) {
        gameBoard[lastMoveIndex] = "";
        document.getElementsByClassName("cell")[lastMoveIndex].innerText = "";
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}
