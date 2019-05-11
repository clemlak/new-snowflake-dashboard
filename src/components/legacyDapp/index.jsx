/**
 * Displays a legacy dapp in a modal
 * NOTE: Legacy dapps were created based on the previous front-end
 * The goal is now to move dapps from the front-end to their own website
 * Meanwhile, legacy dapps are still hosted here
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import {
  getAccountEin,
} from '../../services/utilities';

import {
  Status,
} from '../../legacy/Rinkeby/0x16fD6e2E1C4afB9C4e7B901141706596317e4ceB/index';

function LegacyDapp(props) {
  const web3 = useWeb3Context();

  const [ein, setEin] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    id,
    title,
    isOpen,
    toggle,
  } = props;

  if (web3.active && loading) {
    getAccountEin(web3.library, web3.account)
      .then((res) => {
        if (res !== '') {
          setEin(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!loading) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          {title}
        </ModalHeader>
        <ModalBody>
          <Status ein={ein} />
        </ModalBody>
      </Modal>
    );
  }

  return (
    <p>
      Loading...
    </p>
  );
}

LegacyDapp.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default LegacyDapp;
