import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import Menu from 'app/components/shared/Menu';
import Page from 'app/views/Arkade/Page';

export default class Arkade extends Component {
	render() {
		return (
			<HashRouter>
				<div className="arkade">
					<Menu />
          <div className="container-fluid">
					  <Page />
          </div>
				</div>
			</HashRouter>
		);
	}
}
