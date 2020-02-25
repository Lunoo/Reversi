import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './UserPanel.module.scss';
import Square from '../../components/Square/Square';
import {useStore} from '../../store/store';

const UserPanel = () => {
    const [{players, currentPlayer, gameStart, totalScore}, dispatch] = useStore();

    const startGame = (robotsNumber) => {
        dispatch('GAME_START');
        dispatch('INIT_TOTAL_SCORE');
        dispatch('PLAYER_CHANGED', 'black');
        dispatch('SET_ROBOTS', robotsNumber);
    };

    const endGame = () => {
        dispatch('GAME_END');
    };

    const totalScoreBlock = (
        <div className={styles.totalScoreBlock}>
            <div className={styles.totalScore}>
                <div className={styles.squareBlock}>
                    <Square isNotEmpty color={'black'}/>
                    {totalScore?.black}
                </div>

                <div className={styles.squareBlock}>
                    <Square isNotEmpty color={'white'}/>
                    {totalScore?.white}
                </div>
            </div>

            <Button className={styles.button}
                    variant="outlined"
                    onClick={endGame}>
                End game
            </Button>
        </div>
    );

    const actionsBlock = (
        <div className={styles.actionsBlock}>
            <Button className={styles.button}
                    variant="outlined"
                    onClick={() => startGame(1)}>
                Single player
            </Button>

            <Button className={styles.button}
                    variant="outlined"
                    onClick={() => startGame(0)}>
                2 players
            </Button>

            <Button className={styles.button}
                    variant="outlined"
                    onClick={() => startGame(2)}>
                Battle of robots
            </Button>
        </div>
    );

    const leftPlayerBlock = (
        <figure className={[styles.playerBlock, styles.black, currentPlayer === 'black' ? styles.active : ''].join(' ')}>
            <img src={require(`../../assets/images/${players.black.icon}`)} alt="black"/>
            <figcaption>{players.black.nickname}</figcaption>
        </figure>
    );

    const rightPlayerBlock = (
        <figure className={[styles.playerBlock, styles.white, currentPlayer === 'white' ? styles.active : ''].join(' ')}>
            <img src={require(`../../assets/images/${players.white.icon}`)} alt="white"/>
            <figcaption>{players.white.nickname}</figcaption>
        </figure>
    );

    return (
        <div className={styles.userPanel}>
            {gameStart && leftPlayerBlock}
            {gameStart ? totalScoreBlock : actionsBlock}
            {gameStart && rightPlayerBlock}
        </div>
    );
};

export default UserPanel;