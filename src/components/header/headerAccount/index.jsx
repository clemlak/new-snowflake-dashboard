/**
 * TODO: Header - Pull in dynamic data
 * TODO: Header - Style dynamic data dropdown
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

import Identicon from '../../identicon';

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
      <div className="header__account">
        <div className="header__account-info-wrapper">
          <p className="header__welcome">
            {`Welcome, ${hydroId}`}
          </p>
          <p className="header__ein">
            {`Ein: ${ein}`}
          </p>
        </div>
        <div className="header__identicon-wrapper">
          {web3.active && (
            <Identicon seed={ein} size={50} className="header__identicon" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="onboardingButton">
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
