import React from 'react';
import {CSSTransition} from 'react-transition-group';

import styles from './PlayerCard.module.scss';

export const PlayerCard = props => (
    <CSSTransition
        in={props.show}
        timeout={300}
        classNames={{...styles}}
        mountOnEnter
        unmountOnExit>
        <figure className={styles.playerCard + ' ' + styles[props.color]}>
            <div className={props.active ? styles.active : ''}/>
            <img src={require(`../../assets/images/${props.icon}`)} alt={props.color}/>
            <figcaption>{props.nickname}</figcaption>
        </figure>
    </CSSTransition>
);