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

import footerLogo from '../../common/img/ethereum_built_on_wide_color.png';

const Footer = () => (
  <div>
    <CallToAction />
    <Container fluid className="py-4">
      <Row>
        <Col xs="12" sm="3" className="text-left">
          <a href="https://ethereum.org/" target="_blank"><img src={footerLogo} className="builtOnEthereum" alt="Powered by Ethereum" /></a>
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
            <a href="https://github.com" className="maintainedAndHostedOn" target="_blank"><IoLogoGithub /></a>
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
