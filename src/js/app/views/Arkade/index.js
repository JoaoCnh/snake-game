import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Menu from 'app/components/shared/Menu';
import Page from 'app/views/Arkade/Page';

const publicPath = '/';

export const routeCodes = {
	HOME: publicPath,
};

export default class Arkade extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="arkade">
					<Menu />
          <div className="container-fluid">
					  <Page />
          </div>
				</div>
			</BrowserRouter>
		);
	}
}
