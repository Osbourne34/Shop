import { useEffect, useState } from "react";

export const useInputValidate = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false);
    const [blur, setBlur] = useState(false);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = (e) => {
        setBlur(true);
    };

    const clearInput = () => {
        setValue("");
        setBlur(false);
    };

    useEffect(() => {
        value.length ? setError(false) : setError(true);
    }, [value]);

    return {
        value,
        onChange,
        onBlur,
        blur,
        error,
        clearInput,
    };
};
