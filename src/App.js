import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AppNavbar from './layout/AppNavbar';
import Dashboard from './layout/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={ Dashboard } />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
