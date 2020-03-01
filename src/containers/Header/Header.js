import React from 'react';

import styles from './Header.module.scss';

export const Header = React.memo(() => {
    return (
        <header className={styles.header}>Reversi</header>
    );
});