import Products from './components/Products/Products';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export const ShopPublicRoutes = [
    {
        path: null,
        Component: Products,
    },
    {
        path: 'product/:id',
        Component: ProductDetails,
    },
    {
        path: 'category/:category',
        Component: Category,
    },
];

export const ShopProtectedRoutes = [
    {
        path: 'cart',
        Component: Cart,
    },
    {
        path: 'checkout',
        Component: Checkout,
    },
    {
        path: 'payment',
        Component: Payment,
    },
];

export const UserRoutes = [
    {
        path: null,
        Component: Profile,
    },
    {
        path: 'orders',
        Component: MyOrders,
    },
    {
        path: 'edit',
        Component: ProfileEdit,
    },
    {
        path: 'orders/:id',
        Component: OrderDetails,
    },
];

export const AuthRoutes = [
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    },
];
