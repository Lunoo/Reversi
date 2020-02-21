import React, {useState, useEffect, useCallback} from 'react';

import styles from './Board.module.scss';
import Square from '../../components/Square/Square';
import {
    copyBoardState,
    getAllCapturedDisksWithColor,
    getAllValidMovesForPlayer,
    getKey,
    getNextPlayer,
    isSquareNotEmpty
} from './board-utils';
import {getNextMove} from './robot-newbie';

const BOARD_SIZE = 8;

const Board = props => {
    const [currentPlayer, setCurrentPlayer] = useState('black');
    const [squares, setSquares] = useState(
        {
            33: {
                key: 33,
                isNotEmpty: true,
                color: 'white',
                mayBeCaptured: false
            },
            44: {
                key: 44,
                isNotEmpty: true,
                color: 'white',
                mayBeCaptured: false
            },
            34: {
                key: 34,
                isNotEmpty: true,
                color: 'black',
                mayBeCaptured: false
            },
            43: {
                key: 43,
                isNotEmpty: true,
                color: 'black',
                mayBeCaptured: false
            }
        }
    );
    const [validMoves, setValidMoves] = useState([32, 23, 54, 45]);

    const changeTotalScore = (boardState) => {
        const boardStateArray = Object.values(boardState);
        const totalDisks = boardStateArray.length;
        let blackScore = boardStateArray.reduce((sum, square) => {
            return square.color === 'black' ? sum + 1 : sum;
        }, 0);

        return {
            black: blackScore,
            white: totalDisks - blackScore
        };
    };

    const showCapturedDisks = (key) => {
        if (isSquareNotEmpty(key)) {
            return;
        }

        const newBoardState = copyBoardState(squares);
        const newColor = getNextPlayer(currentPlayer);
        const squaresToBeCaptured = getAllCapturedDisksWithColor(newBoardState, key, newColor);

        if (!squaresToBeCaptured.length) {
            return;
        }

        squaresToBeCaptured.forEach((square) => {
            newBoardState[square.key].mayBeCaptured = true;
        });

        setSquares(newBoardState);
    };

    const hideCapturedDisks = () => {
        const newBoardState = copyBoardState(squares);
        Object.values(newBoardState).forEach((square) => {
            square.mayBeCaptured = false;
        });

        setSquares(newBoardState);
    };

    const squareClicked = useCallback((key) => {
        if (!validMoves.includes(key)) {
            return;
        }

        let nextPlayer = getNextPlayer(currentPlayer);
        const newBoardState = copyBoardState(squares);
        const capturedDisks = getAllCapturedDisksWithColor(newBoardState, key, nextPlayer);

        // add new disk
        newBoardState[key] = {
            key: key,
            isNotEmpty: true,
            color: currentPlayer
        };

        // change color of captured disks
        capturedDisks.forEach((disk) => {
            newBoardState[disk.key].color = currentPlayer;
            newBoardState[disk.key].mayBeCaptured = false;
        });

        // update allowable squares for the next player
        let possibleMoves = getAllValidMovesForPlayer(newBoardState, nextPlayer);

        if (!validMoves.length) {
            // a player changes only if he has valid moves
            nextPlayer = currentPlayer;
            possibleMoves = getAllValidMovesForPlayer(newBoardState, nextPlayer);

            if (!validMoves.length) {
                // if both players cannot move - the game is over
                nextPlayer = null;
            }
        }

        // provide totalScore to UserPanel
        const newTotalScore = changeTotalScore(newBoardState);
        props.setTotalScore(newTotalScore);

        setCurrentPlayer(nextPlayer);
        setSquares(newBoardState);
        setValidMoves(possibleMoves);
    }, [currentPlayer, props, validMoves, squares]);

    useEffect(() => {
        let timeout;
        if (currentPlayer === 'white') {
            const nextPlayer = getNextPlayer(currentPlayer);
            const newBoardState = copyBoardState(squares);

            const nextMove = getNextMove(validMoves, newBoardState, nextPlayer);

            timeout = setTimeout(() => {
                squareClicked(nextMove);
            }, 1000);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [currentPlayer, squares, validMoves, squareClicked]);

    const squaresArr = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const key = getKey(x, y);
            const squareState = squares[key];

            squaresArr.push(
                <Square isMarked={[2, 6].includes(x) && [2, 6].includes(y)}
                        key={key}
                        isValidMove={validMoves?.includes(key) ? currentPlayer : null}
                        isNotEmpty={squareState?.isNotEmpty}
                        mayBeCaptured={squareState?.mayBeCaptured}
                        color={squareState?.color}
                        hover={() => showCapturedDisks(key)}
                        blur={() => hideCapturedDisks(key)}
                        clicked={() => squareClicked(key)}
                />
            )
        }
    }

    return (
        <div className={styles.boardContainer}>
            <div className={styles.board}
                 data-player={currentPlayer}>
                {squaresArr}
            </div>
        </div>
    );
};

export default Board;