import React, {Component} from 'react';

import styles from './Board.module.scss';
import Square from '../../components/Square/Square'

const BOARD_SIZE = 8;

class Board extends Component {
    state = {
        currentPlayer: 'black',
        squares: {
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
        },
        validMoves: [
            32, 23, 54, 45
        ]
    };

    changeTotalScore = (boardState) => {
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

    copyBoardState = (state) => {
        const newState = {...state};
        Object.values(newState).forEach((square) => {
            newState[square.key] = {...square};
        });

        return newState;
    };

    isSquareNotEmpty = (key) => {
        return !!this.state.squares[key]?.isNotEmpty;
    };

    getAllValidMoves = (boardState, player) => {
        const validMoves = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                const key = this.getKey(x, y);

                if (this.isSquareNotEmpty(key)) {
                    // skip the already taken squares
                    continue;
                }

                const oppositeColor = this.getNextPlayer(player);
                const capturedDisks = this.getAllCapturedDisksWithColor(boardState, key, oppositeColor);
                // check if the player has valid moves
                if (capturedDisks.length > 0) {
                    validMoves.push(key);
                }
            }
        }

        return validMoves;
    };


    getAllCapturedDisksWithColor = (boardState, key, color) => {
        // get all possible directions (neighbors) for capturing disks
        const neighbors = this.getAllNeighborsWithColor(boardState, key, color);

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

    getAllNeighborsWithColor = (boardState, key, color) => {
        const neighbors = [];
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                const vector = this.getKey(x, y);
                const square = boardState[key + vector];
                if (square && square.key !== key && square.color === color) {
                    neighbors.push({...square})
                }
            }
        }

        return neighbors;
    };

    getKey = (x, y) => {
        return x * 10 + y;
    };

    getNextPlayer = (currentPlayer) => {
        return currentPlayer === 'black' ? 'white' : 'black';
    };

    showCapturedDisks = (key) => {
        if (this.isSquareNotEmpty(key)) {
            return;
        }

        const newBoardState = this.copyBoardState(this.state.squares);
        const newColor = this.getNextPlayer(this.state.currentPlayer);
        const squaresToBeCaptured = this.getAllCapturedDisksWithColor(newBoardState, key, newColor);

        if (!squaresToBeCaptured.length) {
            return;
        }

        squaresToBeCaptured.forEach((square) => {
            newBoardState[square.key].mayBeCaptured = true;
        });

        this.setState({
            squares: newBoardState
        });
    };

    hideCapturedDisks = () => {
        const newBoardState = this.copyBoardState(this.state.squares);
        Object.values(newBoardState).forEach((square) => {
            square.mayBeCaptured = false;
        });

        this.setState({
            squares: newBoardState
        });
    };

    squareClicked = (key) => {
        if (!this.state.validMoves.includes(key)) {
            return;
        }

        let nextPlayer = this.getNextPlayer(this.state.currentPlayer);
        const newBoardState = this.copyBoardState(this.state.squares);
        const capturedDisks = this.getAllCapturedDisksWithColor(newBoardState, key, nextPlayer);

        // add new disk
        newBoardState[key] = {
            key: key,
            isNotEmpty: true,
            color: this.state.currentPlayer
        };

        // change color of captured disks
        capturedDisks.forEach((disk) => {
            newBoardState[disk.key].color = this.state.currentPlayer;
            newBoardState[disk.key].mayBeCaptured = false;
        });

        // update allowable squares for the next player
        let validMoves = this.getAllValidMoves(newBoardState, nextPlayer);

        if (!validMoves.length) {
            // a player changes only if he has valid moves
            nextPlayer = this.getNextPlayer(nextPlayer);
            validMoves = this.getAllValidMoves(newBoardState, nextPlayer);

            if (!validMoves.length) {
                // if both players cannot move - the game is over
                nextPlayer = null;
            }
        }

        // provide totalScore to UserPanel
        const newTotalScore = this.changeTotalScore(newBoardState);
        this.props.setTotalScore(newTotalScore);

        this.setState({
            currentPlayer: nextPlayer,
            squares: newBoardState,
            validMoves: validMoves
        });
    };

    render() {
        const squares = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                const key = this.getKey(x, y);
                const squareState = this.state.squares[key];

                squares.push(
                    <Square isMarked={[2, 6].includes(x) && [2, 6].includes(y)}
                            key={key}
                            isValidMove={this.state.validMoves.includes(key) ? this.state.currentPlayer : null}
                            isNotEmpty={squareState?.isNotEmpty}
                            mayBeCaptured={squareState?.mayBeCaptured}
                            color={squareState?.color}
                            hover={() => this.showCapturedDisks(key)}
                            blur={() => this.hideCapturedDisks(key)}
                            clicked={() => this.squareClicked(key)}
                    />
                )
            }
        }

        return (
            <div className={styles.boardContainer}>
                <div className={styles.board}
                     data-player={this.state.currentPlayer}>
                    {squares}
                </div>
            </div>
        );
    }
}

export default Board;