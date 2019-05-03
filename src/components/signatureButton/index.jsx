import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Spinner,
} from 'reactstrap';

function SignatureButton(props) {
  const {
    text,
    timestamp,
    sign,
  } = props;

  const [status, setStatus] = useState('');

  function thisSign() {
    setStatus('waiting');

    sign()
      .then((signature) => {
        setStatus('confirmed');
        console.log(signature);
      })
      .catch((err) => {
        console.log(err);
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
      onClick={() => thisSign()}
    >
      {showContent()}
    </Button>
  );
}

SignatureButton.propTypes = {
  text: PropTypes.string.isRequired,
  sign: PropTypes.func.isRequired,
};

export default SignatureButton;
