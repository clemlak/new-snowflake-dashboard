import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

import { IoIosAlbums } from 'react-icons/io';

import categoriesJson from '../../../common/config/categories.json';

const CategoriesMenu = () => {
  const { categories } = categoriesJson;

  const categoriesLinks = [];

  for (let i = 0; i < categories.length; i += 1) {
    categoriesLinks.push(
      <NavItem key={i}>
        <NavLink tag={RouterNavLink} exact to={`/category/${categories[i]}`} className="sidebar__link" activeClassName="sidebar__link--active">
          <IoIosAlbums />
          {' '}
          {categories[i]}
        </NavLink>
      </NavItem>,
    );
  }

  return (
    <div>
      <p>Categories</p>
      <Nav vertical>
        {categoriesLinks}
      </Nav>
    </div>
  );
};

export default CategoriesMenu;
