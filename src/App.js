import React from 'react';

import styles from './App.module.scss';
import {Header, Board, UserPanel} from './containers';
import {ResultsDialog} from './components';

const App = () => {
    document.body.classList.add('green');
    return (
        <div className={styles.app}>
            <Header/>
            <Board/>
            <UserPanel/>
            <ResultsDialog/>
        </div>
    );
};

export default App;
