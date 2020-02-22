import {initStore} from './store';

const configureStore = () => {
    const actions = {
        'PLAYER_CHANGED': (curState, player) => {
            return {currentPlayer: player}
        }
    };

    initStore(actions, {
        currentPlayer: 'black',
        players: {
            black: {
                color: 'black',
                icon: 'black-icon.jpg',
                isHuman: true,
                nickname: 'Human'
            },
            white: {
                color: 'white',
                icon: 'robot-white-icon.png',
                isHuman: false,
                nickname: 'Robot'
            }
        }
    })
};

export default configureStore;