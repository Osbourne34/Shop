import { setAnchor } from './../store/materialUiSlice';
import { useDispatch } from 'react-redux';

export const useToggleDrawer = () => {
    const dispatch = useDispatch();

    const togglerDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        dispatch(setAnchor(open));
    };

    return togglerDrawer;
};
