import React from 'react';
import {CSSTransition} from 'react-transition-group';

import styles from './PlayerCard.module.scss';

const PlayerCard = props => {
    const classes = [styles.playerCard, styles[props.color]];
    if (props.active) {
        classes.push(styles.active);
    }

    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames={{...styles}}
            mountOnEnter
            unmountOnExit>
            <figure className={classes.join(' ')}>
                <img src={require(`../../assets/images/${props.icon}`)} alt={props.color}/>
                <figcaption>{props.nickname}</figcaption>
            </figure>
        </CSSTransition>
    );
};

export default PlayerCard;