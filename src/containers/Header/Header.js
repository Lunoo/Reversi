import React from 'react';

import styles from './Header.module.scss';
import {useStore} from '../../store/store';

const Header = () => {
    const dispatch = useStore(false)[1];

    const startGame = (robotsNumber) => {
        dispatch('GAME_START');
        dispatch('INIT_TOTAL_SCORE');
        dispatch('PLAYER_CHANGED', 'black');
        dispatch('SET_ROBOTS', robotsNumber);
    };

    return (
        <header className={styles.header}>
            {/*Reversi*/}
            <button onClick={() => startGame(0)}>Start game for 2 players</button>
            <button onClick={() => startGame(1)}>Start game with Robot</button>
            <button onClick={() => startGame(2)}>Watch the battle of robots</button>
        </header>
    );
};

export default React.memo(Header);