import React, {Component} from 'react';

import Cell from '../../components/Cell/Сell'
import styles from './Board.module.scss';

class Board extends Component {
    state = {
        isNotEmpty: [],
        color: []
    };

    cellClicked = (x, y) => {
        let newIsNotEmpty = [...this.state.isNotEmpty];
        newIsNotEmpty[x * 100 + y] = true;

        let newColor = [...this.state.color];
        newColor[x * 100 + y] = this.state.color[x * 100 + y] === 'white' ? 'black' : 'white';

        this.setState({isNotEmpty: newIsNotEmpty, color: newColor});

        console.log(x, y, this.state);
    };

    render() {
        const cells = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                cells.push(
                    <Cell key={'' + x + y}
                          isMarked={[2, 6].includes(x) && [2, 6].includes(y)}
                          isNotEmpty={this.state.isNotEmpty[x * 100 + y]}
                          color={this.state.color[x * 100 + y]}
                          clicked={() => this.cellClicked(x, y)}
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