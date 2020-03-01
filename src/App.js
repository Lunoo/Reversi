import React from 'react';

import styles from './App.module.scss';
import Header from './containers/Header/Header';
import Board from './containers/Board/Board';
import UserPanel from './containers/UserPanel/UserPanel';
import ResultsDialog from './components/ResultsDialog/ResultsDialog';

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
