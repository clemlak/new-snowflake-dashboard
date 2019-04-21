import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

import CategoriesMenu from './categoriesMenu';

const Sidebar = () => (
  <div>
    <Nav vertical>
      <NavItem>
        <NavLink tag={RouterNavLink} exact to="/wallet" activeClassName="active">dApp Store Wallet</NavLink>
        <NavLink tag={RouterNavLink} exact to="/manage" activeClassName="active">dapps You Added</NavLink>
        <NavLink tag={RouterNavLink} exact to="/identity" activeClassName="active">Manage Your Identity (EIN)</NavLink>
        <NavLink tag={RouterNavLink} exact to="/submit" activeClassName="active">Submit your dApp</NavLink>
      </NavItem>
    </Nav>
    <CategoriesMenu />
  </div>
);

export default Sidebar;
