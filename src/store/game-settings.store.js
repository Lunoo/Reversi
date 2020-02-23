import {initStore} from './store';

const configureStore = () => {
    const actions = {
        'GAME_START': () => {
            return {gameStart: true}
        },
        'GAME_END': () => {
            return {gameStart: false}
        },
        'INIT_TOTAL_SCORE': () => {
            return {
                totalScore: {
                    black: 2,
                    white: 2
                }
            }
        },
        'TOTAL_SCORE_CHANGED': (curState, totalScore) => {
            return {totalScore: totalScore}
        }
    };

    initStore(actions, {
        gameStart: false,
        totalScore: {
            black: 2,
            white: 2
        }
    })
};

export default configureStore;