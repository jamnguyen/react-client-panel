import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { firebase } = this.props;

    firebase.login({
      email,
      password
    }).catch(err => alert('Invalid Login Credentials!'));
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center py-4">
                <span className="text-primary">
                  <i className="fas fa-lock"></i> Login
                </span>
              </h1>
              <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                  <label htmlFor="email" >Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="login-email-input"
                    required
                    value={ this.state.email }
                    onChange={ this.onChange }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="login-password-input"
                    required
                    value={ this.state.password }
                    onChange={ this.onChange }
                  />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);