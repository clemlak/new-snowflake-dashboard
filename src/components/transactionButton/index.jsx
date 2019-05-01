import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Spinner,
} from 'reactstrap';

function TransactionButton(props) {
  const {
    text,
    send,
  } = props;

  const [status, setStatus] = useState('');

  function sendTransaction() {
    setStatus('waiting');

    send()
      .on('transactionHash', (hash) => {
        console.log(hash);
        setStatus('loading');
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
        setStatus('confirmed');
      })
      .on('error', (error) => {
        console.log(error);
        setStatus('error');
      });
  }

  function showContent() {
    if (status === 'waiting') {
      return (
        <div>
          <Spinner />
          {' '}
          Waiting...
        </div>
      );
    }

    if (status === 'loading') {
      return 'Loading...';
    }

    if (status === 'confirmed') {
      return 'Confirmed';
    }

    if (status === 'error') {
      return 'error';
    }

    return text;
  }

  return (
    <Button
      color="primary"
      onClick={() => sendTransaction()}
    >
      {showContent()}
    </Button>
  );
}

TransactionButton.propTypes = {
  text: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
};

export default TransactionButton;
