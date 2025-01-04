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
            return alert(`${marker} has won!`)
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
            return alert(`${marker} has won!`)
        }
    }

    // check diagonals
    if (positions[0] && positions[4] && positions[8] == marker
        || positions[2] && positions[4] && positions[6] == marker
    ) {
        return alert(`${marker} has won!`)
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

const playGame = function () {
    let loadSquares = 1;
    let turn = "X"; // keep track of who's turn it is

    while (loadSquares == 1) {
        if (turn == "X") {
            for (const square of document.querySelectorAll(".square")) {
                square.addEventListener("click", () => {
                    if (square.innerText != "X" || "O" ) {
                        square.innerText = "X";
                        turn = "O"; // change turns
                        gameBoard.getGameBoard(); // log the current board
                        renderGrid()
                        checkWin("X");
                        loadSquares = 1;
                    }
                });
                loadSquares = 0;
            }
        }
        if (turn == "O") {
            for (const square of document.querySelectorAll(".square")) {
                square.addEventListener("click", () => {
                    if (square.innerText != "X" || "O" ) {
                        square.innerText = "O";
                        turn = "X"; // change turns
                        gameBoard.getGameBoard();
                        renderGrid();
                        checkWin("O");
                        loadSquares = 1;
                    }
                });
                loadSquares = 0;
            }
        }
    }
}

playGame();
