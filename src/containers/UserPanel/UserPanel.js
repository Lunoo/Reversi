import React from 'react';

import styles from './UserPanel.module.scss';
import Square from '../../components/Square/Square';
import {useStore} from '../../store/store';

const UserPanel = () => {
    const {players, currentPlayer, totalScore} = useStore()[0];

    return (
        <div className={styles.userPanel}>
            <figure className={[styles.playerBlock, styles.black, currentPlayer === 'black' ? styles.active : ''].join(' ')}>
                <img src={require(`../../assets/images/${players.black.icon}`)} alt="black"/>
                <figcaption>{players.black.nickname}</figcaption>
            </figure>

            <div className={styles.totalScoreBlock}>
                <div className={styles.totalScore}>
                    <div className={styles.squareBlock}>
                        <Square isNotEmpty color={'black'}/>
                        {totalScore.black}
                    </div>

                    <div className={styles.squareBlock}>
                        <Square isNotEmpty color={'white'}/>
                        {totalScore.white}
                    </div>
                </div>
            </div>

            <figure className={[styles.playerBlock, styles.white, currentPlayer === 'white' ? styles.active : ''].join(' ')}>
                <img src={require(`../../assets/images/${players.white.icon}`)} alt="white"/>
                <figcaption>{players.white.nickname}</figcaption>
            </figure>
        </div>
    );
};

export default UserPanel;