import React, { useState } from 'react';
import {
  Button,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import OnBoarding from '../../onBoarding';

import {
  getAccountEin,
  getAccountDetails,
  isHydroIdAvailable,
  createSignedMessage,
  signPersonal,
  createIdentity,
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

/*
    const newHydroId = 'hellopickle';

    isHydroIdAvailable(web3.library, 'picklE');

    const timestamp = Math.round(new Date() / 1000) - 120;

    const signedMessage = createSignedMessage(web3.library, web3.account, timestamp);

    signPersonal(web3.library, web3.account, signedMessage)
      .then((signature) => {
        console.log(signature);

        return createIdentity(web3.library, newHydroId, timestamp, signature);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

      */
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
      <OnBoarding
        step={hasProvider ? 'provider' : 'hydroId'}
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
      />
      <Button color="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
        Create Account
      </Button>
    </div>
  );
}


export default HeaderAccount;
