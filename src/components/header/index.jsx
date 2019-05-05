/**
 *
 */

import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import {
  IoMdHelpCircle,
} from 'react-icons/io';

import HeaderAccount from './headerAccount';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const {
      isOpen,
    } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const {
      isOpen,
    } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md" className="bg-white">
          <NavbarBrand tag={RouterNavLink} exact to="/">
            <h2 className="header__title">
              Snowflake
            </h2>
            <p className="header__subtitle">
              powered by
              {' '}
              <span className="header__hydro">
                Hydro
              </span>
            </p>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto align-items-center" navbar>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/faq" activeClassName="active">
                  <IoMdHelpCircle className="header__icon" />
                </NavLink>
              </NavItem>
              <NavItem>
                <HeaderAccount />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
