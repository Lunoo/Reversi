import React from 'react';

import styles from './Square.module.scss';
import {Disk} from '../Disk/Disk';

export const Square = props => {
    const classes = [styles.square];
    if (props.isMarked) {
        classes.push(styles.withMark);
    }
    if (props.isValidMove) {
        classes.push(styles.validMove);
    }
    if (props.mayBeCaptured) {
        classes.push(styles.mayBeCaptured);
    }

    return (
        <div
            className={classes.join(' ')}
            onClick={props.clicked}
            onMouseOver={props.hover}
            onMouseLeave={props.blur}>
            {props.isNotEmpty && <Disk color={props.color}/>}
        </div>
    );
};
