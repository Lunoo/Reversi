import {getAllCapturedDisksWithColor} from './board-utils';

export const getNextMove = (possibleMoves, boardState, playerColor) => {
    let moves = [];
    possibleMoves.forEach(
        (moveKey) => {
            const capturedDisks = getAllCapturedDisksWithColor(boardState, moveKey, playerColor);

            // get number of captured disks for each valid step
            moves.push({
                key: moveKey,
                captured: capturedDisks.length
            });
        }
    );

    const maxCapturedValue = Math.max(...moves.map(move => move.captured));

    // get all moves with max number of captured disks
    moves = moves.filter(move => move.captured === maxCapturedValue);

    if (moves.length) {
        // choose random move the current array
        const randomMoveIndex = Math.floor(Math.random() * moves.length);
        return moves[randomMoveIndex].key;
    } else {
        return null;
    }
};