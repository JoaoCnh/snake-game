import React, { Component } from 'react';

export default class Home extends Component {
	render() {
		console.log("== RENDER HOME ==");
		return (
			<div className="home">
				<div className="jumbotron">
					<h1>Arkade</h1>
				</div>
			</div>
		);
	}
}
