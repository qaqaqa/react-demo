import RootLayout from './Layout/Root';
import Home from './Home';
import HeaderLayout from './Layout/Header';
import Login from './Login';

export const routes = [
	{
		component: RootLayout,
		routes: [
			{
				path: '/login',
				component: Login
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
