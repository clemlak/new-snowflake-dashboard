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
  const [networkId, setNetworkId] = useState(null);

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
          const short = res.split('.');
          setHydroBalance(short[0]);
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
      <Row className="justify-content-center align-items-center no-gutters">
        <Col className="col-md-auto">
          <div className="header-account__wrapper">
            <span className="header-account__welcome">
              {`Welcome, ${hydroId}`}
            </span>
            <br />
            <span className="header-account__ein">
              {`Ein: ${ein}`}
            </span>
          </div>
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
            <div ref={identiconRef} className="header-account__identicon">
              <Identicon seed={ein} size={50} id="identicon" />
            </div>
          )}
        </Col>
      </Row>
    );
  }

  return (
    <div className="onboardingButton">
      <Onboarding
        hasProvider={hasProvider}
        networkId={networkId}
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
