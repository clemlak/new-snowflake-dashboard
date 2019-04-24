import React from 'react';
import {
  Button,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

const HeaderAccount = () => {
  const hasAccount = true;

  if (hasAccount) {
    return (
      <div>
        <p>Welcome, John Smith</p>
        <small>EIN: 29424</small>
      </div>
    );
  }

  return (
    <NavLink tag={RouterNavLink} exact to="/identity" className="btn btn-primary">
      Create Account
    </NavLink>
  );
};

export default HeaderAccount;
