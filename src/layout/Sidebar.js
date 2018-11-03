import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <Link
        className="btn btn-success btn-block"
        to="/client/add"
      >
        <i className="fas fa-plus"></i> New
      </Link>
    );
  }
}

export default Sidebar;
