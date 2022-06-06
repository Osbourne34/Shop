import Shop from './pages/Shop';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

// constans
export const ROUTE_SHOP = '/';
export const ROUTE_LOGIN = '/login';
export const ROUTE_REGISTER = '/register';
export const ROUTE_PROFILE = '/profile';

export const publicRoutes = [
    {
        path: ROUTE_SHOP,
        Component: Shop,
    },
    {
        path: ROUTE_LOGIN,
        Component: Auth,
    },
    {
        path: ROUTE_REGISTER,
        Component: Auth,
    },
];

export const privateRoutes = [
    {
        path: ROUTE_PROFILE,
        Component: Profile,
    },
];
