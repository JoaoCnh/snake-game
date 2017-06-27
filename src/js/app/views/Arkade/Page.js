import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import Home from 'app/views/Home';
import Games from 'app/views/Games';
import About from 'app/views/About';
import NotFound from 'app/views/NotFound';

const CSSTransitionRoute = ({ transitionName, ...props }) => (
  <Route render={({ location }) => (
    <CSSTransitionGroup transitionName={transitionName}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={500}>
      <Route location={location} key={location.key} {...props} />
    </CSSTransitionGroup>
  )} />
);

export default class Page extends Component {
  render() {
    return (
      <div>
        <CSSTransitionRoute transitionName="fade" exact path="/" component={Home} />
        <CSSTransitionRoute transitionName="fade" path="/games" component={Games} />
        <CSSTransitionRoute transitionName="fade" path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </div>
    );
  }
};
