import React, {Component} from 'react';

import styles from './App.module.scss';
import Header from './containers/Header/Header';
import Board from './containers/Board/Board';
import UserPanel from './containers/UserPanel/UserPanel';

class App extends Component {
    render() {
        return (
	        <div className={[styles.app, styles.green].join(' ')}>
                <Header/>
                <Board/>
                <UserPanel/>
            </div>
        );
    }
}

export default App;
