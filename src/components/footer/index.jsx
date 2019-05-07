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
import { IoLogoGithub } from 'react-icons/io';

import CallToAction from '../callToAction';

import footerLogo from '../../common/img/footerLogo.png';

const Footer = () => (
  <div>
    <CallToAction />
    <Container fluid className="py-4">
      <Row>
        <Col xs="12" sm="3" className="text-left">
          <img src={footerLogo} alt="Powered by Hydro" />
        </Col>
        <Col xs="12" sm="6" className="text-center">
          <Nav className="footer__menu">
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/privacy" className="footer__link">
                Privacy
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/terms" className="footer__link">
                Terms
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/about" className="footer__link">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} exact to="/contact" className="footer__link">
                Contact
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xs="12" sm="3" className="text-right">
          <p className="mb-0 footer__powered-by">
            Maintained and hosted on
            {' '}
            <IoLogoGithub />
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
