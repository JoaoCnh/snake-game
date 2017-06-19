import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Page from 'views/Arkade/Page';

const publicPath = '/';

export const routeCodes = {
	HOME: publicPath,
};

export default class Tracker extends Component {
	static propTypes = {
		children: PropTypes.object,
	}

	render() {
		return (
			<BrowserRouter>
				<div className="arkade">
          <div className="container-fluid">
					  <Page />
          </div>
				</div>
			</BrowserRouter>
		);
	}
}
