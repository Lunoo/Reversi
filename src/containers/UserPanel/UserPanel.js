import React, {Component} from 'react';

import styles from './UserPanel.module.scss';
import Square from '../../components/Square/Square'

class UserPanel extends Component {
    render() {
        return (
            <div className={styles.userPanel}>
                <div className={styles.playerBlock}></div>

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

                <div className={styles.playerBlock}></div>
            </div>
        );
    }
}

export default UserPanel;