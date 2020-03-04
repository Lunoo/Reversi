import React, {useState} from 'react';
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined';
import {IconButton} from '@material-ui/core';

import styles from './GameRulesDialog.module.scss';
import Dialog from '../../shared/Dialog/Dialog';

export const GameRulesDialog = () => {
    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => {
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    return (
        <>
            <IconButton className={styles.helpButton} onClick={openDialog}>
                <HelpIcon/>
            </IconButton>

            <Dialog isOpen={showDialog}
                    headerText='Game rules'
                    handleClose={closeDialog}>

                <div className={styles.section}>
                    <h3>Origin</h3>

                    <p>Reversi is an ancient game whose origin is uncertain.</p>
                    <p>
                        The oldest references about similar games go back to late in the 19th century; those games had
                        different names and their boards had different size or shape.
                    </p>
                    <p>
                        In 1870 appeared a similar game using a cross shape board. Subsequently appeared another game
                        played
                        on a 8x8 square shape board.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>Description</h3>

                    <p>
                        Two players take part in this game; they need a board with 64 squares distributed in 8 rows and
                        8 columns, and 64 similar pieces of two colours (normally black and white): the obverse in one
                        colour and the reversi in the other colour.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>Objective</h3>

                    <p>
                        The objective for each of the players is to finish the game with more pieces on the board in his
                        own colour than the opponent.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>Start of the game</h3>

                    <p>
                        Before starting players decide which colour will use each of them.
                    </p>
                    <p>
                        Next 4 pieces have to be placed in the central squares of the board, so that each pair of pieces
                        of the same colour form a diagonal between them.
                    </p>
                    <p>
                        The player with black pieces moves first; one only move is made every turn.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>Moves</h3>

                    <p>
                        A move consists in placing from outside one piece on the board. Placed pieces can never be moved
                        to another square later in the game.
                    </p>
                    <p>The incorporation of the pieces must be made according to the following rules:</p>

                    <ul>
                        <li>The incorported piece must outflank one or more of the opponent placed pieces</li>
                        <li>
                            To outflank means that a single piece or one straight row (vertical, horizontal or diagonal)
                            of pieces of the opponent is in both sides next to own pieces, with no empty squares between
                            all those pieces
                        </li>
                        <li>
                            The player who makes the move turns the outflanked pieces over, becoming all of them in own
                            pieces
                        </li>
                        <li>
                            If there is more than one outflanked row, all the involved pieces in those rows have to be
                            flipped
                        </li>
                        <li>
                            If it´s not possible to make this kind of move, turn is forfeited and the opponent repeats
                            another move
                        </li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h3>Final</h3>

                    <p>The game is over when all the squares of the board are taken or none of the players can move.</p>
                    <p>In any case the winner is the player who has more pieces on the board.</p>
                    <p>The game ends in a draw when both players have the same number of pieces on the board.</p>
                </div>

            </Dialog>
        </>
    );
};