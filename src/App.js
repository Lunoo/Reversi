import React, {Component} from 'react';

import styles from './App.module.scss';
import Header from './containers/Header/Header';
import Board from './containers/Board/Board';
import UserPanel from './containers/UserPanel/UserPanel';

class App extends Component {
    render() {
        document.body.classList.add('green');
        return (
	        <div className={styles.app}>
                <Header/>
                <Board/>
                <UserPanel/>
            </div>
        );
    }
}

export default App;
