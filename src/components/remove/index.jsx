/**
 * Remove the dapp from the providers of the current user
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

function Remove(props) {
  const {
    isOpen,
    title,
    toggle,
  } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Confirm Removal
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Alert color="primary">
              <Row>
                <Col>
                  {title}
                </Col>
              </Row>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              You are about to remove {title} from your EIN. Please confirm below. Your purchases are tied to your EIN. You can always add it for free in the future after you remove it.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="danger" block>
              Remove
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

Remove.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Remove;
