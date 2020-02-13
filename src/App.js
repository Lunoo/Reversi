import React, {Component} from 'react';

import './App.scss';
import Header from './containers/Header/Header';
import Board from './containers/Board/Board';

const BG_CLASSES = ['blue', 'green'];

class App extends Component {
    getRandomItemFromArray = (arr) => {
        // const index = Math.floor(Math.random() * arr.length);
        // return arr[index];
        return 'green';
    };

    render() {
        document.body.classList.add(this.getRandomItemFromArray(BG_CLASSES));
        return (
            <div className="app">
                <Header/>
                <Board/>
            </div>
        );
    }
}

export default App;
