import {
    MIN_LENGTH_PASSWORD,
    MAX_LENGTH_PASSWORD,
} from '../constants/length-password';

export const empty = (value) => {
    return value.trim() !== '';
};

export const email = (value) => {
    if (value.includes('@')) {
        return value.indexOf('@') > 0 && value.indexOf('@') + 1 < value.length;
    }
    return false;
};

export const password = (value) => {
    return (
        value.trim().length >= MIN_LENGTH_PASSWORD &&
        value.trim().length <= MAX_LENGTH_PASSWORD
    );
};
