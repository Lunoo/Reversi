import React, {useState, useEffect, useCallback} from 'react';

import styles from './Board.module.scss';
import {Square} from '../../components';
import {
    copyBoardState,
    getAllCapturedDisksWithColor,
    getAllValidMovesForPlayer,
    getKey,
    getNextPlayer
} from './board-utils';
import {getNextMove} from './robot-newbie';
import {useStore} from '../../store/store';

const BOARD_SIZE = 8;
const EMPTY_BOARD_STATE = {};
const INITIAL_BOARD_STATE = {
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
};
const INITIAL_VALID_MOVES = [32, 23, 54, 45];

export const Board = () => {
    const [{currentPlayer, gameStart, players}, dispatch] = useStore();
    const isCurrentPlayerHuman = players[currentPlayer]?.isHuman;

    const [boardState, setBoardState] = useState(EMPTY_BOARD_STATE);
    const [validMoves, setValidMoves] = useState([]);

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

    const showValidMove = useCallback((key, isHuman) => {
        return isHuman && validMoves.includes(key);
    }, [validMoves]);

    const showCapturedDisks = (key) => {
        if (!showValidMove(key, isCurrentPlayerHuman)) {
            return;
        }

        const newBoardState = copyBoardState(boardState);
        const newColor = getNextPlayer(currentPlayer);
        const squaresToBeCaptured = getAllCapturedDisksWithColor(newBoardState, key, newColor);

        if (squaresToBeCaptured.length === 0) {
            return;
        }

        squaresToBeCaptured.forEach((square) => {
            newBoardState[square.key].mayBeCaptured = true;
        });

        setBoardState(newBoardState);
    };

    const hideCapturedDisks = () => {
        if (!isCurrentPlayerHuman) {
            return;
        }

        const markedSquares = Object.values(boardState)
            .filter((square) => square.mayBeCaptured === true);

        if (markedSquares.length === 0) {
            return;
        }

        const newBoardState = copyBoardState(boardState);
        markedSquares.forEach((square) => {
            newBoardState[square.key].mayBeCaptured = false;
        });

        setBoardState(newBoardState);
    };

    const squareClicked = useCallback((key, isHuman) => {
        if (!showValidMove(key, isHuman)) {
            return;
        }

        let nextPlayer = getNextPlayer(currentPlayer);
        const newBoardState = copyBoardState(boardState);
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

        if (possibleMoves.length === 0) {
            // a player changes only if he has valid moves
            nextPlayer = currentPlayer;
            possibleMoves = getAllValidMovesForPlayer(newBoardState, nextPlayer);

            if (possibleMoves.length === 0) {
                // if both players cannot move - the game is over
                nextPlayer = null;
            }
        }

        // provide totalScore to UserPanel
        const newTotalScore = changeTotalScore(newBoardState);
        dispatch('TOTAL_SCORE_CHANGED', newTotalScore);

        // provide currentPlayer to UserPanel
        dispatch('PLAYER_CHANGED', nextPlayer);

        setBoardState(newBoardState);
        setValidMoves(possibleMoves);
    }, [currentPlayer, boardState, dispatch, showValidMove]);

    useEffect(() => {
        // add robot logic
        let timeout;
        if (isCurrentPlayerHuman === false) {
            timeout = setTimeout(() => {
                const nextPlayer = getNextPlayer(currentPlayer);
                const newBoardState = copyBoardState(boardState);
                const nextMove = getNextMove(validMoves, newBoardState, nextPlayer);

                if (typeof nextMove !== 'number') {
                    return;
                }

                squareClicked(nextMove, true);
            }, 1000);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [currentPlayer, isCurrentPlayerHuman, boardState, validMoves, squareClicked]);

    useEffect(() => {
        // init game board
        if (gameStart) {
            setBoardState(INITIAL_BOARD_STATE);
            setValidMoves(INITIAL_VALID_MOVES);
        } else {
            setBoardState(EMPTY_BOARD_STATE);
            setValidMoves([]);
        }
    }, [gameStart]);

    const newBoardState = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const key = getKey(x, y);
            const squareState = boardState[key];

            newBoardState.push(
                <Square key={key}
                        isMarked={[2, 6].includes(x) && [2, 6].includes(y)}
                        isValidMove={showValidMove(key, isCurrentPlayerHuman) ? currentPlayer : null}
                        isNotEmpty={squareState?.isNotEmpty}
                        mayBeCaptured={squareState?.mayBeCaptured}
                        color={squareState?.color}
                        hover={() => showCapturedDisks(key)}
                        blur={hideCapturedDisks}
                        clicked={() => squareClicked(key, isCurrentPlayerHuman)}
                />
            )
        }
    }

    return (
        <div className={styles.boardContainer}>
            <div className={styles.board}
                 data-player={currentPlayer}>
                {newBoardState}
            </div>
        </div>
    );
};