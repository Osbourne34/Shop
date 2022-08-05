import { useState } from 'react';

export const useValidForm = (...errors) => {
    if (errors.find((item) => item)) {
        return false;
    }
    return true;
};

export const useInput = (validate, initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [blur, setBlur] = useState(false);

    const valueIsValid = validate(value);
    const hasError = !valueIsValid;
    const errorForView = !valueIsValid && blur;

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = (e) => {
        setBlur(true);
    };

    const clearValue = () => {
        setValue('');
        setBlur(false);
    };

    return {
        value,
        onChange,
        onBlur,
        hasError,
        errorForView,
        clearValue,
    };
};
