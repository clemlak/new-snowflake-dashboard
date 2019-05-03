/**
 *
 */

import React, { useState } from 'react';
import {
  Button,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import Onboarding from '../../onboarding';

import {
  getAccountEin,
  getAccountDetails,
} from '../../../services/utilities';

function HeaderAccount() {
  const web3 = useWeb3Context();

  const [hasEin, setHasEin] = useState(false);
  const [ein, setEin] = useState('');
  const [hydroId, setHydroId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  if (web3.active) {
    if (!hasProvider) {
      setHasProvider(true);
    }

    if (!hasEin) {
      getAccountEin(web3.library, web3.account)
        .then((res) => {
          if (res !== '') {
            setHasEin(true);
            setEin(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (hasEin) {
      getAccountDetails(web3.library, ein)
        .then((details) => {
          setHydroId(details.casedHydroID);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function toggle() {
    setIsModalOpen(!isModalOpen);
  }

  if (hasEin) {
    return (
      <div>
        <p className="mb-0">
          {`Welcome ${hydroId}`}
        </p>
        <p className="small">
          {`Ein: ${ein}`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Onboarding
        hasProvider={hasProvider}
        isOpen={isModalOpen}
        toggle={() => toggle()}
      />
      <Button color="primary" onClick={() => toggle()}>
        Create Account
      </Button>
    </div>
  );
}


export default HeaderAccount;
