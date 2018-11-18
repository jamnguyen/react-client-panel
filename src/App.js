import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import AppNavbar from './layout/AppNavbar';
import Dashboard from './layout/Dashboard';
import AddClient from './clients/AddClient';
import ClientDetails from './clients/ClientDetails';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={ Dashboard } />
                <Route exact path="/client/add" component={ AddClient } />
                <Route exact path="/client/:id" component={ ClientDetails } />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
