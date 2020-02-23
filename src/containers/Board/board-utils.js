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

export const getAllValidMovesForPlayer = (boardState, playerColor) => {
    const validMoves = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const key = getKey(x, y);

            if (isSquareNotEmpty(boardState, key)) {
                // skip the already taken squares
                continue;
            }

            // player will capture disks with a opposite color
            const oppositeColor = getNextPlayer(playerColor);
            const capturedDisks = getAllCapturedDisksWithColor(boardState, key, oppositeColor);
            // check if the player has valid oppositeColor
            if (capturedDisks.length > 0) {
                validMoves.push(key);
            }
        }
    }

    return validMoves;
};

export const getAllCapturedDisksWithColor = (boardState, key, color) => {
    // get all possible directions (neighbors) for capturing disks
    const neighbors = getAllNeighborsWithColor(boardState, key, color);

    let capturedDisks = [];
    neighbors.forEach((square) => {
        const addedDisks = [];
        // calculate actual direction
        const vector = square.key - key;

        let checkedSquare = square;
        // looking for a player color disc or an empty square or the end of the board
        while (checkedSquare && checkedSquare.color === square.color) {
            addedDisks.push({...checkedSquare});
            checkedSquare = boardState[checkedSquare.key + vector];
        }

        if (checkedSquare) {
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
            const checkedSquare = boardState[key + vector];
            if (checkedSquare && checkedSquare.key !== key && checkedSquare.color === color) {
                neighbors.push({...checkedSquare})
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