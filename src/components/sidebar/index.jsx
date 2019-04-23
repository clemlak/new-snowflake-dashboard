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
  <div className="sidebar">
    <div className="py-5">
      <Nav vertical>
        <NavItem>
          <NavLink tag={RouterNavLink} exact to="/wallet" className="sidebar__link" activeClassName="sidebar__link--active">
            dApp Store Wallet
          </NavLink>
          <NavLink tag={RouterNavLink} exact to="/manage" className="sidebar__link" activeClassName="sidebar__link--active">
            dapps You Added
          </NavLink>
          <NavLink tag={RouterNavLink} exact to="/identity" className="sidebar__link" activeClassName="sidebar__link--active">
            Manage Your Identity (EIN)
          </NavLink>
          <NavLink tag={RouterNavLink} exact to="/submit" className="sidebar__link" activeClassName="sidebar__link--active">
            Submit your dApp
          </NavLink>
        </NavItem>
      </Nav>
    </div>
    <div className="py-5">
      <CategoriesMenu />
    </div>
  </div>
);

export default Sidebar;
