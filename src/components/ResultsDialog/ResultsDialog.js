import React, {useCallback, useEffect, useState} from 'react';

import Dialog from '../../shared/Dialog/Dialog';
import {useStore} from '../../store/store';

const ResultsDialog = () => {
    const [{totalScore, currentPlayer, players}] = useStore();
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState(null);

    const getResultsMessage = useCallback(() => {
        if (!totalScore) {
            return;
        }

        if (totalScore.black > totalScore.white) {
            return `Congratulations! ${players.black.nickname} wins!!`;
        }
        if (totalScore.black < totalScore.white) {
            return `Congratulations! ${players.white.nickname} wins!!`;
        }

        return 'Surprise! This is a draw.';
    }, [players, totalScore]);

    const openDialog = useCallback(() => {
        setShowDialog(true);
        setMessage(getResultsMessage());
    }, [getResultsMessage]);

    const closeDialog = () => {
        setShowDialog(false);
    };

    useEffect(() => {
        if (!currentPlayer) {
            openDialog();
        }

    }, [currentPlayer, openDialog]);

    return (
        <Dialog isOpen={showDialog}
                headerText='Results'
                handleClose={closeDialog}>
            {message}
        </Dialog>
    );
};

export default ResultsDialog;
