import React from 'react';
import {
  NavLink,
  Button,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

const HeaderAccount = () => {
  const hasAccount = false;

  if (hasAccount) {
    return (
      <div>
        <p>Welcome, John Smith</p>
        <small>EIN: 29424</small>
      </div>
    );
  }

  return (
    <Button color="primary" tag={RouterNavLink} exact to="/identity">
      Create Account
    </Button>
  );
};

export default HeaderAccount;
