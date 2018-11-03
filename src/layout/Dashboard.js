import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Clients from '../clients/Clients';

class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <Clients />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    )
  }
}

export default Dashboard;