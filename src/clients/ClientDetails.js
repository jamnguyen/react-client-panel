import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';
import Spinner from '../layout/Spinner';


class ClientDetails extends Component {
  render() {
    const { client } = this.props;

    if (client) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6 text-right">
              <div className="btn-group">
                <Link to={ `/client/edit/${client.id}` } className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr/>
          <div className="card">
            <div className="card-header">
              <h4 className="font-weight-bold my-0">
                { client.firstName } { client.lastName }
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h5 className="font-weight-bold my-0">
                    Client ID: <span className="text-secondary">{ client.id }</span>
                  </h5>
                </div>
                <div className="col-md-4 col-sm-6 text-right">
                  <h5 className="font-weight-bold my-0">
                    Balance:{' '}
                    <span className={ 
                      classnames({
                        'text-danger': client.balance > 0,
                        'text-success': client.balance <= 0
                      })
                    }>
                      ${ parseFloat(client.balance).toFixed(2) }
                    </span>
                  </h5>
                  {/* @Todo: Balance form */}
                </div>
              </div>
              <br/>
              <ul className="list-group">
                <li className="list-group-item">Email: { client.email }</li>
                <li className="list-group-item">Phone: { client.phone }</li>
              </ul>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Spinner />
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'clients',
      storeAs: 'client',
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);