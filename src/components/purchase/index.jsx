/**
 * Adds the dapp to the providers of the current user
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

function Purchase(props) {
  const {
    isOpen,
    title,
    price,
    toggle,
  } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Confirm Purchase
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Alert color="primary">
              <Row>
                <Col>
                  {title}
                </Col>
                <Col>
                  {price}
                </Col>
              </Row>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            This dApp costs {price} Hydro. Your dApp store wallet balance will be used. Please confirm the dApp title above and finalize purchase below. Refunds are not available. Be sure to check MetaMask for the prompt to continue.
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" block>
              Purchase
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

Purchase.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Purchase;
