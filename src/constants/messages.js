import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from './length-password';

export const formErrorMessages = {
    EMPTY_ERROR: 'Заполните поле',
    PASSWORD_ERROR: `Пароль должен содержать минимум 
    ${MIN_LENGTH_PASSWORD} и максимум 
    ${MAX_LENGTH_PASSWORD} символа`,
    INVALID_EMAIL: 'Невалидный Email',
};

export const notificationMessages = {
    PRODUCT_ADDED_TO_CART: 'Товар добавлен',
    PRODUCT_REMOVED_FROM_CART: 'Товар удален',
    ERROR_CART: 'Ошибка при добавлений',
};

export const ANCHOR_DRAWER = 'right';
