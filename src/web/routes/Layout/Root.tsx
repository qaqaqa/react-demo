import * as React from 'react';
import { renderRoutes } from 'react-router-config';

export default class extends React.Component<any, any> {
	public render(): JSX.Element {
		const { routes } = this.props.route;

		return <React.Fragment>{renderRoutes(routes)}</React.Fragment>;
	}
}
