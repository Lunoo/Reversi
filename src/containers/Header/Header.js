import React from 'react';

import styles from './Header.module.scss';
import {GameRulesDialog} from '../../components';

export const Header = React.memo(() => {
    return (
        <header className={styles.header}>
            Reversi
            <GameRulesDialog/>
        </header>
    );
});