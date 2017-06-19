import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'views/Home';
import Games from 'views/Games';
import About from 'views/About';
import NotFound from 'views/NotFound';

export default class Page extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
};
