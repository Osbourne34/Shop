import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideDialog } from '../../store/materialUiSlice';

import {
    DialogActions,
    DialogContentText,
    Button,
    Dialog,
    DialogContent,
} from '@mui/material';

const Modal = () => {
    const dispatch = useDispatch();
    const { isShowDialog } = useSelector((state) => state.materialUi);

    const handleHideDialog = () => {
        dispatch(hideDialog());
    };

    return (
        <Dialog open={isShowDialog} onClose={handleHideDialog}>
            <DialogContent>
                <DialogContentText
                    sx={{ color: 'text.primary' }}
                    id="alert-dialog-description"
                >
                    Для добавления товаров в корзину необходимо авторизоваться.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button
                    color="error"
                    variant="contained"
                    onClick={handleHideDialog}
                >
                    Отмена
                </Button>
                <Button
                    sx={{ ml: 2 }}
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    onClick={handleHideDialog}
                >
                    Войти
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
