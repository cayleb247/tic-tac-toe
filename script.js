const gameBoard = (function () {
    let positions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const placeMarker = (marker, pos) => positions[pos] = marker
    return { positions, placeMarker }
})();

gameBoard.placeMarker("X", 2);
gameBoard.placeMarker("X", 4);
gameBoard.placeMarker("X", 6);
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
            return `${marker} has won!`
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
            return `${marker} has won!`
        }
    }

    // check diagonals
    if (positions[0] && positions[4] && positions[8] == marker
        || positions[2] && positions[4] && positions[6] == marker
    ) {
        return `${marker} has won!`
    }

}

console.log(checkWin("X"));