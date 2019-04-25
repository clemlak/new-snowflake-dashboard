import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import { IoIosCloseCircle } from 'react-icons/io';

import ProviderStep from './providerStep';
import WelcomeStep from './welcomeStep';

class OnBoarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
      step: props.step,
    };

    this.toggle = this.toggle.bind(this);
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
      step,
    } = this.state;

    let content;

    if (step === 'provider') {
      content = <ProviderStep />;
    } else if (step === 'welcome') {
      content = <WelcomeStep />;
    }

    return (
      <div>
        <Modal isOpen={isOpen} size="lg" toggle={this.toggle}>
          <ModalHeader close={<IoIosCloseCircle className="modal__close-button" onClick={this.toggle} />} />
          <ModalBody className="align-content-center">
            {content}
          </ModalBody>
          <ModalFooter>
            <Nav className="footer__menu">
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/privacy" className="modal-footer__link">
                  Privacy
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/terms" className="modal-footer__link">
                  Terms
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/about" className="modal-footer__link">
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/contact" className="modal-footer__link">
                  Contact
                </NavLink>
              </NavItem>
            </Nav>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default OnBoarding;
