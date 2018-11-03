import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Clients extends Component {
  state = {
    clients: [
      {
        id: '1',
        firstName: 'Jam',
        lastName: 'Nguyen',
        email: 'jam@jamnguyen.com',
        phone: '111-111-0000',
        balance: '756.4356'
      },
      {
        id: '2',
        firstName: 'Steve',
        lastName: 'Roger',
        email: 'steve@jamnguyen.com',
        phone: '111-111-0001',
        balance: '1200.36'
      },
      {
        id: '3',
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'stark@jamnguyen.com',
        phone: '111-111-0002',
        balance: '16400'
      },
    ]
  }

  render() {
    if (this.state.clients) {
      const clientRows = this.state.clients.map(client => {
        return (
          <tr key={ client.id }>
            <td>{ client.firstName } { client.lastName }</td>
            <td>{ client.email }</td>
            <td>{ parseFloat(client.balance).toFixed(2) }</td>
            <td>
              <Link className="btn btn-secondary btn-sm" to={ `/client/${client.id}` }>
                <i className="fas fa-arrow-circle-right"></i> Details
              </Link>
            </td>
          </tr>
        );
      });

      return (
        <React.Fragment>
          {/* Title */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h1><i className="fas fa-users"></i> Clients</h1>
            </div>
            <div className="col-md-6">
              {/* Total balance */}
            </div>
          </div>
          {/* Clients table */}
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th />
              </tr>
            </thead>
            <tbody>
              { clientRows }
            </tbody>
          </table>
  
        </React.Fragment>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default Clients;
