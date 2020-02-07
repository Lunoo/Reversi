import React, {Component} from 'react';

import Cell from '../../components/Cell/Сell'
import styles from './Board.module.scss';

class Board extends Component {
    state = {
        boardState: {}
    };

    cellClicked = (key) => {
        let newBoardState = {...this.state.boardState};
        let newCell = newBoardState[key];
        newBoardState[key] = {
            isNotEmpty: true,
            color: newCell?.color === 'white' ? 'black' : 'white'
        };

        this.setState({boardState: newBoardState});
        console.log(key, newBoardState);
    };

    getKey = (x, y) => {
        return x * 100 + y;
    };

    render() {
        const cells = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const key = this.getKey(x, y);
                const cellState = this.state.boardState[key];
                cells.push(
                    <Cell isMarked={[2, 6].includes(x) && [2, 6].includes(y)}
                          key={key}
                          isNotEmpty={cellState?.isNotEmpty}
                          color={cellState?.color}
                          clicked={() => this.cellClicked(key)}
                    />
                )
            }
        }

        return (
            <div className={styles.board}>
                {cells}
            </div>
        );
    }
}

export default Board;