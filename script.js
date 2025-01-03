const gameBoard = (function () {
    let positions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const placeMarker = (marker, pos) => positions[pos] = marker
    return { positions, placeMarker }
})();

gameBoard.placeMarker("X", 0);
gameBoard.placeMarker("X", 3);
gameBoard.placeMarker("X", 6);
console.log(gameBoard.positions);

const checkWin = function () {
    let positions = gameBoard.positions;
    for (let column=0; column<3; column++) {
        let colScore = 0;
        for (let i=column; i<(6+i); i+3) {
            if (positions[i] == "X") {
                colScore += 1;
            }
        }
        if (colScore == 3) {
            return "X has won!";
        }
    }
}

console.log(checkWin());