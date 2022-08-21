import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from './length-password';

// form messages
export const EMPTY_ERROR = 'Заполните поле';
export const PASSWORD_ERROR = `Пароль должен содержать минимум 
${MIN_LENGTH_PASSWORD} и максимум 
${MAX_LENGTH_PASSWORD} символа`;
export const INVALID_EMAIL = 'Невалидный Email';

// notification messages
export const PRODUCT_ADDED_TO_CART = 'Товар добавлен в корзину';
export const PRODUCT_REMOVED_FROM_CART = 'Товар удален из корзины';
export const ERROR_CART = 'Ошибка при добавлений товара';
