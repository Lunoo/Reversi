import {initStore} from './store';

const getIcon = (player, isHuman) => {
    const iconStart = isHuman ? '' : 'robot-';
    const iconEnd = isHuman ? '.jpg' : '.png';

    return iconStart + player + '-icon' + iconEnd;
};

const getIsHuman = (robotsNumber) => {
    if (robotsNumber === 0) {
        return [true, true];
    }

    if (robotsNumber === 1) {
        const isHuman = Math.random() > 0.5 ? 'black' : 'white';
        return [isHuman === 'black', isHuman === 'white'];
    }

    if (robotsNumber === 2) {
        return [false, false];
    }

    throw Error('Invalid number of robots!');
};

const getNickname = (playerNumber, isHuman, robotsNumber) => {
    if (robotsNumber === 1) {
        return isHuman ? 'Human' : 'Robot';
    }

    return isHuman ? 'Player ' + playerNumber : 'Robot ' + playerNumber;
};

const configureStore = () => {
    const actions = {
        'PLAYER_CHANGED': (curState, player) => {
            return {currentPlayer: player}
        },
        'SET_ROBOTS': (curState, robotsNumber) => {
            const [blackIsHuman, whiteIsHuman] = getIsHuman(robotsNumber);

            return {
                players: {
                    black: {
                        color: 'black',
                        icon: getIcon('black', blackIsHuman),
                        isHuman: blackIsHuman,
                        nickname: getNickname(1, blackIsHuman, robotsNumber)
                    },
                    white: {
                        color: 'white',
                        icon: getIcon('white', whiteIsHuman),
                        isHuman: whiteIsHuman,
                        nickname: getNickname(2, whiteIsHuman, robotsNumber)
                    }
                }
            };
        },
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