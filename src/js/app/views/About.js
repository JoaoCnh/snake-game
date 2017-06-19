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
		this.props.dispatch(getReadme());
	}

	render() {
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
