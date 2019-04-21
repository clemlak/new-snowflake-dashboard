import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

const CategoriesMenu = () => (
  <div>
    <p>Categories</p>
    <Nav vertical>
      <NavItem>
        <NavLink tag={RouterNavLink} exact to="/categories/all" activeClassName="active">
          All Categories
        </NavLink>
        <NavLink tag={RouterNavLink} exact to="/categories/entertainment" activeClassName="active">
          Entertainment
        </NavLink>
      </NavItem>
    </Nav>
  </div>
);

export default CategoriesMenu;
