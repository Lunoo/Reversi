import React, {Component} from 'react';

import './App.scss';
import Header from './containers/Header/Header';
import Board from './containers/Board/Board';
import UserPanel from './containers/UserPanel/UserPanel';

const BG_CLASSES = ['green']; // ['blue', 'green']

class App extends Component {
    getRandomItemFromArray = (arr) => {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };

    render() {
        document.body.classList.add(this.getRandomItemFromArray(BG_CLASSES));
        return (
            <div className="app">
                <Header/>
                <Board/>
                <UserPanel/>
            </div>
        );
    }
}

export default App;
