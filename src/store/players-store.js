import {initStore} from './store';

const configureStore = () => {
    const actions = {
        'PLAYER_CHANGED': (curState, playerIndex) => {
            return {currentPlayerIndex: playerIndex}
        }
    };

    initStore(actions, {
        currentPlayerIndex: 0,
        players: [
            {
                color: 'black',
                isHuman: true
            },
            {
                color: 'white',
                isHuman: true
            }
        ]
    })
};

export default configureStore;