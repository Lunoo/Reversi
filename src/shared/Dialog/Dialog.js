import React from 'react';
import {Dialog, DialogContent, DialogContentText, DialogTitle, Slide, IconButton, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import styles from './Dialog.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialogTitle = props => {
    const {children, classes, onClose, ...other} = props;
    return (
        <DialogTitle disableTypography className={styles.header} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default props => (
    <Dialog
        open={props.isOpen}
        TransitionComponent={Transition}
        className={styles.dialog}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <CustomDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            {props.headerText}
        </CustomDialogTitle>

        <DialogContent className={styles.content} dividers>
            <DialogContentText id="alert-dialog-slide-description">
                {props.children}
            </DialogContentText>
        </DialogContent>
    </Dialog>
);