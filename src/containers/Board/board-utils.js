const BOARD_SIZE = 8;

export const copyBoardState = (state) => {
    const newState = {...state};
    Object.values(newState).forEach((square) => {
        newState[square.key] = {...square};
    });

    return newState;
};

export const isSquareNotEmpty = (boardState, key) => {
    return !!boardState[key]?.isNotEmpty;
};

export const getAllValidMovesForPlayer = (boardState, nextPlayerColor) => {
    const possibleMoves = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const key = getKey(x, y);

            if (isSquareNotEmpty(key)) {
                // skip the already taken squares
                continue;
            }

            // next player will capture disks with a color equal to currentPlayerColor
            const currentPlayerColor = getNextPlayer(nextPlayerColor);
            const capturedDisks = getAllCapturedDisksWithColor(boardState, key, currentPlayerColor);
            // check if the player has valid moves
            if (capturedDisks.length > 0) {
                possibleMoves.push(key);
            }
        }
    }

    return possibleMoves;
};

export const getAllCapturedDisksWithColor = (boardState, key, color) => {
    // get all possible directions (neighbors) for capturing disks
    const neighbors = getAllNeighborsWithColor(boardState, key, color);

    let capturedDisks = [];
    neighbors.forEach((square) => {
        const addedDisks = [];
        // calculate actual direction
        const vector = square.key - key;

        let squareToCheck = square;
        // looking for a player color disc or an empty square or the end of the board
        while (squareToCheck && squareToCheck.color === square.color) {
            addedDisks.push({...squareToCheck});
            squareToCheck = boardState[squareToCheck.key + vector];
        }

        if (squareToCheck) {
            // if such a disk is located - add all the passed disks to the array of captured
            capturedDisks = [
                ...capturedDisks,
                ...addedDisks
            ]
        }
    });

    return capturedDisks;
};

const getAllNeighborsWithColor = (boardState, key, color) => {
    const neighbors = [];
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            const vector = getKey(x, y);
            const square = boardState[key + vector];
            if (square && square.key !== key && square.color === color) {
                neighbors.push({...square})
            }
        }
    }

    return neighbors;
};

export const getKey = (x, y) => {
    return x * 10 + y;
};

export const getNextPlayer = (currentPlayer) => {
    return currentPlayer === 'black' ? 'white' : 'black';
};