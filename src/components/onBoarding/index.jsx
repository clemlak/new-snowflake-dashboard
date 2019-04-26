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
import HydroIdStep from './hydroIdStep';

class OnBoarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
      step: props.step,
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate() {
    const {
      isOpen,
    } = this.state;

    if (this.props.isOpen !== isOpen) {
      this.setState({
        isOpen: this.props.isOpen,
      });
    }
  }

  toggle() {
    const {
      isOpen,
    } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  close() {
    this.setState({
      isOpen: false,
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
    } else if (step === 'hydroId') {
      content = <HydroIdStep />;
    }

    return (
      <div>
        <Modal isOpen={isOpen} size="lg" toggle={this.props.toggle}>
          <ModalHeader close={<IoIosCloseCircle className="modal__close-button" onClick={this.props.toggle} />} />
          <ModalBody className="align-content-center">
            {content}
          </ModalBody>
          <ModalFooter>
            <Nav className="footer__menu">
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/privacy" className="modal-footer__link">
                  Privacy Terms
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/terms" className="modal-footer__link">
                  Terms of Use
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} exact to="/faq" className="modal-footer__link">
                  FAQs
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
