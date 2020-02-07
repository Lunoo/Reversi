import React from 'react';

import styles from './Disk.module.scss';

function Disk(props) {
    const classes = [styles.purse];
    if (props.color === 'white') {
        classes.push(styles.white);
    } else {
        classes.push(styles.black);
    }

    return (
        <div className={classes.join(' ')}>
            <div className={styles.coin}>
                <div className={styles.front}/>
                <div className={styles.back}/>
                <div className={styles.side}>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                    <div className={styles.spoke}/>
                </div>
            </div>
        </div>
    );
}

export default Disk;