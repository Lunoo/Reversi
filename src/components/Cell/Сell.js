import React from 'react';

import styles from './Cell.module.scss';
import Disk from "../Disk/Disk";

function Cell(props) {
    const classes = [styles.cell];
    if (props.isMarked) {
        classes.push(styles.withMark);
    }

    return (
        <div
            className={classes.join(' ')}
            onClick={props.clicked}
        >
            {props.isNotEmpty && <Disk color={props.color}/>}
        </div>
    );
}

export default Cell;
