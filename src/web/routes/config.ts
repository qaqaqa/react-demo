import RootLayout from './Layout/Root';
import Home from './Home';
import HeaderLayout from './Layout/Header';
import Login from './Login';
import Regist from './Regist';

export const routes = [
    {
        component: RootLayout,
        routes: [
            {
                path: '/login',
                component: Login
            },
            {
                path: '/regist',
                component: Regist
            },
            {
                component: HeaderLayout,
                routes: [
                    {
                        path: '/',
                        exact: true,
                        component: Home
                    }
                ]
            }
        ]
    }
];
