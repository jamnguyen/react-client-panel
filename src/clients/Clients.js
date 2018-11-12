import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class Clients extends Component {
  state = {
    totalOwed: null
  }

  // This's invoked right before render(), when clients come
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total += parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }

    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    const clientRows = clients ? clients.map(client => {
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
    }) : null;

    return (
      <React.Fragment>
        {/* Title */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h1><i className="fas fa-users"></i> Clients</h1>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-end">
            { clients ? (
              <h4>
                Total Owed: <span className="text-primary">${ totalOwed.toFixed(2) }</span>
              </h4>
            ) : null}
          </div>
        </div>
        {/* Clients table */}
        { clients ? (
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
        ) : (
          <Spinner />
        ) }
      </React.Fragment>
    );
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect(state => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
