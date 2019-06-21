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
  getSnowflakeBalance,
  getAccountHydroBalance,
  getAccountEthBalance,
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

  const [ethBalance, setEthBalance] = useState('0');
  const [hydroBalance, setHydroBalance] = useState('0');
  const [snowflakeBalance, setSnowflakeBalance] = useState('0');

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

          return getAccountEthBalance(web3.library, web3.account);
        })
        .then((res) => {
          setEthBalance(res);

          return getSnowflakeBalance(web3.library, web3.account);
        })
        .then((res) => {
          setSnowflakeBalance(web3.library.utils.fromWei(res));

          return getAccountHydroBalance(web3.library, web3.account);
        })
        .then((res) => {
          setHydroBalance(web3.library.utils.fromWei(res));
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
            {identiconRef.current && web3.active && (
              <HeaderDropdown
                target={identiconRef}
                isOpen={isHeaderDropdownOpen}
                toggle={() => setIsHeaderDropdownOpen(!isHeaderDropdownOpen)}
                address={web3.account}
                ethBalance={ethBalance}
                snowflakeBalance={snowflakeBalance}
                hydroBalance={hydroBalance}
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
