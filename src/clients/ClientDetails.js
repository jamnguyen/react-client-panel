import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';
import Spinner from '../layout/Spinner';


class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  }

  // Update balance
  balanceSubmit = event => {
    event.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const balanceToUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };
    
    firestore.update({
      collection: 'clients',
      doc: client.id
    }, balanceToUpdate);

    this.toggleBalanceForm();
  }

  // Delete Client
  onDeleteClient = () => {
    const { client, firestore, history } = this.props;

    firestore.delete({
      collection: 'clients',
      doc: client.id
    }).then(history.push('/'));
  }

  onFormChange = event => this.setState({ [event.target.name]: event.target.value });

  toggleBalanceForm = () => {
    const { client } = this.props;
    const { showBalanceUpdate } = this.state;

    this.setState({
      showBalanceUpdate: !showBalanceUpdate,
      balanceUpdateAmount: showBalanceUpdate ? '' : parseFloat(client.balance).toFixed(2)
    });
  }

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = null;
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={ this.balanceSubmit }>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add new balance"
              onChange={ this.onFormChange }
              value={ balanceUpdateAmount }
            />
            <div className="input-group-append">
              <input type="submit" value="Update" className="btn btn-outline-dark"/>
            </div>
          </div>
        </form>
      );
    }

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
                <button className="btn btn-danger" onClick={ this.onDeleteClient }>
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
                    <a href="#!" className="btn" onClick={ this.toggleBalanceForm }>
                      <i className="fas fa-pencil-alt"></i>
                    </a>
                  </h5>
                  { balanceForm }
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