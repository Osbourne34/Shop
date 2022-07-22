import { useState } from 'react';

export const useValidForm = (...errors) => {
    if (errors.find((item) => item)) {
        return false;
    }
    return true;
};

export const useInput = (validate) => {
    const [value, setValue] = useState('');
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

    return {
        value,
        onChange,
        onBlur,
        hasError,
        errorForView,
    };
};
