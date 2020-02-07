import React from 'react';

import styles from './Disk.module.scss';

const FACETS = 32;

function Disk(props) {
    const classes = [styles.wrapper, styles[props.color]];

    return (
        <div className={classes.join(' ')}>
            <div className={styles.disk}>
                <div className={styles.front}/>
                <div className={styles.back}/>
                <div className={styles.side}>
                    {[...Array(FACETS)].map((spoke, i) => {
                        return <div key={i} className={styles.spoke}/>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Disk;