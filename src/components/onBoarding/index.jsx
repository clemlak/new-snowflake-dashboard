import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

function Onboarding(props) {
  const {
    isOpen,
    toggle,
    hasProvider,
  } = props;

  const [currentStep, setCurrentStep] = useState('welcome');

  function displayStep() {
    if (!hasProvider) {
      return <ProviderStep />;
    }

    if (currentStep === 'hydroId') {
      return (
        <HydroIdStep
          setPreviousStep={() => setCurrentStep('welcome')}
          setNextStep={() => setCurrentStep('welcome')}
        />
      );
    }

    return (
      <WelcomeStep
        setPreviousStep={() => setCurrentStep('welcome')}
        setNextStep={() => setCurrentStep('hydroId')}
      />
    );
  }

  return (
    <div>
      <Modal isOpen={isOpen} size="lg" toggle={toggle}>
        <ModalHeader
          close={<IoIosCloseCircle className="modal__close-button " onClick={toggle} />}
          className="onboarding__modal"
        />
        <ModalBody className="align-content-center onboarding__modal">
          {displayStep()}
        </ModalBody>
        <ModalFooter className="onboarding__modal">
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

Onboarding.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  hasProvider: PropTypes.bool.isRequired,
};

export default Onboarding;
