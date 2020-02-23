import React, {Component} from 'react';

import styles from './Header.module.scss';

class Header extends Component {
    render() {
        return (
            <header className={styles.header}>
                Reversi
            </header>
        );
    }
}

export default React.memo(Header);