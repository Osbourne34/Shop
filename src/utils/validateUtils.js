export const MIN_LENGTH_PASSWORD = 4;
export const MAX_LENGTH_PASSWORD = 24;

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
        value.length >= MIN_LENGTH_PASSWORD &&
        value.length <= MAX_LENGTH_PASSWORD
    );
};
