import React, {Component} from 'react';

import styles from './UserPanel.module.scss';
import Square from '../../components/Square/Square'

class UserPanel extends Component {
    render() {
        return (
            <div className={styles.userPanel}>
                <figure className={[styles.playerBlock, styles.black].join(' ')}>
                    <img src={require('../../assets/images/black-icon.jpg')}  alt="black"/>
                    <figcaption>Player 1</figcaption>
                </figure>

                <div className={styles.totalScoreBlock}>
                    <div className={styles.totalScore}>
                        <div className={styles.squareBlock}>
                            <Square isNotEmpty color={'black'}/>
                            {this.props.totalScore.black}
                        </div>

                        <div className={styles.squareBlock}>
                            <Square isNotEmpty color={'white'}/>
                            {this.props.totalScore.white}
                        </div>
                    </div>
                </div>

                <figure className={[styles.playerBlock, styles.white, styles.active].join(' ')}>
                    <img src={require('../../assets/images/white-icon.jpg')} alt="white"/>
                    <figcaption>Player 2</figcaption>
                </figure>
            </div>
        );
    }
}

export default UserPanel;