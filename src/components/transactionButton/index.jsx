/**
 * Handles a transaction and displays the result
 */

import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Spinner,
  Modal,
  ModalBody,
  Row,
  Col,
} from 'reactstrap';
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
} from 'react-icons/io';

function TransactionButton(props) {
  const {
    displayModal,
    initialText,
    waitingForUserConfirmationText,
    waitingForConfirmationText,
    confirmedText,
    sendAction,
    afterConfirmationAction,
    onConfirmationAction,
    className,
    color,
    block,
    onConfirmationModalText,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [hash, setHash] = useState('');

  function sendTransaction() {
    setStatus('waiting');
    setIsModalOpen(true);

    let timer;

    sendAction()
      .on('transactionHash', (res) => {
        setHash(res);
        setStatus('pending');

        timer = setTimeout(() => {
          onConfirmationAction();
          setStatus('confirmed');
        }, 30000);
      })
      .on('receipt', () => {
        clearTimeout(timer);
        onConfirmationAction();
        setStatus('confirmed');
      })
      .on('error', (error) => {
        console.log(error);
        clearTimeout(timer);
        setStatus('error');
      });
  }

  function showButtonContent() {
    if (status === 'waiting') {
      return (
        <div>
          <Spinner />
          {' '}
          {waitingForUserConfirmationText}
        </div>
      );
    }

    if (status === 'pending') {
      return waitingForConfirmationText;
    }

    if (status === 'confirmed') {
      return confirmedText;
    }

    if (status === 'error') {
      return 'Error...';
    }

    return initialText;
  }

  function showModalContent() {
    if (status === 'pending') {
      return (
        <div>
          <Row className="text-center pb-3">
            <Col>
              <Spinner className="transaction-button-modal__icon" />
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <p className="transaction-button-modal__title">
                Transaction is pending
              </p>
              <p className="transaction-button-modal__subtitle mb-0">
                Please wait
              </p>
            </Col>
          </Row>
        </div>
      );
    }

    if (status === 'confirmed') {
      return (
        <div className="confirmationWrapper">
          <Row className="text-center">
            <Col>
              <IoIosCheckmarkCircle className="transaction-button-modal__success-icon" />
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <p className="transaction-button-modal__title text-success">
                Success
              </p>
              <p className="transaction-button-modal__subtitle">
                {onConfirmationModalText}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <a href={`https://rinkeby.etherscan.io/tx/${hash}`}>
                View Transaction
              </a>
            </Col>
          </Row>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div>
          <div>
            <Row className="text-center">
              <Col>
                <IoIosCloseCircle className="transaction-button-modal__error-icon" />
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <p className="transaction-button-modal__title text-danger">
                  Error
                </p>
                <p className="transaction-button-modal__subtitle mb-0">
                  An error occured...
                </p>
              </Col>
            </Row>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <Row className="text-center pb-3">
            <Col>
              <Spinner />
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <p className="transaction-button-modal__title">
                Waiting for user confirmation
              </p>
              <p className="transaction-button-modal__subtitle mb-0">
                Please open MetaMask
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div>
      {displayModal && (
        <Modal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(!isModalOpen)}
          size="sm"
        >
          <ModalBody>
            {showModalContent()}
          </ModalBody>
        </Modal>
      )}
      <Button
        color={color}
        className={className}
        block={block}
        onClick={
          status === 'confirmed' ? (
            () => afterConfirmationAction()
          ) : (
            () => sendTransaction()
          )}
      >
        {showButtonContent()}
      </Button>
    </div>
  );
}

TransactionButton.propTypes = {
  displayModal: PropTypes.bool,
  initialText: PropTypes.string,
  waitingForUserConfirmationText: PropTypes.string,
  waitingForConfirmationText: PropTypes.string,
  confirmedText: PropTypes.string,
  sendAction: PropTypes.func.isRequired,
  afterConfirmationAction: PropTypes.func,
  onConfirmationAction: PropTypes.func,
  className: PropTypes.string,
  color: PropTypes.string,
  block: PropTypes.bool,
  onConfirmationModalText: PropTypes.string,
};

TransactionButton.defaultProps = {
  displayModal: false,
  initialText: 'Send',
  waitingForUserConfirmationText: 'Check MetaMask...',
  waitingForConfirmationText: 'Tx is pending...',
  confirmedText: 'Tx confirmed!',
  afterConfirmationAction: () => console.log(''),
  onConfirmationAction: () => console.log('Transaction confirmed!'),
  className: '',
  color: 'primary',
  block: false,
  onConfirmationModalText: 'Success!',
};

export default TransactionButton;
