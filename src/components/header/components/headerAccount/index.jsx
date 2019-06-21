/**
 * TODO: Header - Pull in dynamic data
 * TODO: Header - Style dynamic data dropdown
 */

import React, {
  useState,
  useRef,
} from 'react';
import {
  Button,
  Col,
  Row,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import Onboarding from '../../../onboarding';

import {
  getAccountEin,
  getAccountDetails,
} from '../../../../services/utilities';

import Identicon from '../../../identicon';
import HeaderDropdown from '../headerDropdown';

function HeaderAccount() {
  const web3 = useWeb3Context();

  const [hasEin, setHasEin] = useState(false);
  const [ein, setEin] = useState('');
  const [hydroId, setHydroId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const identiconRef = useRef();

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
        <Row className="justify-content-center align-items-center">
          <Col>
            <p className="header__welcome mb-0">
              {`Welcome, ${hydroId}`}
            </p>
            <p className="header__ein mb-0">
              {`Ein: ${ein}`}
            </p>
          </Col>
          <Col>
            {identiconRef.current && (
              <HeaderDropdown
                target={identiconRef}
                isOpen={isHeaderDropdownOpen}
                toggle={() => setIsHeaderDropdownOpen(!isHeaderDropdownOpen)}
              />
            )}
            {web3.active && (
              <div ref={identiconRef}>
                <Identicon seed={ein} size={50} id="identicon" />
              </div>
            )}
          </Col>
        </Row>
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
