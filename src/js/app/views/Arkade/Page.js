import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'app/views/Home';
import Games from 'app/views/Games';
import About from 'app/views/About';
import NotFound from 'app/views/NotFound';

export default class Page extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/arkade" component={Home} />
        <Route path="/arkade/games" component={Games} />
        <Route path="/arkade/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
};
