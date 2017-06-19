import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Menu from 'app/components/shared/Menu';
import Page from 'app/views/Arkade/Page';

const publicPath = '/';

export const routeCodes = {
	HOME: publicPath,
};

export default class Arkade extends Component {
	static propTypes = {
		children: PropTypes.object,
	}

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
