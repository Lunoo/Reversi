import React from 'react';
import Button from '@material-ui/core/Button';
import {CSSTransition} from 'react-transition-group';

import styles from './UserPanel.module.scss';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
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
        <CSSTransition
            in={gameStart}
            timeout={300}
            classNames={{...styles}}
            mountOnEnter
            unmountOnExit>
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
        </CSSTransition>
    );

    const actionsBlock = (
        <CSSTransition
            in={!gameStart}
            timeout={300}
            classNames={{...styles}}
            mountOnEnter
            unmountOnExit>
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
        </CSSTransition>
    );

    return (
        <div className={styles.userPanel}>
            <PlayerCard
                show={gameStart}
                color={'black'}
                active={currentPlayer === 'black'}
                icon={players.black.icon}
                nickname={players.black.nickname}
            />

            <div className={styles.middleBlock}>
                {totalScoreBlock}
                {actionsBlock}
            </div>

            <PlayerCard
                show={gameStart}
                color={'white'}
                active={currentPlayer === 'white'}
                icon={players.white.icon}
                nickname={players.white.nickname}
            />
        </div>
    );
};

export default UserPanel;