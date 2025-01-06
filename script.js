const gameBoard = (function () {
    let positions = ["", "", "", "", "", "", "", "", ""];

    const getGameBoard = () => {
        squares = document.querySelectorAll(".square")
        for (let i=0; i<9; i++) {
            gameBoard.positions[i] = squares[i].innerText
        }
    }
    return { positions, getGameBoard}
})();

// gameBoard.placeMarker("X", 2);
// gameBoard.placeMarker("X", 4);
// gameBoard.placeMarker("X", 6);
console.log(gameBoard.positions);

const checkWin = function (marker) {
    let positions = gameBoard.positions;

    // check columns first
    for (let column=0; column<3; column++) { // check all three columns
        let colScore = 0; // variable to tell if 3 in a row has been reached
        for (let i=column; i<=(6+column); i+=3) {
            if (positions[i] == marker) {
                colScore += 1;
            }
        }
        if (colScore == 3) {
            return true
        }
    }

    // check rows
    for (let row=0; row<=6; row+=3) {
        let rowScore = 0;
        for (let i=row; i<(row+3); i++) {
            if (positions[i] == marker) {
                rowScore += 1;
            }
        }
        if (rowScore == 3) {
            return true
        }
    }

    // check diagonals
    if (positions[0] == marker && positions[4] == marker && positions[8] == marker || 
        positions[2] == marker && positions[4] == marker && positions[6] == marker
    ) {
        return true
    }
}

const renderGrid = function () {
    squares = document.querySelectorAll(".square")
    positions = gameBoard.positions
    for (let i=0; i<9; i++) {
        squares[i].innerText = positions[i]
    }
}

// Bug: turns are never switched. O's can never be placed.

const createSquares = function () {
    const gridContainer = document.querySelector(".grid-container")
    for (let i=0; i<9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        gridContainer.appendChild(square);
    }

}

const removeSquares = function () {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

const loadSquaresX = function () {
    console.log(gameBoard.positions)
    if (checkWin("O")) {
        gameEnd("O");
    } else {
        removeSquares();
        createSquares();
        renderGrid();
        for (const square of document.querySelectorAll(".square")) {
            square.addEventListener("click", () => {
                if (square.innerHTML != "X" && square.innerHTML != "O") {
                    square.innerText = "X";
                    gameBoard.getGameBoard(); // log the current board
                    renderGrid();
                    loadSquaresO();
                }
            }
        )};
    }
    
}

const loadSquaresO = function () {
    console.log(gameBoard.positions)
    if (checkWin("X")) {
        gameEnd("X");
    } else {
        removeSquares();
        createSquares();
        renderGrid();
        for (const square of document.querySelectorAll(".square")) {
            square.addEventListener("click", () => {
                if (square.innerHTML != "X" && square.innerHTML != "O") {
                    square.innerText = "O";
                    gameBoard.getGameBoard(); // log the current board
                    renderGrid();
                    loadSquaresX();
                }
            }
        )};
    }
    
}

const resetGame = function () {

    // check if document has h3 and br element
    if (document.querySelectorAll("h3").length != 0) {
        const textBreak = document.querySelector("br");
        const winMessage = document.querySelector("h3");
        const resetButton = document.querySelector("button");
        
        winMessage.remove();
        textBreak.remove();

        resetButton.innerText = "Reset"
    }

    gameBoard.positions = ["", "", "", "", "", "", "", "", ""];
    removeSquares();
    createSquares();
    playGame();
}

const gameEnd = function (winner) {

    // Get rid of any existing event listeners after game ends
    removeSquares();
    createSquares();
    renderGrid();

    const headingContainer = document.querySelector(".heading-container")
    const resetButton = document.querySelector("button");
    const winMessage = document.createElement("h3");
    const textBreak = document.createElement("br");

    winMessage.innerText = `${winner} has won the game!`

    headingContainer.insertBefore(winMessage, resetButton);
    headingContainer.insertBefore(textBreak, winMessage);

    resetButton.innerText = "Play Again?"
}

const playGame = function () {
    const resetButton = document.querySelector("button");
    resetButton.addEventListener("click", function () {
        resetGame();
    })
    loadSquaresX();
}

playGame();
