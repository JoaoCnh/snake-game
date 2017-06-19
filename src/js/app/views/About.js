import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';

import Loading from 'app/components/shared/Loading';

import {
	getReadme,
} from 'app/actions/about';

@connect(state => ({
	loadingReadme: state.about.get('loadingReadme'),
	readme: state.about.get('readme'),
}))
export default class About extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
	}

	componentDidMount() {
		console.log("== ABOUT DID MOUNT ==");
		this.props.dispatch(getReadme());
	}

	render() {
		console.log("== RENDER ABOUT ==");
		const {
			loadingReadme,
			readme,
		} = this.props;

		if (loadingReadme) {
			return <Loading />;
		}

		return (
			<div className="about">
				<Markdown source={readme} />
			</div>
		);
	}
}
