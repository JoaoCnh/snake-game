import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import FaBars from 'react-icons/lib/fa/bars';
import FaHome from 'react-icons/lib/fa/home';
import FaGamepad from 'react-icons/lib/fa/gamepad';
import FaGithub from 'react-icons/lib/fa/github';

const MENU_CSS_CLASS = "menu top-right";

@withRouter
export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	_menuCss() {
		return this.state.isOpen ? `${MENU_CSS_CLASS} open` : MENU_CSS_CLASS;
	}

	_toggleMenu() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	render () {
		return (
			<nav className={this._menuCss()}>
				<Link to="/about" className="disc l1">
					<div>
						<FaGithub />
						About
					</div>
				</Link>
				<Link to="/games" className="disc l2">
					<div>
						<FaGamepad />
						Games
					</div>
				</Link>
				<Link to="/" className="disc l3">
					<div>
						<FaHome />
						Home
					</div>
				</Link>
				<a className="disc l4">
					<div>v{process.env.VERSION}</div>
				</a>
				<a className="disc l5 toggle" onClick={this._toggleMenu.bind(this)}>
					<FaBars />
				</a>
			</nav>
		);
	}
};
