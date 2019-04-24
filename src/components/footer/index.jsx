import React from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

import CallToAction from '../callToAction';

import footerLogo from '../../common/img/footerLogo.png';

const Footer = () => (
  <div>
    <CallToAction />
    <Container fluid className="py-3">
      <Row>
        <Col xs="12" sm="3" className="text-left">
          <img src={footerLogo} alt="Powered by Hydro" />
        </Col>
        <Col xs="12" sm="6" className="text-center">
          <Nav fill>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/privacy" activeClassName="active">Privacy</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/terms" activeClassName="active">Terms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/about" activeClassName="active">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/contact" activeClassName="active">Contact</NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xs="12" sm="3" className="text-right">
          Github
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
