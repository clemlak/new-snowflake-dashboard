/**
 * Adds the dapp to the providers of the current user
 * TODO: Use the TransactionButton component
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import {
  addResolver,
} from '../../services/utilities';

import TransactionButton from '../transactionButton';

function Purchase(props) {
  const web3 = useWeb3Context();

  const {
    id,
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
            <TransactionButton
              initialText="Purchase"
              confirmedText="Purchase confirmed!"
              sendAction={() => addResolver(
                web3.library,
                web3.account,
                id,
                '1',
              )}
              afterConfirmationAction={toggle}
              block
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

Purchase.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Purchase;
