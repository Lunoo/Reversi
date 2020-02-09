import React, {Component} from 'react';

import styles from './Board.module.scss';
import Square from '../../components/Square/Square'

const BOARD_SIZE = 8;

class Board extends Component {
    state = {
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
        currentPlayer: 'black',
        validMoves: [
            32, 23, 54, 45
        ]
    };

    isSquareNotEmpty = (key) => {
        return !!this.state.squares[key]?.isNotEmpty;
    };

    getAllValidMoves = (boardState) => {
        const validMoves = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                const key = this.getKey(x, y);

                if (this.isSquareNotEmpty(key)) {
                    continue;
                }

                const neighbors = this.getAllNeighborsWithColor(boardState, key, this.state.currentPlayer);
                const capturedDisks = this.getAllCapturedDisks(boardState, key, neighbors);

                if (capturedDisks.length > 0) {
                    validMoves.push(key);
                }
            }
        }

        return validMoves;
    };


    getAllCapturedDisks = (boardState, key, neighbors) => {
        let capturedDisks = [];
        neighbors.forEach((square) => {
            const vector = square.key - key;
            const disks = [];

            let squareToCheck = square;
            while (squareToCheck && squareToCheck.color === square.color) {
                disks.push({...squareToCheck});
                squareToCheck = boardState[squareToCheck.key + vector];
            }

            if (squareToCheck) {
                capturedDisks = [
                    ...capturedDisks,
                    ...disks
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

        const newBoardState = {...this.state.squares};
        const newColor = this.getNextPlayer(this.state.currentPlayer);
        const neighbors = this.getAllNeighborsWithColor(newBoardState, key, newColor);
        const squaresToBeCaptured = this.getAllCapturedDisks(newBoardState, key, neighbors);

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
        const newBoardState = {...this.state.squares};
        Object.values(newBoardState).forEach((square) => {
            const newSquare = {...square};
            newSquare.mayBeCaptured = false;
            newBoardState[square.key] = newSquare;
        });

        this.setState({
            squares: newBoardState
        });
    };

    squareClicked = (key) => {
        if (!this.state.validMoves.includes(key)) {
            return;
        }

        const newColor = this.getNextPlayer(this.state.currentPlayer);
        const neighbors = this.getAllNeighborsWithColor(this.state.squares, key, newColor);
        const capturedDisks = this.getAllCapturedDisks(this.state.squares, key, neighbors);

        // Add new disk
        const newBoardState = {...this.state.squares};
        newBoardState[key] = {
            key: key,
            isNotEmpty: true,
            color: this.state.currentPlayer
        };

        // Change color of captured disks
        capturedDisks.forEach((disk) => {
            newBoardState[disk.key].color = this.state.currentPlayer;
            newBoardState[disk.key].mayBeCaptured = false;
        });

        // update allowable squares for the next player
        const validMoves = this.getAllValidMoves(newBoardState);

        this.setState((prevState) => {
            return {
                currentPlayer: this.getNextPlayer(prevState.currentPlayer),
                squares: newBoardState,
                validMoves: validMoves
            }
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
            <div className={styles.board}
                 data-player={this.state.currentPlayer}>
                {squares}
            </div>
        );
    }
}

export default Board;