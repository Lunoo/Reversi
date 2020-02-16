import React, {Component} from 'react';

import './App.scss';
import Header from './containers/Header/Header';
import Board from './containers/Board/Board';
import UserPanel from './containers/UserPanel/UserPanel';

const BG_CLASSES = ['blue', 'green'];

class App extends Component {
    state = {
        totalScore: {
            black: 2,
            white: 2
        }
    };

    getRandomItemFromArray = (arr) => {
        // const index = Math.floor(Math.random() * arr.length);
        // return arr[index];
        return 'green';
    };

    setTotalScore = (newTotalScore) => {
        this.setState({
            totalScore: newTotalScore
        });
    };

    render() {
        document.body.classList.add(this.getRandomItemFromArray(BG_CLASSES));
        return (
            <div className="app">
                <Header/>
                <Board setTotalScore={this.setTotalScore}/>
                <UserPanel totalScore={this.state.totalScore}/>
            </div>
        );
    }
}

export default App;
