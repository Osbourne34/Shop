import { useDispatch } from 'react-redux';
import { hideNotification } from './../store/materialUiSlice';

export const useCloseNotification = () => {
    const dispatch = useDispatch();

    const closeNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(hideNotification());
    };

    return closeNotification;
};
