import React from 'react';

import './App.scss';
import Header from './containers/Header/Header';
import Board from './containers/Board/Board';

function App() {
    return (
        <div className="app">
            <Header/>
            <Board/>
        </div>
    );
}

export default App;
