import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  }

  onChange = (event) => {
    return this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { history, firestore } = this.props;
    const newClient = this.state;
    
    // If balance is empty, make it 0
    if (!newClient.balance || newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore.add({ collection: 'clients' }, newClient).then(() => {
      history.push('/');
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={ this.onSubmit }>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  required
                  minLength="2"
                  onChange={ this.onChange }
                  value={ this.state.firstName }
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  required
                  minLength="2"
                  onChange={ this.onChange }
                  value={ this.state.lastName }
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={ this.onChange }
                  value={ this.state.email }
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  onChange={ this.onChange }
                  value={ this.state.phone }
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  onChange={ this.onChange }
                  value={ this.state.balance }
                />
              </div>
              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddClient);